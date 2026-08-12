const fs = require('fs');
let code = fs.readFileSync('src/presets.ts', 'utf8');

code = code.replace(
  /    \}\n  \}\n  \{/g,
  `    }
  },
  {`
);

fs.writeFileSync('src/presets.ts', code);
