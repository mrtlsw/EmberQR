const fs = require('fs');

// 1. Fix App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

appCode = appCode.replace(
  /<main className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden relative custom-scrollbar">/,
  `<main className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden relative">`
);

appCode = appCode.replace(
  /<aside className="w-full md:w-\[400px\] flex-shrink-0 relative z-10 border-t md:border-t-0 md:border-r border-white\/\[0\.1\] bg-white\/\[0\.02\] backdrop-blur-\[40px\] flex flex-col shadow-2xl md:overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white\/\[0\.05\] before:to-transparent before:pointer-events-none">/,
  `<aside className="w-full md:w-[400px] flex-1 md:flex-shrink-0 relative z-10 border-t md:border-t-0 md:border-r border-white/[0.1] bg-white/[0.02] backdrop-blur-[40px] flex flex-col shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/[0.05] before:to-transparent before:pointer-events-none">`
);

appCode = appCode.replace(
  /<section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-0 md:overflow-y-auto custom-scrollbar min-h-\[400px\] md:min-h-0">/,
  `<section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-0 h-[45vh] md:h-auto overflow-y-auto md:overflow-hidden custom-scrollbar">`
);

appCode = appCode.replace(
  /<div className="max-w-xl w-full flex flex-col items-center space-y-8">/,
  `<div className="max-w-xl w-full flex flex-col items-center space-y-4 md:space-y-8">`
);

appCode = appCode.replace(
  /<h2 className="text-2xl font-light text-white mb-1">Live Preview<\/h2>/,
  `<h2 className="text-xl md:text-2xl font-light text-white mb-1">Live Preview</h2>`
);

fs.writeFileSync('src/App.tsx', appCode);

// 2. Fix SettingsSidebar.tsx
let sidebarCode = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

sidebarCode = sidebarCode.replace(
  /<div className="flex flex-col h-auto md:h-full bg-transparent">/,
  `<div className="flex flex-col h-full bg-transparent">`
);

sidebarCode = sidebarCode.replace(
  /<div className="p-4 sm:p-6 md:overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">/,
  `<div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">`
);

fs.writeFileSync('src/components/SettingsSidebar.tsx', sidebarCode);

// 3. Fix QRCodePreview.tsx
let previewCode = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

previewCode = previewCode.replace(
  /<div className="relative p-8 md:p-12 liquid-glass-panel rounded-\[2\.5rem\] flex items-center justify-center min-h-\[350px\]">/,
  `<div className="relative p-4 md:p-12 liquid-glass-panel rounded-3xl md:rounded-[2.5rem] flex items-center justify-center min-h-[150px] md:min-h-[350px] w-[80%] max-w-[280px] md:w-full md:max-w-none aspect-square md:aspect-auto mx-auto">`
);

fs.writeFileSync('src/components/QRCodePreview.tsx', previewCode);
