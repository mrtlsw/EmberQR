const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /id: 'orange-rounded'[\s\S]*?cornersDotOptions:\s*\{\s*type:\s*'square',/m,
  match => match.replace("'square'", "'extra-rounded'")
);

fs.writeFileSync('src/presets.ts', code);
