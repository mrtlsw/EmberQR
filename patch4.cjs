const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

const replacement = `
  useEffect(() => {
    try {
      if (ref.current) {
        ref.current.innerHTML = '';
        qrCode.current.append(ref.current);
        setQrCodeInstance(qrCode.current);
      }
    } catch (err) {
      console.error("QR Code init error:", err);
    }
  }, [setQrCodeInstance]);

  useEffect(() => {
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
  }, [options]);
`;

code = code.replace(/const \[debouncedOptions, setDebouncedOptions\] = React.useState\(options\);[\s\S]*?\}, \[debouncedOptions\]\);/, replacement.trim());

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
