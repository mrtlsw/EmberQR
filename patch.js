const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

const replacement = `
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
`;

code = code.replace(/<div className="space-y-2">\s*<div className="flex justify-between items-center">\s*<label className="text-\[10px\] text-white\/40 block">Image Padding \(Margin\)<\/label>/, replacement.trim());

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
