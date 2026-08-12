const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 sm:py-0 sm:h-16 bg-white\/\[0\.02\] backdrop-blur-\[40px\] border-b border-white\/\[0\.1\] z-10 shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.2\)\] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white\/\[0\.08\] before:to-transparent before:pointer-events-none gap-4 sm:gap-0">/,
  `<header className="flex flex-row items-center justify-between px-3 sm:px-8 h-16 bg-white/[0.02] backdrop-blur-[40px] border-b border-white/[0.1] z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">`
);

code = code.replace(
  /<div className="flex gap-3">/,
  `<div className="flex gap-1.5 sm:gap-3">`
);

// Optional: hide "Pro v2.4" on mobile to save space
code = code.replace(
  /<span className="ml-2 px-2 py-0\.5 rounded border border-amber-500\/20 text-\[10px\] text-amber-500 uppercase tracking-widest font-semibold hidden md:inline-block">Pro v2\.4<\/span>/,
  `<span className="ml-2 px-2 py-0.5 rounded border border-amber-500/20 text-[10px] text-amber-500 uppercase tracking-widest font-semibold hidden sm:inline-block">Pro v2.4</span>`
);

fs.writeFileSync('src/App.tsx', code);
