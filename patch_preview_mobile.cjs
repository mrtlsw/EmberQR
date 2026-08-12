const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative z-0 h-\[45vh\] md:h-auto overflow-y-auto md:overflow-hidden custom-scrollbar">/,
  `<section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center py-4 px-2 sm:p-8 relative z-0 h-auto overflow-hidden">`
);

code = code.replace(
  /<div className="max-w-xl w-full flex flex-col items-center space-y-4 md:space-y-8">/,
  `<div className="max-w-xl w-full flex flex-col items-center space-y-2 md:space-y-8">`
);

code = code.replace(
  /<div className="text-center space-y-2 relative z-10">/,
  `<div className="text-center space-y-0.5 md:space-y-2 relative z-10">`
);

code = code.replace(
  /<h2 className="text-xl md:text-2xl font-light text-white mb-1">Live Preview<\/h2>/,
  `<h2 className="text-lg md:text-2xl font-light text-white mb-0 md:mb-1">Live Preview</h2>`
);

fs.writeFileSync('src/App.tsx', code);
