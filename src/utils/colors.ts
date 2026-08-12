export function getLuminance(hex: string) {
  if (!hex || hex === 'transparent') return 1; // Assuming transparent will be placed on white paper
  let color = hex;
  if (color.startsWith('#')) color = color.slice(1);
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  
  const r = parseInt(color.slice(0, 2), 16) / 255;
  const g = parseInt(color.slice(2, 4), 16) / 255;
  const b = parseInt(color.slice(4, 6), 16) / 255;

  if (isNaN(r) || isNaN(g) || isNaN(b)) return 1;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrast(hex1: string, hex2: string) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
