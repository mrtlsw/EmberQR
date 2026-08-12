const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(
  /const cornerTypes = \['dot', 'square', 'extra-rounded'\] as const;/,
  `const cornerTypes = ['dot', 'square', 'rounded', 'extra-rounded'] as const;`
);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
