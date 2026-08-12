const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<footer className="h-auto min-h-\[40px\] py-2 sm:py-0 bg-white\/\[0\.02\] backdrop-blur-\[40px\] flex flex-col sm:flex-row items-center px-4 sm:px-8 border-t border-white\/\[0\.1\] justify-between relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-white\/\[0\.05\] before:to-transparent before:pointer-events-none gap-2 sm:gap-0">\n        <div className="flex gap-6 text-\[10px\] text-white\/40 hidden md:flex">\n          <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500"><\/div> CLOUD_SYNC: ACTIVE<\/span>\n          <span>API_STATUS: NOMINAL<\/span>\n        <\/div>\n        <div className="text-\[10px\] text-white\/40 flex items-center gap-1\.5 font-medium tracking-wide">\n          Made with <Heart size=\{10\} className="text-red-500 fill-red-500" \/> by <a href="https:\/\/github\.com\/mrtlsw" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 hover:underline">mrtlsw<\/a>\n        <\/div>\n        <div className="text-\[10px\] text-white\/20 font-mono hidden sm:block">\n          SYSTEM_UPTIME: 442:12:09\n        <\/div>\n      <\/footer>/,
  `<footer className="h-auto min-h-[40px] py-2 sm:py-0 bg-white/[0.02] backdrop-blur-[40px] flex items-center px-4 sm:px-8 border-t border-white/[0.1] justify-center relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/[0.05] before:to-transparent before:pointer-events-none gap-2 sm:gap-0">
        <div className="text-[10px] text-white/40 flex items-center gap-1.5 font-medium tracking-wide">
          Made with <Heart size={10} className="text-red-500 fill-red-500" /> by <a href="https://github.com/mrtlsw" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 hover:underline">mrtlsw</a>
        </div>
      </footer>`
);

fs.writeFileSync('src/App.tsx', code);
