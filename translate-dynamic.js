const translate = require('google-translate-api-x');
const fs = require('fs').promises;
const path = require('path');

async function translateText(text, targetLang) {
  if (!text || text.length < 2) return text;
  
  try {
    const result = await translate(text, { 
      to: targetLang,
      forceFrom: 'en'
    });
    return result.text || text;
  } catch (error) {
    console.log(`⚠️  Translation failed: "${text.substring(0, 30)}..."`);
    return text;
  }
}

async function translateObject(obj, targetLang) {
  if (typeof obj === 'string') {
    const translated = await translateText(obj, targetLang);
    await new Promise(resolve => setTimeout(resolve, 300));
    return translated;
  }
  
  if (Array.isArray(obj)) {
    const translatedArray = [];
    for (const item of obj) {
      translatedArray.push(await translateObject(item, targetLang));
    }
    return translatedArray;
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const translatedObj = {};
    const keys = Object.keys(obj);
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      process.stdout.write(`\r🌐 Translating ${targetLang}: ${i + 1}/${keys.length}...`);
      translatedObj[key] = await translateObject(obj[key], targetLang);
    }
    
    process.stdout.write('\r');
    return translatedObj;
  }
  
  return obj;
}

async function loadOrCreateSource() {
  const sourceFile = './src/locales/en/translation.json';
  
  try {
    // إذا ملف المصدر موجود، استخدمه
    const sourceData = await fs.readFile(sourceFile, 'utf8');
    return JSON.parse(sourceData);
  } catch (error) {
    // إذا مش موجود، أنشئ واحد أساسي
    console.log('📝 Creating basic source file...');
    
    const basicStructure = {
      nav: {
        home: "Home",
        projects: "Projects", 
        about: "About",
        contact: "Contact"
      },
      projects: {
        title: "Personal Projects",
        view_project: "View Project"
      }
    };
    
    // تأكد من وجود المجلد
    await fs.mkdir(path.dirname(sourceFile), { recursive: true });
    await fs.writeFile(sourceFile, JSON.stringify(basicStructure, null, 2));
    
    return basicStructure;
  }
}

async function main() {
  console.log('🚀 Starting dynamic translation...\n');
  
  const targetLangs = ['ar', 'fr'];
  const sourceJson = await loadOrCreateSource();
  
  console.log('📖 Source file ready\n');
  
  for (const lang of targetLangs) {
    console.log(`\n📍 Translating to ${lang.toUpperCase()}...`);
    
    const startTime = Date.now();
    const translated = await translateObject(sourceJson, lang);
    const endTime = Date.now();
    
    const targetDir = `./src/locales/${lang}`;
    const targetFile = path.join(targetDir, 'translation.json');
    
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetFile, JSON.stringify(translated, null, 2));
    
    const timeTaken = Math.round((endTime - startTime) / 1000);
    console.log(`✅ ${lang.toUpperCase()} translation completed in ${timeTaken}s!`);
  }
  
  console.log('\n🎉 All translations completed successfully!');
}

main();