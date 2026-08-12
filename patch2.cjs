const fs = require('fs');
let code = fs.readFileSync('src/components/QRCodePreview.tsx', 'utf8');

const replacement = `
  const [debouncedOptions, setDebouncedOptions] = React.useState(options);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedOptions(options);
    }, 50);
    return () => clearTimeout(timer);
  }, [options]);

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
        ...debouncedOptions,
        width: debouncedOptions.width ? Math.floor(debouncedOptions.width / 6) : 1024,
        height: debouncedOptions.height ? Math.floor(debouncedOptions.height / 6) : 1024,
        margin: debouncedOptions.margin ? Math.floor(debouncedOptions.margin / 6) : 50,
        type: 'canvas' as const
      });
    } catch (err) {
      console.error("QR Code update error:", err);
    }
  }, [debouncedOptions]);
`;

code = code.replace(/useEffect\(\(\) => \{\s*try \{\s*if \(ref.current\) \{\s*\/\/ Clear container first[\s\S]*?\}, \[options\]\);/, replacement.trim());

fs.writeFileSync('src/components/QRCodePreview.tsx', code);
