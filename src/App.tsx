import React, { useState, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Options } from './types';
import { QRCodePreview } from './components/QRCodePreview';
import { SettingsSidebar } from './components/SettingsSidebar';
import { Download, ScanQrCode, AlertTriangle, Heart } from 'lucide-react';
import jsPDF from 'jspdf';
import 'svg2pdf.js';
import { presets } from './presets';
import { getContrast, getLuminance } from './utils/colors';
import { roundImageCorners } from './utils/image';
import { motion } from 'motion/react';
import WebThreads from './components/WebThreads';
import SpecularButton from './components/SpecularButton';

const defaultOptions: Options = {
  width: 4096,
  height: 4096,
  type: 'svg',
  data: 'https://belakor.ir',
  image: '',
  originalImage: '',
  imageRadius: 0,
  margin: 200,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'H'
  },
  imageOptions: {
    crossOrigin: "anonymous",
    hideBackgroundDots: true,
    imageSize: 0.3,
    margin: 10
  },
  dotsOptions: {
    type: 'square',
    color: '#000000',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'square',
    color: '#000000'
  },
  cornersDotOptions: {
    type: 'square',
    color: '#000000'
  }
};

export default function App() {
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [qrCodeInstance, setQrCodeInstance] = useState<QRCodeStyling | null>(null);
  const [exportTransparentBg, setExportTransparentBg] = useState(true);

  const handleDownload = async (extension: 'png' | 'jpeg' | 'webp' | 'svg' | 'pdf') => {
    if (!qrCodeInstance) return;
    
    const downloadOptions = { ...options };
    if (exportTransparentBg) {
      downloadOptions.backgroundOptions = { ...downloadOptions.backgroundOptions, color: 'transparent' };
    }
    
    if (extension === 'pdf' || extension === 'svg') {
      const svgQrCode = new QRCodeStyling({
        ...downloadOptions,
        type: 'svg'
      });
      
      try {
        const rawBlob = (await svgQrCode.getRawData('svg')) as Blob;
        if (!rawBlob) return;
        const svgText = await rawBlob.text();
        
        // Fix Illustrator "Clipping will be lost on roundtrip to Tiny" issue
        // We parse the SVG string, find clipPath elements, and apply their contents directly
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        
        // Find all rects that have a clip-path
        const rects = Array.from(doc.querySelectorAll('rect[clip-path]'));
        rects.forEach(rect => {
          const clipPathAttr = rect.getAttribute('clip-path');
          if (!clipPathAttr) return;
          
          // Extract the ID from something like url('#clip-path-id') or url(#clip-path-id)
          const match = clipPathAttr.match(/url\(['"]?#([^)'"]+)['"]?\)/);
          if (match && match[1]) {
            const clipPathId = match[1];
            const clipPath = doc.querySelector(`[id="${clipPathId}"]`);
            if (clipPath) {
              const g = doc.createElementNS("http://www.w3.org/2000/svg", "g");
              const fill = rect.getAttribute("fill");
              if (fill) g.setAttribute("fill", fill);
              
              // Move all shapes from the clipPath to the new group
              while (clipPath.firstChild) {
                g.appendChild(clipPath.firstChild);
              }
              
              // Replace the rect with the new group
              if (rect.parentNode) {
                rect.parentNode.replaceChild(g, rect);
              }
              
              // Remove the clipPath from defs
              if (clipPath.parentNode) {
                clipPath.parentNode.removeChild(clipPath);
              }
            }
          }
        });

        if (extension === 'pdf') {
          const pdfWidth = options.width || 300;
          const pdfHeight = options.height || 300;
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
          });
          
          await pdf.svg(doc.documentElement, {
            x: 0,
            y: 0,
            width: pdfWidth,
            height: pdfHeight
          });
          
          pdf.save(`qr-code-${Date.now()}.pdf`);
        } else {
          // Convert back to string
          const serializer = new XMLSerializer();
          let newSvgText = serializer.serializeToString(doc);
          // Add xml declaration back just in case
          if (!newSvgText.startsWith('<?xml')) {
            newSvgText = '<?xml version="1.0" standalone="no"?>\r\n' + newSvgText;
          }
          
          const modifiedBlob = new Blob([newSvgText], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(modifiedBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `qr-code-${Date.now()}.svg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error(`Failed to generate ${extension.toUpperCase()}:`, error);
      }
    } else {
      const tempInstance = new QRCodeStyling(downloadOptions);
      tempInstance.download({ name: `qr-code-${Date.now()}`, extension });
    }
  };

  const dotColor = options.dotsOptions?.color || '#000000';
  const bgColor = options.backgroundOptions?.color || '#ffffff';
  const contrast = getContrast(dotColor, bgColor);
  const isLowContrast = contrast < 1.5;

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
  
  useEffect(() => {
    if (isLowContrast) {
      const dotLuminance = getLuminance(dotColor);
      const newBgColor = dotLuminance > 0.5 ? '#000000' : '#ffffff';
      setOptions(prev => ({
        ...prev,
        backgroundOptions: {
          ...prev.backgroundOptions,
          color: newBgColor
        }
      }));
    }
  }, [isLowContrast, dotColor]);

  return (
    <div className="min-h-screen md:h-screen w-full bg-gradient-to-br from-[#111111] via-[#050505] to-[#000000] text-gray-300 flex flex-col font-sans md:overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <WebThreads
          color1="#F97316"
          color2="#f7f7f7"
          color3="#ffffff"
          speed={0.2}
          threadCount={6}
          frequency={5.0}
          spread={0.18}
          taper={1.0}
          position={0.5}
          fanMode="center"
          glow={0.01}
          falloff={0.8}
          thickness={1.1}
          brightness={0.4}
          opacity={0.6}
          mirror={true}
          shimmer={true}
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.15}
        />
      </div>

      {/* Header */}
      <header className="flex flex-row items-center justify-between px-3 sm:px-8 h-16 bg-white/[0.02] md:backdrop-blur-[40px] border-b border-white/[0.1] z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
        <div></div>
        
        <div className="flex gap-1.5 sm:gap-3 flex-wrap justify-end">
          <SpecularButton
            onClick={() => handleDownload('png')}
            size="sm"
            className="!px-2.5 sm:!px-5"
            radius={20}
            tint="rgba(249,115,22,0.15)"
            tintOpacity={1}
            baseColor="#F97316"
            lineColor="#ffffff"
            textColor="#ffffff"
            intensity={2}
            autoAnimate={true}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold">
              <Download size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Export PNG</span><span className="sm:hidden">PNG</span>
            </div>
          </SpecularButton>
          <SpecularButton
            onClick={() => handleDownload('svg')}
            size="sm"
            className="!px-2.5 sm:!px-5"
            radius={20}
            tint="rgba(249,115,22,0.15)"
            tintOpacity={1}
            baseColor="#F97316"
            lineColor="#ffffff"
            textColor="#ffffff"
            intensity={2}
            autoAnimate={true}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold">
              <Download size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Export SVG</span><span className="sm:hidden">SVG</span>
            </div>
          </SpecularButton>
          <SpecularButton
            onClick={() => handleDownload('pdf')}
            size="sm"
            className="!px-2.5 sm:!px-5"
            radius={20}
            tint="rgba(249,115,22,0.15)"
            tintOpacity={1}
            baseColor="#F97316"
            lineColor="#ffffff"
            textColor="#ffffff"
            intensity={2}
            autoAnimate={true}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold">
              <Download size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">PDF</span>
            </div>
          </SpecularButton>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden relative">

        {/* Sidebar Controls */}
        <aside className="w-full md:w-[400px] flex-none relative z-10 border-t md:border-t-0 md:border-r border-white/[0.1] bg-white/[0.02] md:backdrop-blur-[40px] flex flex-col shadow-2xl md:overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/[0.05] before:to-transparent before:pointer-events-none order-2 md:order-1">
          <SettingsSidebar 
            options={options} 
            setOptions={setOptions}
            exportTransparentBg={exportTransparentBg}
            setExportTransparentBg={setExportTransparentBg}
          />
        </aside>

        {/* Preview Area */}
        <section className="flex-shrink-0 md:flex-1 flex flex-col items-center justify-center py-4 px-2 sm:p-8 relative z-0 h-auto overflow-hidden order-1 md:order-2">
          <div className="max-w-xl w-full flex flex-col items-center space-y-2 md:space-y-8">
            <div className="text-center space-y-0.5 md:space-y-2 relative z-10">
              <h2 className="text-lg md:text-2xl font-light text-white mb-0 md:mb-1">Live Preview</h2>
            </div>
            
            {isLowContrast && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl flex items-start gap-3 max-w-sm text-xs font-medium shadow-[0_0_15px_rgba(245,158,11,0.1)] relative z-10"
              >
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p>
                  <strong>Low Contrast Detected!</strong> The selected colors may render the QR code invisible or hard to scan, especially if placed on a similar colored background or printed.
                </p>
              </motion.div>
            )}
            
            <QRCodePreview 
              options={options} 
              onDownload={handleDownload} 
              setQrCodeInstance={setQrCodeInstance} 
            />
          </div>
        </section>
      </main>
      
      <footer className="h-auto min-h-[40px] py-2 sm:py-0 bg-white/[0.02] md:backdrop-blur-[40px] flex items-center px-4 sm:px-8 border-t border-white/[0.1] justify-center relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/[0.05] before:to-transparent before:pointer-events-none gap-2 sm:gap-0">
        <div className="text-[10px] text-white/40 flex items-center gap-1.5 font-medium tracking-wide">
          Made with <Heart size={10} className="text-red-500 fill-red-500" /> by <a href="https://github.com/mrtlsw" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 hover:underline">mrtlsw</a>
        </div>
      </footer>
    </div>
  );
}
