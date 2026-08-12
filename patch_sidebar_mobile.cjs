const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(
  /<div className="flex flex-col h-full bg-transparent">/,
  `<div className="flex flex-col h-auto md:h-full bg-transparent">`
);

code = code.replace(
  /<div className="p-6 overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">/,
  `<div className="p-4 sm:p-6 md:overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">`
);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
