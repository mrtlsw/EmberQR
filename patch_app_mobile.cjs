const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Header
code = code.replace(
  /<header className="flex items-center justify-between px-8 h-16 bg-white\/\[0\.02\] backdrop-blur-\[40px\] border-b border-white\/\[0\.1\] z-10 shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.2\)\] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white\/\[0\.08\] before:to-transparent before:pointer-events-none">/,
  `<header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 sm:py-0 sm:h-16 bg-white/[0.02] backdrop-blur-[40px] border-b border-white/[0.1] z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none gap-4 sm:gap-0">`
);

// Fix Buttons in Header
code = code.replace(
  /<span>Export PNG<\/span>/,
  `<span className="hidden sm:inline">Export PNG</span><span className="sm:hidden">PNG</span>`
);
code = code.replace(
  /<span>Export SVG<\/span>/,
  `<span className="hidden sm:inline">Export SVG</span><span className="sm:hidden">SVG</span>`
);
code = code.replace(
  /<span>Export PDF<\/span>/,
  `<span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">PDF</span>`
);

// Fix Main Layout
code = code.replace(
  /<main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">/,
  `<main className="flex-1 flex flex-col-reverse md:flex-row overflow-y-auto md:overflow-hidden relative custom-scrollbar">`
);

// Fix aside
code = code.replace(
  /<aside className="w-full md:w-\[400px\] flex-shrink-0 relative z-10 border-r border-white\/\[0\.1\] bg-white\/\[0\.02\] backdrop-blur-\[40px\] flex flex-col shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white\/\[0\.05\] before:to-transparent before:pointer-events-none">/,
  `<aside className="w-full md:w-[400px] flex-shrink-0 relative z-10 border-t md:border-t-0 md:border-r border-white/[0.1] bg-white/[0.02] backdrop-blur-[40px] flex flex-col shadow-2xl md:overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/[0.05] before:to-transparent before:pointer-events-none">`
);

// Fix Preview Area
code = code.replace(
  /<section className="flex-1 flex flex-col items-center justify-center p-8 relative z-0 overflow-y-auto custom-scrollbar">/,
  `<section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-0 md:overflow-y-auto custom-scrollbar min-h-[400px] md:min-h-0">`
);

// Fix Footer
code = code.replace(
  /<footer className="h-10 bg-white\/\[0\.02\] backdrop-blur-\[40px\] flex items-center px-8 border-t border-white\/\[0\.1\] justify-between relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-white\/\[0\.05\] before:to-transparent before:pointer-events-none">/,
  `<footer className="h-auto min-h-[40px] py-2 sm:py-0 bg-white/[0.02] backdrop-blur-[40px] flex flex-col sm:flex-row items-center px-4 sm:px-8 border-t border-white/[0.1] justify-between relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/[0.05] before:to-transparent before:pointer-events-none gap-2 sm:gap-0">`
);

fs.writeFileSync('src/App.tsx', code);
