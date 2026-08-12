const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

const replacement = `
  const processingRef = React.useRef(false);
  const pendingProcess = React.useRef(false);
  const latestOptions = React.useRef(options);
  
  useEffect(() => {
    latestOptions.current = options;
  }, [options]);

  useEffect(() => {
    let active = true;
    const doUpdate = () => {
      if (!active) return;
      if (processingRef.current) {
        pendingProcess.current = true;
        return;
      }
      
      processingRef.current = true;
      pendingProcess.current = false;
      
      const currentOpts = latestOptions.current;
      
      try {
        qrCode.current.update({
          ...currentOpts,
          width: currentOpts.width ? Math.floor(currentOpts.width / 6) : 1024,
          height: currentOpts.height ? Math.floor(currentOpts.height / 6) : 1024,
          margin: currentOpts.margin ? Math.floor(currentOpts.margin / 6) : 50,
          type: 'canvas' as const
        });
      } catch (err) {
        console.error("QR Code update error:", err);
      }
      
      // Allow a small delay before next render to keep UI responsive
      setTimeout(() => {
        processingRef.current = false;
        if (pendingProcess.current && active) {
          doUpdate();
        }
      }, 30);
    };
    
    doUpdate();
    
    return () => {
      active = false;
    };
  }, [options]);
`;

code = code.replace(/const processingRef = React.useRef\(false\);\s*const pendingProcess = React.useRef\(false\);\s*useEffect\(\(\) => \{\s*let active = true;\s*const doUpdate = \(\) => \{[\s\S]*?\}, \[options\]\);/, replacement.trim());

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
