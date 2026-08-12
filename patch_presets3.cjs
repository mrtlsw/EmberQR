const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /color: '#f59e0b',\n\s*gradient: undefined \},\n\s*\{ offset: 1, color: '#ef4444',\n\s*gradient: undefined \}/g,
  `color: '#f59e0b' },
            { offset: 1, color: '#ef4444' }`
);

fs.writeFileSync('src/presets.ts', code);
