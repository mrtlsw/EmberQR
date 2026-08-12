const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');
const search = `                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 block mb-3">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={options.backgroundOptions?.color || '#ffffff'}
                      onChange={(e) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color: e.target.value } })}
                      className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={options.backgroundOptions?.color || '#ffffff'}
                      onChange={(e) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color: e.target.value } })}
                      className="liquid-input"
                    />
                  </div>`;
const replace = `                <ColorPicker
                  label="Background Color"
                  color={options.backgroundOptions?.color}
                  gradient={options.backgroundOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color, gradient } })}
                />`;

// Since there is another label below, we have to keep the div wrapper or be careful. 
// Wait, looking at the previous grep, I see:
// 262-                  
// 263-                  <label className="flex items-center gap-2 mt-4 cursor-pointer">
// This means the `</div>` was for `space-y-2`. But there's a label inside it.

code = code.replace(search, replace + `\n`);
fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
