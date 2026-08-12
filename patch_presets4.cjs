const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

const newPreset = `  },
  {
    id: 'blue-eyes-round-dots',
    name: 'Blue eyes - Round Dots',
    options: {
      dotsOptions: {
        type: 'rounded',
        color: '#ffffff',
        gradient: null as any
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#38bdf8',
        gradient: null as any
      },
      cornersDotOptions: {
        type: 'extra-rounded',
        color: '#38bdf8',
        gradient: null as any
      },
      backgroundOptions: {
        color: '#0f172a',
        gradient: null as any
      }
    }
  }
];`;

code = code.replace(/  \}\n\];$/m, newPreset);
fs.writeFileSync('src/presets.ts', code);
