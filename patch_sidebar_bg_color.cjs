const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

const regex = /<div className="space-y-2">\s*<label className="text-\[10px\] text-white\/40 block mb-3">Background Color<\/label>[\s\S]*?className="liquid-input"\s*\/>\s*<\/div>\s*<\/div>/;
code = code.replace(regex, `<ColorPicker
                  label="Background Color"
                  color={options.backgroundOptions?.color}
                  gradient={options.backgroundOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color, gradient } })}
                />`);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
