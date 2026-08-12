const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="flex items-center gap-3">\n\s*<div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center shadow-\[0_0_15px_rgba\(245,158,11,0\.3\)\]\">\n\s*<div className="w-4 h-4 border-2 border-black"><\/div>\n\s*<\/div>\n\s*<div>\n\s*<h1 className="text-xl font-bold tracking-tight text-white">\n\s*QR<span className="text-amber-500">FORGE<\/span>\n\s*<\/h1>\n\s*<\/div>\n\s*<span className="ml-2 px-2 py-0.5 rounded border border-amber-500\/20 text-\[10px\] text-amber-500 uppercase tracking-widest font-semibold hidden sm:inline-block">Pro v2.4<\/span>\n\s*<\/div>/,
  `<div></div>`
);

fs.writeFileSync('src/App.tsx', code);
