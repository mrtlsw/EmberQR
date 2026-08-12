const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

const replacement = `
  const processingRef = React.useRef(false);
  const pendingProcess = React.useRef(false);

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
      
      try {
        qrCode.current.update({
          ...options,
          width: options.width ? Math.floor(options.width / 6) : 1024,
          height: options.height ? Math.floor(options.height / 6) : 1024,
          margin: options.margin ? Math.floor(options.margin / 6) : 50,
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

code = code.replace(/useEffect\(\(\) => \{\s*try \{\s*qrCode.current.update\(\{[\s\S]*?\}, \[options\]\);/, replacement.trim());

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
