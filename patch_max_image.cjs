const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(/max="0\.8"/, 'max="0.5"');
code = code.replace(/step="0\.05"/, 'step="0.02"');

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
