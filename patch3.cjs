const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `
  useEffect(() => {
    let active = true;
    async function processImage() {
      if (!options.originalImage) {
         if (options.image !== '') {
            setOptions(prev => ({ ...prev, image: '' }));
         }
         return;
      }
      if ((options.imageRadius || 0) > 0) {
         const processed = await roundImageCorners(options.originalImage, options.imageRadius || 0);
         if (active && options.image !== processed) {
            setOptions(prev => ({ ...prev, image: processed }));
         }
      } else {
         if (active && options.image !== options.originalImage) {
            setOptions(prev => ({ ...prev, image: options.originalImage }));
         }
      }
    }
    processImage();

    return () => {
      active = false;
    };
  }, [options.originalImage, options.imageRadius]);
`;

code = code.replace(/useEffect\(\(\) => \{\s*let active = true;\s*const timer = setTimeout\(async \(\) => \{[\s\S]*?\}, \[options.originalImage, options.imageRadius\]\);/, replacement.trim());

fs.writeFileSync('src/App.tsx', code);
