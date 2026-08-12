const fs = require('fs');
let code = fs.readFileSync('src/components/SettingsSidebar.tsx', 'utf8');

// Add import
code = code.replace(/import \{ Image as ImageIcon, .* \} from 'lucide-react';/, "import { Image as ImageIcon, Download, Upload, Sliders, Type, Settings2, Sparkles, Droplet } from 'lucide-react';\nimport { ColorPicker } from './ColorPicker';");

// Replace Dot Color
code = code.replace(/<div className="space-y-2">\s*<label className="text-\[10px\] text-white\/40 block mb-3">Dot Color<\/label>\s*<div className="flex items-center gap-3">\s*<input\s*type="color"\s*value=\{options\.dotsOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ dotsOptions: \{ \.\.\.options\.dotsOptions, color: e\.target\.value, gradient: undefined \} \}\)\}\s*className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"\s*\/>\s*<input\s*type="text"\s*value=\{options\.dotsOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ dotsOptions: \{ \.\.\.options\.dotsOptions, color: e\.target\.value, gradient: undefined \} \}\)\}\s*className="liquid-input p-2"\s*\/>\s*<\/div>\s*<\/div>/, `<ColorPicker
                  label="Dot Color"
                  color={options.dotsOptions?.color}
                  gradient={options.dotsOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ dotsOptions: { ...options.dotsOptions, color, gradient } })}
                />`);
                
// Replace Background Color
code = code.replace(/<div className="space-y-2">\s*<label className="text-\[10px\] text-white\/40 block mb-3">Background Color<\/label>\s*<div className="flex items-center gap-3">\s*<input\s*type="color"\s*value=\{options\.backgroundOptions\?\.color \|\| '#ffffff'\}\s*onChange=\{\(e\) => updateOptions\(\{ backgroundOptions: \{ \.\.\.options\.backgroundOptions, color: e\.target\.value \} \}\)\}\s*className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"\s*\/>\s*<input\s*type="text"\s*value=\{options\.backgroundOptions\?\.color \|\| '#ffffff'\}\s*onChange=\{\(e\) => updateOptions\(\{ backgroundOptions: \{ \.\.\.options\.backgroundOptions, color: e\.target\.value \} \}\)\}\s*className="liquid-input"\s*\/>\s*<\/div>\s*<\/div>/, `<ColorPicker
                  label="Background Color"
                  color={options.backgroundOptions?.color}
                  gradient={options.backgroundOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color, gradient } })}
                />`);

// Replace Outer Corner Color
code = code.replace(/<div className="space-y-2">\s*<label className="text-\[10px\] text-white\/40 block mb-3">Outer Corner Color<\/label>\s*<div className="flex items-center gap-3">\s*<input\s*type="color"\s*value=\{options\.cornersSquareOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ cornersSquareOptions: \{ \.\.\.options\.cornersSquareOptions, color: e\.target\.value \} \}\)\}\s*className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"\s*\/>\s*<input\s*type="text"\s*value=\{options\.cornersSquareOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ cornersSquareOptions: \{ \.\.\.options\.cornersSquareOptions, color: e\.target\.value \} \}\)\}\s*className="liquid-input"\s*\/>\s*<\/div>\s*<\/div>/, `<ColorPicker
                  label="Outer Corner Color"
                  color={options.cornersSquareOptions?.color}
                  gradient={options.cornersSquareOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ cornersSquareOptions: { ...options.cornersSquareOptions, color, gradient } })}
                />`);

// Replace Inner Dot Color
code = code.replace(/<div className="space-y-2">\s*<label className="text-\[10px\] text-white\/40 block mb-3">Inner Dot Color<\/label>\s*<div className="flex items-center gap-3">\s*<input\s*type="color"\s*value=\{options\.cornersDotOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ cornersDotOptions: \{ \.\.\.options\.cornersDotOptions, color: e\.target\.value \} \}\)\}\s*className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer"\s*\/>\s*<input\s*type="text"\s*value=\{options\.cornersDotOptions\?\.color \|\| '#000000'\}\s*onChange=\{\(e\) => updateOptions\(\{ cornersDotOptions: \{ \.\.\.options\.cornersDotOptions, color: e\.target\.value \} \}\)\}\s*className="liquid-input"\s*\/>\s*<\/div>\s*<\/div>/, `<ColorPicker
                  label="Inner Dot Color"
                  color={options.cornersDotOptions?.color}
                  gradient={options.cornersDotOptions?.gradient}
                  onChange={(color, gradient) => updateOptions({ cornersDotOptions: { ...options.cornersDotOptions, color, gradient } })}
                />`);

fs.writeFileSync('src/components/SettingsSidebar.tsx', code);
