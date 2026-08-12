const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /type: 'square',\n        color: '#000000',\n      \},\n      cornersSquareOptions: \{/g,
  `type: 'square',
        color: '#000000',
        gradient: undefined
      },
      cornersSquareOptions: {`
);
code = code.replace(
  /cornersSquareOptions: \{\n        type: 'square',\n        color: '#000000',\n      \},\n      cornersDotOptions: \{/g,
  `cornersSquareOptions: {
        type: 'square',
        color: '#000000',
        gradient: undefined
      },
      cornersDotOptions: {`
);
code = code.replace(
  /cornersDotOptions: \{\n        type: 'square',\n        color: '#000000',\n      \},\n      backgroundOptions: \{/g,
  `cornersDotOptions: {
        type: 'square',
        color: '#000000',
        gradient: undefined
      },
      backgroundOptions: {`
);

// We should also clear gradient on backgroundOptions
code = code.replace(
  /backgroundOptions: \{\n        color: '#ffffff',\n      \}\n    \}\n  \},/g,
  `backgroundOptions: {
        color: '#ffffff',
        gradient: undefined
      }
    }
  },`
);

fs.writeFileSync('src/presets.ts', code);
