const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

const replacement1 = `
  const previewOptions = {
    ...options,
    width: options.width ? Math.floor(options.width / 6) : 1024,
    height: options.height ? Math.floor(options.height / 6) : 1024,
    margin: options.margin ? Math.floor(options.margin / 6) : 50,
    imageOptions: options.imageOptions ? {
      ...options.imageOptions,
      margin: options.imageOptions.margin ? Math.floor(options.imageOptions.margin / 6) : 0
    } : undefined,
    type: 'canvas' as const
  };
`;
code = code.replace(/const previewOptions = \{[\s\S]*?type: 'canvas' as const\s*\};/, replacement1.trim());

const replacement2 = `
        qrCode.current.update({
          ...currentOpts,
          width: currentOpts.width ? Math.floor(currentOpts.width / 6) : 1024,
          height: currentOpts.height ? Math.floor(currentOpts.height / 6) : 1024,
          margin: currentOpts.margin ? Math.floor(currentOpts.margin / 6) : 50,
          imageOptions: currentOpts.imageOptions ? {
            ...currentOpts.imageOptions,
            margin: currentOpts.imageOptions.margin ? Math.floor(currentOpts.imageOptions.margin / 6) : 0
          } : undefined,
          type: 'canvas' as const
        });
`;
code = code.replace(/qrCode\.current\.update\(\{[\s\S]*?type: 'canvas' as const\s*\}\);/, replacement2.trim());

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
