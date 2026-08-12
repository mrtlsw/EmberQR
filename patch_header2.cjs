const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<SpecularButton\n            onClick=\{\(\) => handleDownload\('png'\)\}\n            size="sm"/,
  `<SpecularButton
            onClick={() => handleDownload('png')}
            size="sm"
            className="!px-3 sm:!px-5"`
);

code = code.replace(
  /<SpecularButton\n            onClick=\{\(\) => handleDownload\('svg'\)\}\n            size="sm"/,
  `<SpecularButton
            onClick={() => handleDownload('svg')}
            size="sm"
            className="!px-3 sm:!px-5"`
);

code = code.replace(
  /<SpecularButton\n            onClick=\{\(\) => handleDownload\('pdf'\)\}\n            size="sm"/,
  `<SpecularButton
            onClick={() => handleDownload('pdf')}
            size="sm"
            className="!px-3 sm:!px-5"`
);

fs.writeFileSync('src/App.tsx', code);
