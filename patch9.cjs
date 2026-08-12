const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

code = code.replace(/updateOptions\(\{ originalImage: e.target.value \}\)/g, 'updateOptions({ originalImage: e.target.value, image: options.imageRadius > 0 ? "" : e.target.value })');
code = code.replace(/updateOptions\(\{ originalImage: event.target.result as string \}\)/g, 'updateOptions({ originalImage: event.target.result as string, image: options.imageRadius > 0 ? "" : event.target.result as string })');

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
