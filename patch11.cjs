const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `
  const processingRef = React.useRef(false);
  const pendingProcess = React.useRef(false);
  const latestOptions = React.useRef(options);
  const processImageTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    latestOptions.current = options;
  }, [options]);

  useEffect(() => {
    let active = true;
    
    async function processImage() {
      if (processingRef.current) {
        pendingProcess.current = true;
        return;
      }
      
      processingRef.current = true;
      pendingProcess.current = false;
      
      const currentOpts = latestOptions.current;
      
      if (!currentOpts.originalImage) {
         if (active && currentOpts.image !== '') {
            setOptions(prev => ({ ...prev, image: '' }));
         }
      } else if ((currentOpts.imageRadius || 0) > 0) {
         const processed = await roundImageCorners(currentOpts.originalImage, currentOpts.imageRadius || 0);
         if (active && latestOptions.current.image !== processed) {
            setOptions(prev => ({ ...prev, image: processed }));
         }
      } else {
         if (active && currentOpts.image !== currentOpts.originalImage) {
            setOptions(prev => ({ ...prev, image: currentOpts.originalImage }));
         }
      }
      
      processingRef.current = false;
      if (pendingProcess.current && active) {
         processImageTimeout.current = setTimeout(processImage, 10);
      }
    }
    
    // Debounce processImage to avoid lag
    if (processImageTimeout.current) {
      clearTimeout(processImageTimeout.current);
    }
    processImageTimeout.current = setTimeout(() => {
      if (active) processImage();
    }, 150);

    return () => {
      active = false;
      if (processImageTimeout.current) {
        clearTimeout(processImageTimeout.current);
      }
    };
  }, [options.originalImage, options.imageRadius]);
`;

code = code.replace(/const processingRef = React.useRef\(false\);\s*const pendingProcess = React.useRef\(false\);\s*const latestOptions = React.useRef\(options\);\s*useEffect\(\(\) => \{\s*latestOptions.current = options;\s*\}, \[options\]\);\s*useEffect\(\(\) => \{\s*let active = true;\s*async function processImage\(\)[\s\S]*?\}, \[options.originalImage, options.imageRadius\]\);/, replacement.trim());

fs.writeFileSync('src/App.tsx', code);
