import React from 'react';
import { Options } from '../types';

type Gradient = NonNullable<NonNullable<Options['dotsOptions']>['gradient']>;

interface ColorPickerProps {
  label: string;
  color?: string;
  gradient?: Gradient;
  onChange: (color: string | undefined, gradient: Gradient | undefined) => void;
}

export function ColorPicker({ label, color, gradient, onChange }: ColorPickerProps) {
  const isGradient = !!gradient;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <label className="text-[10px] text-white/40 block">{label}</label>
        <button
          onClick={() => {
            if (isGradient) {
              onChange(color || '#000000', null as any);
            } else {
              onChange(undefined, {
                type: 'linear',
                rotation: 0,
                colorStops: [
                  { offset: 0, color: color || '#000000' },
                  { offset: 1, color: '#F97316' }
                ]
              });
            }
          }}
          className="text-[10px] text-amber-500 hover:text-amber-400 font-medium"
        >
          {isGradient ? 'Solid' : 'Gradient'}
        </button>
      </div>

      {!isGradient ? (
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color || '#000000'}
            onChange={(e) => onChange(e.target.value, undefined)}
            className="w-10 h-10 rounded bg-transparent border-0 cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            value={color || '#000000'}
            onChange={(e) => onChange(e.target.value, undefined)}
            className="liquid-input p-2.5 w-full text-xs font-mono"
          />
        </div>
      ) : (
        <div className="space-y-3 p-3 bg-black/20 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <select
              value={gradient.type}
              onChange={(e) => onChange(undefined, { ...gradient, type: e.target.value as 'linear' | 'radial' })}
              className="liquid-input p-2 flex-1 text-xs"
            >
              <option value="linear" className="bg-zinc-900">Linear</option>
              <option value="radial" className="bg-zinc-900">Radial</option>
            </select>
            {gradient.type === 'linear' && (
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={Math.round((gradient.rotation || 0) * (180 / Math.PI))}
                  onChange={(e) => onChange(undefined, { ...gradient, rotation: (parseInt(e.target.value) || 0) * (Math.PI / 180) })}
                  className="liquid-input p-2 w-20 text-xs pr-6"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs pointer-events-none">°</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {gradient.colorStops.map((stop, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => {
                    const newStops = [...gradient.colorStops];
                    newStops[index] = { ...stop, color: e.target.value };
                    onChange(undefined, { ...gradient, colorStops: newStops });
                  }}
                  className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => {
                    const newStops = [...gradient.colorStops];
                    newStops[index] = { ...stop, color: e.target.value };
                    onChange(undefined, { ...gradient, colorStops: newStops });
                  }}
                  className="liquid-input p-1.5 w-20 text-xs font-mono"
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={stop.offset}
                  onChange={(e) => {
                    const newStops = [...gradient.colorStops];
                    newStops[index] = { ...stop, offset: parseFloat(e.target.value) };
                    onChange(undefined, { ...gradient, colorStops: newStops });
                  }}
                  className="flex-1 accent-amber-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
