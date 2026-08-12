import React from 'react';
import { TypeNumber } from 'qr-code-styling';
import { Options } from '../types';
import { presets } from '../presets';
import { QRPreset } from '../types';
import { Download, Palette, Settings, Type, Sliders, Image as ImageIcon, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SpecularButton from './SpecularButton';
import { ColorPicker } from './ColorPicker';

interface SettingsSidebarProps {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  exportTransparentBg: boolean;
  setExportTransparentBg: React.Dispatch<React.SetStateAction<boolean>>;
}

const dotTypes = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'] as const;
const cornerTypes = ['dot', 'square', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'] as const;

export function SettingsSidebar({ options, setOptions, exportTransparentBg, setExportTransparentBg }: SettingsSidebarProps) {
  const [activeTab, setActiveTab] = React.useState<'data' | 'style' | 'presets' | 'advanced'>('data');
  const [contentType, setContentType] = React.useState<'url' | 'text'>('url');
  
  const [customPresets, setCustomPresets] = React.useState<QRPreset[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('qr-custom-presets');
    if (saved) {
      try {
        setCustomPresets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse custom presets', e);
      }
    }
  }, []);

  const saveCustomPreset = () => {
    const name = prompt('Enter a name for this preset:');
    if (!name || name.trim() === '') return;
    
    // Deep clone options to avoid reference issues
    const presetOptions = JSON.parse(JSON.stringify(options));
    
    const newPreset: QRPreset = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      options: presetOptions
    };
    
    const updated = [...customPresets, newPreset];
    setCustomPresets(updated);
    localStorage.setItem('qr-custom-presets', JSON.stringify(updated));
  };

  const deleteCustomPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPresets.filter(p => p.id !== id);
    setCustomPresets(updated);
    localStorage.setItem('qr-custom-presets', JSON.stringify(updated));
  };


  const updateOptions = (updates: Partial<Options>) => {
    setOptions((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: QRPreset) => {
    updateOptions(preset.options);
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="grid grid-cols-4 p-2 gap-1 border-b border-white/10 bg-white/[0.02] w-full">
        <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={<Type size={14} />} label="DATA" />
        <TabButton active={activeTab === 'style'} onClick={() => setActiveTab('style')} icon={<Palette size={14} />} label="STYLE" />
        <TabButton active={activeTab === 'presets'} onClick={() => setActiveTab('presets')} icon={<Settings size={14} />} label="PRESETS" />
        <TabButton active={activeTab === 'advanced'} onClick={() => setActiveTab('advanced')} icon={<Sliders size={14} />} label="ADVANCED" />
      </div>

      <div className="p-4 sm:p-6 overflow-y-visible md:overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block">Content Type</label>
                  <div className="flex gap-2">
                    <SpecularButton 
                      className="px-3 py-1.5 text-[9px]"
                      onClick={() => {
                        setContentType('url');
                        let val = options.data || '';
                        if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
                          updateOptions({ data: 'https://' + val });
                        }
                      }}
                      size="sm"
                      radius={10}
                      tint={contentType === 'url' ? "rgba(255,255,255,0.15)" : "transparent"}
                      tintOpacity={contentType === 'url' ? 1 : 0}
                      baseColor={contentType === 'url' ? "#F97316" : "#222222"}
                      lineColor={contentType === 'url' ? "#ffffff" : "#666666"}
                      textColor={contentType === 'url' ? "#ffffff" : "#a3a3a3"}
                      intensity={contentType === 'url' ? 2 : 0.5}
                      speed={0.2}
                      autoAnimate={contentType === 'url'}
                    >
                      URL
                    </SpecularButton>
                    <SpecularButton 
                      className="px-3 py-1.5 text-[9px]"
                      onClick={() => setContentType('text')}
                      size="sm"
                      radius={10}
                      tint={contentType === 'text' ? "rgba(255,255,255,0.15)" : "transparent"}
                      tintOpacity={contentType === 'text' ? 1 : 0}
                      baseColor={contentType === 'text' ? "#F97316" : "#222222"}
                      lineColor={contentType === 'text' ? "#ffffff" : "#666666"}
                      textColor={contentType === 'text' ? "#ffffff" : "#a3a3a3"}
                      intensity={contentType === 'text' ? 2 : 0.5}
                      speed={0.2}
                      autoAnimate={contentType === 'text'}
                    >
                      Text
                    </SpecularButton>
                  </div>
                </div>
                <textarea
                  value={options.data}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (contentType === 'url' && val.length > 0) {
                      if (!val.startsWith('http://') && !val.startsWith('https://')) {
                        val = 'https://' + val;
                      }
                    }
                    updateOptions({ data: val });
                  }}
                  className="liquid-input h-32 resize-none"
                  placeholder={contentType === 'url' ? "https://example.com" : "Enter your text here..."}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-4 block">Image / Logo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={options.originalImage || ''}
                    onChange={(e) => updateOptions({ originalImage: e.target.value, image: options.imageRadius > 0 ? "" : e.target.value })}
                    className="liquid-input"
                    placeholder="https://example.com/logo.png"
                  />
                  <label className="flex-shrink-0 flex items-center justify-center px-4 bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-xl shadow-sm cursor-pointer transition-all text-white/60 hover:text-amber-400 hover:border-amber-500/30" title="Upload Image">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              updateOptions({ originalImage: event.target.result as string, image: options.imageRadius > 0 ? "" : event.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    <ImageIcon size={18} />
                  </label>
                </div>
                <p className="text-[10px] text-white/40">Enter a URL or upload an image. Leave blank for no logo.</p>

                {options.originalImage && (
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-white/40 block">Image Size</label>
                        <span className="text-[10px] text-amber-500 font-mono">{options.imageOptions?.imageSize || 0.3}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.1" 
                        max="0.3" 
                        step="0.02"
                        value={options.imageOptions?.imageSize || 0.3}
                        onChange={(e) => updateOptions({ imageOptions: { ...options.imageOptions, imageSize: parseFloat(e.target.value) } })}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-white/40 block">Image Corner Radius</label>
                        <span className="text-[10px] text-amber-500 font-mono">{options.imageRadius || 0}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        step="1"
                        value={options.imageRadius || 0}
                        onChange={(e) => updateOptions({ imageRadius: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-white/40 block">Image Padding (Margin)</label>
                        <span className="text-[10px] text-amber-500 font-mono">{options.imageOptions?.margin || 10}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="300"
                        step="5"
                        value={options.imageOptions?.margin || 10}
                        onChange={(e) => updateOptions({ imageOptions: { ...options.imageOptions, margin: parseInt(e.target.value) } })}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer pt-2">
                      <input 
                        type="checkbox" 
                        checked={options.imageOptions?.hideBackgroundDots !== false} 
                        onChange={(e) => updateOptions({ imageOptions: { ...options.imageOptions, hideBackgroundDots: e.target.checked } })}
                        className="w-3.5 h-3.5 rounded border-white/20 bg-black/50 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-[10px] text-white/60">Hide background dots behind image</span>
                    </label>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Dots Settings */}
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">Pattern</h3>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Dot Style</label>
                  <select
                    value={options.dotsOptions?.type}
                    onChange={(e) => updateOptions({ dotsOptions: { ...options.dotsOptions, type: e.target.value as any } })}
                    className="liquid-input p-2.5"
                  >
                    {dotTypes.map(type => (
                      <option key={type} value={type} className="bg-zinc-900 text-white">{type}</option>
                    ))}
                  </select>
                </div>

                <ColorPicker
                  label="Dot Color"
                  color={options.dotsOptions?.color}
                  gradient={options.dotsOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ dotsOptions: { ...options.dotsOptions, color, gradient } })}
                />
              </div>

              {/* Background Settings */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">Background</h3>
                
                <ColorPicker
                  label="Background Color"
                  color={options.backgroundOptions?.color}
                  gradient={options.backgroundOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color, gradient } })}
                />

                  
                  <label className="flex items-center gap-2 mt-4 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={exportTransparentBg} 
                      onChange={(e) => setExportTransparentBg(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-black/50 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-[10px] text-white/60">Export with transparent background</span>
                  </label>
              </div>

              {/* Corners Settings */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">Corners</h3>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Square Style (Outer)</label>
                  <select
                    value={options.cornersSquareOptions?.type || 'square'}
                    onChange={(e) => updateOptions({ cornersSquareOptions: { ...options.cornersSquareOptions, type: e.target.value as any } })}
                    className="liquid-input p-2.5"
                  >
                    {cornerTypes.map(type => (
                      <option key={type} value={type} className="bg-zinc-900 text-white">{type}</option>
                    ))}
                  </select>
                </div>
                
                <ColorPicker
                  label="Outer Corner Color"
                  color={options.cornersSquareOptions?.color}
                  gradient={options.cornersSquareOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ cornersSquareOptions: { ...options.cornersSquareOptions, color, gradient } })}
                />

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] text-white/40 block mb-3">Dot Style (Inner)</label>
                  <select
                    value={options.cornersDotOptions?.type || 'dot'}
                    onChange={(e) => updateOptions({ cornersDotOptions: { ...options.cornersDotOptions, type: e.target.value as any } })}
                    className="liquid-input p-2.5"
                  >
                    {cornerTypes.map(type => (
                      <option key={type} value={type} className="bg-zinc-900 text-white">{type}</option>
                    ))}
                  </select>
                </div>
                
                <ColorPicker
                  label="Inner Dot Color"
                  color={options.cornersDotOptions?.color}
                  gradient={options.cornersDotOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ cornersDotOptions: { ...options.cornersDotOptions, color, gradient } })}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'presets' && (
            <motion.div
              key="presets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <SpecularButton
                  onClick={saveCustomPreset}
                  className="!justify-center !px-6 !py-3 w-full flex items-center gap-2"
                  radius={16}
                  tint="rgba(255,255,255,0.05)"
                  tintOpacity={1}
                  baseColor="#F97316"
                  lineColor="#ffffff"
                  textColor="#ffffff"
                  intensity={2}
                >
                  <Save size={14} className="relative z-10" />
                  <span className="text-xs font-bold uppercase tracking-wider relative z-10">Save Current as Preset</span>
                </SpecularButton>
              </div>

              {customPresets.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold block">My Presets</h3>
                  <div className="grid gap-3">
                    {customPresets.map((preset) => (
                      <div key={preset.id} className="relative group">
                        <SpecularButton
                          onClick={() => applyPreset(preset)}
                          className="!justify-start !px-6 !py-4 group-hover:pr-12 text-left w-full block transition-all"
                          radius={16}
                          tint="rgba(255,255,255,0.05)"
                          tintOpacity={1}
                          baseColor="#1f2937"
                          lineColor="#38bdf8"
                          intensity={1}
                        >
                          <span className="text-sm font-medium text-white/80 group-hover:text-blue-400 transition-colors relative z-10 truncate">{preset.name}</span>
                        </SpecularButton>
                        <button
                          onClick={(e) => deleteCustomPreset(preset.id, e)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-red-400 transition-colors z-20"
                          title="Delete Preset"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold block">Default Presets</h3>
                <div className="grid gap-3">
                  {presets.map((preset) => (
                    <SpecularButton
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className="!justify-start !px-6 !py-4 group text-left w-full block"
                      radius={16}
                      tint="rgba(255,255,255,0.05)"
                      tintOpacity={1}
                      baseColor="#222222"
                      lineColor="#F97316"
                      intensity={1}
                    >
                      <span className="text-sm font-medium text-white/80 group-hover:text-amber-400 transition-colors relative z-10">{preset.name}</span>
                    </SpecularButton>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'advanced' && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">Layout</h3>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Size (px)</label>
                  <input
                    type="number"
                    value={options.width}
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      const maxMargin = Math.floor(newSize / 3);
                      const newMargin = Math.min(options.margin || 0, maxMargin);
                      updateOptions({ width: newSize, height: newSize, margin: newMargin });
                    }}
                    className="liquid-input"
                    min="100"
                    max="8192"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Margin (px)</label>
                  <input
                    type="number"
                    value={options.margin}
                    onChange={(e) => {
                      const size = options.width || 300;
                      // Margin should not be more than 1/3 of the size to avoid "canvas too small" error
                      const maxMargin = Math.floor(size / 3);
                      const margin = Math.min(Number(e.target.value), maxMargin);
                      updateOptions({ margin });
                    }}
                    className="liquid-input"
                    min="0"
                    max="500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">QR Options</h3>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Type Number</label>
                  <input
                    type="number"
                    value={options.qrOptions?.typeNumber ?? 0}
                    onChange={(e) => updateOptions({ qrOptions: { ...options.qrOptions, typeNumber: Number(e.target.value) as TypeNumber } })}
                    className="liquid-input"
                    min="0"
                    max="40"
                  />
                  <p className="text-[9px] text-white/30">0 = Auto, 1-40 = Fixed version</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Mode</label>
                  <select
                    value={options.qrOptions?.mode || 'Byte'}
                    onChange={(e) => updateOptions({ qrOptions: { ...options.qrOptions, mode: e.target.value as any } })}
                    className="liquid-input p-2.5"
                  >
                    <option value="Numeric" className="bg-zinc-900 text-white">Numeric</option>
                    <option value="Alphanumeric" className="bg-zinc-900 text-white">Alphanumeric</option>
                    <option value="Byte" className="bg-zinc-900 text-white">Byte</option>
                    <option value="Kanji" className="bg-zinc-900 text-white">Kanji</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Error Correction Level</label>
                  <select
                    value={options.qrOptions?.errorCorrectionLevel || 'H'}
                    onChange={(e) => updateOptions({ qrOptions: { ...options.qrOptions, errorCorrectionLevel: e.target.value as any } })}
                    className="liquid-input p-2.5"
                  >
                    <option value="L" className="bg-zinc-900 text-white">L (7%)</option>
                    <option value="M" className="bg-zinc-900 text-white">M (15%)</option>
                    <option value="Q" className="bg-zinc-900 text-white">Q (25%)</option>
                    <option value="H" className="bg-zinc-900 text-white">H (30%)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <SpecularButton
      onClick={onClick}
      size="sm"
      className="!px-1 sm:!px-2 !py-2 w-full !rounded-xl"
      radius={12}
      tint={active ? "rgba(255,255,255,0.15)" : "transparent"}
      tintOpacity={active ? 1 : 0}
      baseColor={active ? "#F97316" : "#222222"}
      lineColor={active ? "#ffffff" : "#666666"}
      textColor={active ? "#ffffff" : "#a3a3a3"}
      intensity={active ? 2 : 0.5}
      speed={0.2}
      autoAnimate={active}
      followMouse={true}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 relative z-10 text-[8px] sm:text-[9px] uppercase tracking-wider font-bold whitespace-nowrap">
        {icon}
        <span>{label}</span>
      </div>
    </SpecularButton>
  );
}
