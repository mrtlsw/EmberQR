const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /color: '([^']+)'(?!,\s*gradient)/g,
  `color: '$1',
        gradient: undefined`
);

fs.writeFileSync('src/presets.ts', code);
