const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

const newPreset = `  {
    id: 'orange-rounded',
    name: 'Small Rounded',
    options: {
      dotsOptions: {
        type: 'dots',
        color: '#ffffff',
        gradient: null as any
      },
      cornersSquareOptions: {
        type: 'rounded',
        color: '#f97316',
        gradient: null as any
      },
      cornersDotOptions: {
        type: 'square',
        color: '#f97316',
        gradient: null as any
      },
      backgroundOptions: {
        color: '#111111',
        gradient: null as any
      }
    }
  },
];`;

code = code.replace(/\];/, newPreset);
fs.writeFileSync('src/presets.ts', code);
