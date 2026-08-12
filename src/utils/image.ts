export function roundImageCorners(src: string, radius: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!src || radius <= 0) return resolve(src);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }
      
      const r = Math.min(radius * (Math.min(img.width, img.height) / 100), Math.min(img.width, img.height) / 2);
      
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(canvas.width - r, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
      ctx.lineTo(canvas.width, canvas.height - r);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
      ctx.lineTo(r, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0);
      
      try {
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        // Handle CORS issues by returning original source
        console.error('Could not round image due to CORS', e);
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}
