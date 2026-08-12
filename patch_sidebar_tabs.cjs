const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(
  /<div className="flex p-2 gap-1 border-b border-white\/\[0\.1\] bg-white\/\[0\.02\] overflow-x-auto no-scrollbar">/g,
  `<div className="grid grid-cols-4 p-2 gap-1 border-b border-white/10 bg-white/[0.02] w-full">`
);
// wait the regex for border-white/10 wasn't right in my replace string above, it's border-white/10
code = code.replace(
  /<div className="flex p-2 gap-1 border-b border-white\/10 bg-white\/\[0\.02\] overflow-x-auto no-scrollbar">/g,
  `<div className="grid grid-cols-4 p-2 gap-1 border-b border-white/10 bg-white/[0.02] w-full">`
);

code = code.replace(
  /className="!px-2 !py-2 flex-1 !rounded-xl"/g,
  `className="!px-1 sm:!px-2 !py-2 w-full !rounded-xl"`
);

code = code.replace(
  /<div className="flex items-center justify-center gap-1 relative z-10 text-\[9px\] uppercase tracking-wider font-bold whitespace-nowrap">/g,
  `<div className="flex items-center justify-center gap-1 relative z-10 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold whitespace-nowrap">`
);

// We should hide the text on very small screens, let's say hidden sm:inline-block
code = code.replace(
  /<span>\{label\}<\/span>/g,
  `<span className="hidden sm:inline">{label}</span>`
);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
