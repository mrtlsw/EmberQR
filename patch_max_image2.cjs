const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(/max="0\.5"/, 'max="0.3"');

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
