// real-time-translate.js - ترجمة حية في الموقع

class RealTimeTranslator {
  constructor() {
    this.fallbackTranslations = {
      ar: {},
      fr: {},
      en: {}
    };
    
    this.loadFallbackTranslations();
  }

  // ترجمة نص في الوقت الحقيقي
  async translateText(text, targetLang, context = '') {
    // الأول جرب تشوف إذا في ترجمة محفوظة
    const cached = this.getCachedTranslation(text, targetLang);
    if (cached) return cached;

    try {
      // استخدم API الترجمة
      const response = await fetch(`/api/translate?text=${encodeURIComponent(text)}&lang=${targetLang}&context=${context}`);
      const data = await response.json();
      
      if (data.translatedText) {
        this.saveTranslation(text, data.translatedText, targetLang, context);
        return data.translatedText;
      }
    } catch (error) {
      console.log('Translation API failed, using fallback');
    }

    // استخدم الترجمات المحفوظة كبديل
    return this.getFallbackTranslation(text, targetLang) || text;
  }

  // ترجمة كل الصفحة
  async translatePage(targetLang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    for (const element of elements) {
      const originalText = element.getAttribute('data-original') || element.textContent;
      const context = element.getAttribute('data-context') || '';
      
      if (originalText.trim()) {
        const translated = await this.translateText(originalText, targetLang, context);
        element.textContent = translated;
        
        // حفظ النص الأصلي علشان تقدر ترجعله
        element.setAttribute('data-original', originalText);
      }
    }
    
    // حفظ لغة المستخدم
    localStorage.setItem('preferredLanguage', targetLang);
    document.documentElement.lang = targetLang;
  }
}