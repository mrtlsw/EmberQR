const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

const search = `              {/* Background Settings */}
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
              </div>`;

const replace = `              {/* Background Settings */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4 block">Background</h3>
                
                <div className="space-y-2">
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
              </div>`;

code = code.replace(search, replace);
fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
