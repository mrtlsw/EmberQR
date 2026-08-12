const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(/max="50"\s*step="1"\s*value=\{options.imageOptions\?.margin \|\| 10\}/, 'max="300"\n                        step="5"\n                        value={options.imageOptions?.margin || 10}');

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
