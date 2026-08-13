import React, { useState, useEffect } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { motion } from 'motion/react';
import SpecularButton from './components/SpecularButton';
import MoltenMetal from './components/MoltenMetal';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-gradient-to-br from-[#111111] via-[#050505] to-[#000000] text-gray-300 flex flex-col font-sans lg:overflow-hidden relative items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <MoltenMetal
          particleCount={20}
          baseColor="#1f1505"
          highlightColor="#6b3003"
          animationSpeed={1}
          blurAmount={8}
          scale={1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 backdrop-blur-[20px] pointer-events-none" />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md liquid-glass-panel rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-center justify-center p-8 sm:p-12 border border-white/[0.08] shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
        >
          <AlertTriangle size={48} className="text-amber-500" strokeWidth={1.5} />
        </motion.div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
            404
          </h1>
          <h2 className="text-lg sm:text-xl font-light text-white/70">
            Page Not Found
          </h2>
        </div>

        <p className="text-center text-sm text-white/50 mb-8 max-w-[240px]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide mb-8 shadow-inner">
          Redirecting to home in <span className="font-bold">{countdown}</span>...
        </div>

        <SpecularButton 
          onClick={() => window.location.href = '/'}
          size="sm"
          className="!px-6 !py-3"
          radius={20}
          tint="rgba(249,115,22,0.15)"
          tintOpacity={1}
          baseColor="#F97316"
          lineColor="#ffffff"
          textColor="#ffffff"
          intensity={2}
          autoAnimate={true}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold">
            <Home size={14} />
            <span>Go Home Now</span>
          </div>
        </SpecularButton>
      </motion.div>
    </div>
  );
}
