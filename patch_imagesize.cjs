const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(/imageSize:\s*0\.4/, 'imageSize: 0.3');
fs.writeFileSync('src/App.tsx', appCode);

let sidebarCode = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');
sidebarCode = sidebarCode.replace(/\|\| 0\.4\}/g, '|| 0.3}');
fs.writeFileSync('src/components/SettingsSidebar.tsx', sidebarCode);
