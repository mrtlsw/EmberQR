const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `
  const processingRef = React.useRef(false);
  const pendingProcess = React.useRef(false);

  useEffect(() => {
    let active = true;
    
    async function processImage() {
      if (processingRef.current) {
        pendingProcess.current = true;
        return;
      }
      
      processingRef.current = true;
      pendingProcess.current = false;
      
      if (!options.originalImage) {
         if (active && options.image !== '') {
            setOptions(prev => ({ ...prev, image: '' }));
         }
      } else if ((options.imageRadius || 0) > 0) {
         const processed = await roundImageCorners(options.originalImage, options.imageRadius || 0);
         if (active && options.image !== processed) {
            setOptions(prev => ({ ...prev, image: processed }));
         }
      } else {
         if (active && options.image !== options.originalImage) {
            setOptions(prev => ({ ...prev, image: options.originalImage }));
         }
      }
      
      processingRef.current = false;
      if (pendingProcess.current && active) {
         // Process again if it was triggered while we were processing
         setTimeout(processImage, 10);
      }
    }
    
    processImage();

    return () => {
      active = false;
    };
  }, [options.originalImage, options.imageRadius]);
`;

code = code.replace(/useEffect\(\(\) => \{\s*let active = true;\s*async function processImage\(\)[\s\S]*?\}, \[options.originalImage, options.imageRadius\]\);/, replacement.trim());

fs.writeFileSync('src/App.tsx', code);
