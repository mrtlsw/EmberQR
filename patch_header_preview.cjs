const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="text-center space-y-0.5 md:space-y-2 relative z-10">\n\s*<h2 className="text-lg md:text-2xl font-light text-white mb-0 md:mb-1">Live Preview<\/h2>\n\s*<p className="text-xs font-mono text-white\/40">Auto-updating canvas<\/p>\n\s*<\/div>/,
  `<div className="text-center space-y-0.5 md:space-y-2 relative z-10">
              <h2 className="text-lg md:text-2xl font-light text-white mb-0 md:mb-1">Live Preview</h2>
            </div>`
);

code = code.replace(
  /<div className="flex items-center gap-3">\n\s*<div className="w-10 h-10 rounded-2xl bg-amber-500\/10 border border-amber-500\/20 flex items-center justify-center relative overflow-hidden group">\n\s*<div className="absolute inset-0 bg-gradient-to-tr from-amber-500\/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><\/div>\n\s*<ScanQrCode size=\{20\} className="text-amber-500 relative z-10" \/>\n\s*<\/div>\n\s*<div>\n\s*<h1 className="text-xl font-bold tracking-tight text-white">\n\s*QR<span className="text-amber-500">FORGE<\/span>\n\s*<\/h1>\n\s*<\/div>\n\s*<span className="ml-2 px-2 py-0.5 rounded border border-amber-500\/20 text-\[10px\] text-amber-500 uppercase tracking-widest font-semibold hidden sm:inline-block">Pro v2.4<\/span>\n\s*<\/div>/,
  `<div className="flex items-center gap-3">
        </div>`
);

fs.writeFileSync('src/App.tsx', code);
