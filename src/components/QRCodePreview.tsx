import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Options } from '../types';
import { motion } from 'motion/react';

interface QRCodePreviewProps {
  options: Options;
  onDownload: (extension: 'png' | 'jpeg' | 'webp' | 'svg', qrCode: QRCodeStyling) => void;
  setQrCodeInstance: (instance: QRCodeStyling) => void;
}

export function QRCodePreview({ options, onDownload, setQrCodeInstance }: QRCodePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Divide the actual layout pixels by 6 (size and margin) so the preview
  // is a real reflection of actual layout and renders correctly, while keeping
  // output settings intact.
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
  
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling(previewOptions));

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

  const processingRef = React.useRef(false);
  const pendingProcess = React.useRef(false);
  const latestOptions = React.useRef(options);
  const updateTimeout = React.useRef<NodeJS.Timeout | null>(null);
  
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
          imageOptions: currentOpts.imageOptions ? {
            ...currentOpts.imageOptions,
            margin: currentOpts.imageOptions.margin ? Math.floor(currentOpts.imageOptions.margin / 6) : 0
          } : undefined,
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
      }, 50);
    };
    
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }
    
    updateTimeout.current = setTimeout(() => {
      doUpdate();
    }, 150);
    
    return () => {
      active = false;
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [options]);

  return (
    <div className="relative group w-full flex justify-center">
      {/* Glow Effect behind the glass */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-500/20 blur-[80px] rounded-full opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
      
      <div className="relative p-4 md:p-12 liquid-glass-panel rounded-2xl md:rounded-[2.5rem] flex items-center justify-center w-full max-w-[280px] md:max-w-none aspect-square md:aspect-auto mx-auto">
        <div ref={ref} className="qr-container overflow-hidden rounded-xl shadow-inner relative z-10" />
      </div>
    </div>
  );
}
