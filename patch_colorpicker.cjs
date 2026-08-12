const fs = require('fs');
let code = fs.readFileSync('src/components/ColorPicker.tsx', 'utf8');

code = code.replace(
  /onChange\(color \|\| '#000000', undefined\);/g,
  `onChange(color || '#000000', null as any);`
);

fs.writeFileSync('src/components/ColorPicker.tsx', code);
