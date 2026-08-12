const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /id: 'orange-rounded'[\s\S]*?cornersSquareOptions:\s*\{\s*type:\s*'rounded',/m,
  match => match.replace("'rounded'", "'extra-rounded'")
);

fs.writeFileSync('src/presets.ts', code);
