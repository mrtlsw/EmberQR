const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

// 1. Add lucide-react Trash2 or Plus icon if needed
code = code.replace(
  "import { Download, Palette, Settings, Type, Sliders, Image as ImageIcon } from 'lucide-react';",
  "import { Download, Palette, Settings, Type, Sliders, Image as ImageIcon, Save, Trash2 } from 'lucide-react';"
);

// 2. Add state and handlers
const stateCode = `  const [activeTab, setActiveTab] = React.useState<'data' | 'style' | 'presets' | 'advanced'>('data');
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
      id: \`custom-\${Date.now()}\`,
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
`;
code = code.replace(/  const \[activeTab, setActiveTab\] = React\.useState<'data' \| 'style' \| 'presets' \| 'advanced'>\('data'\);\n  const \[contentType, setContentType\] = React\.useState<'url' \| 'text'>\('url'\);/, stateCode);

// 3. Update activeTab === 'presets'
const presetsTabOriginal = `          {activeTab === 'presets' && (
            <motion.div
              key="presets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-3"
            >
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
            </motion.div>
          )}`;

const presetsTabNew = `          {activeTab === 'presets' && (
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
          )}`;

code = code.replace(presetsTabOriginal, presetsTabNew);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
