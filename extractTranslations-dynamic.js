const fs = require('fs');
const path = require('path');

const SEARCH_DIRS = ['./src/components', './src'];
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// الهيكل الأساسي الديناميكي
const extractedTexts = {
  nav: {},
  hero: {},
  expertise: {},
  timeline: {},
  projects: {
    title: "Personal Projects",
    autoplay: "Autoplay",
    view_project: "View Project",
    technologies: "Technologies",
    // المشاريع هتتملى ديناميكياً
  },
  contact: {},
  footer: {}
};

// دالة للبحث عن المشاريع في الكود
function findProjectsInCode() {
  const projects = {};
  
  SEARCH_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    function scanDirectory(directory) {
      const files = fs.readdirSync(directory);
      
      files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (FILE_EXTENSIONS.includes(path.extname(filePath))) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // البحث عن أسماء المشاريع في الكود
          const projectMatches = content.match(/projects\.(\w+)/g) || [];
          projectMatches.forEach(match => {
            const projectName = match.split('.')[1];
            if (projectName && !['title', 'autoplay', 'view_project', 'technologies'].includes(projectName)) {
              projects[projectName] = {
                title: `${projectName} - Project`,
                description: `Description for ${projectName}`,
                details: `Detailed information about ${projectName} project`
              };
            }
          });
        }
      });
    }
    
    scanDirectory(dir);
  });
  
  return projects;
}

// استخراج النصوص الحقيقية من الملفات
function extractRealTexts() {
  console.log('🚀 Scanning for dynamic texts...\n');
  
  // البحث عن المشاريع ديناميكياً
  const dynamicProjects = findProjectsInCode();
  extractedTexts.projects = {
    ...extractedTexts.projects,
    ...dynamicProjects
  };
  
  // إضافة النصوص الأساسية إذا محتاجها
  const basicProjects = {
    joblance: {
      title: "Job Lance - Career Platform",
      description: "An innovative career development platform with diverse job listings and user-friendly interface.",
      details: "Job Lance is a comprehensive career platform that connects job seekers with employers."
    },
    girljump: {
      title: "Girl Jump - 3D Game", 
      description: "A Unity-based 3D game with female protagonist navigating dynamic environments.",
      details: "An immersive 3D platformer game featuring a female protagonist."
    }
  };
  
  // دمج المشاريع الأساسية مع الديناميكية
  extractedTexts.projects = {
    ...extractedTexts.projects,
    ...basicProjects
  };
}

function saveResults() {
  const localesDir = './src/locales/en';
  
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }
  
  const outputFile = path.join(localesDir, 'translation.json');
  fs.writeFileSync(outputFile, JSON.stringify(extractedTexts, null, 2));
  
  console.log('🎉 Dynamic extraction completed!');
  console.log(`📁 File saved: ${outputFile}`);
  
  // عرض الإحصائيات
  console.log('\n📊 Dynamic Extraction Statistics:');
  const projectCount = Object.keys(extractedTexts.projects).filter(key => 
    !['title', 'autoplay', 'view_project', 'technologies'].includes(key)
  ).length;
  
  console.log(`   Projects found: ${projectCount}`);
  console.log(`   Total texts: ${JSON.stringify(extractedTexts).split('":"').length - 1}`);
}

// التشغيل
extractRealTexts();
saveResults();