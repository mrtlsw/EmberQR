const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

code = code.replace(
  /<div className="relative p-4 md:p-12 liquid-glass-panel rounded-3xl md:rounded-\[2\.5rem\] flex items-center justify-center min-h-\[150px\] md:min-h-\[350px\] w-\[80%\] max-w-\[280px\] md:w-full md:max-w-none aspect-square md:aspect-auto mx-auto">/,
  `<div className="relative p-3 md:p-12 liquid-glass-panel rounded-2xl md:rounded-[2.5rem] flex items-center justify-center min-h-[120px] md:min-h-[350px] w-[200px] h-[200px] md:w-full md:h-auto md:max-w-none aspect-square md:aspect-auto mx-auto">`
);

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
