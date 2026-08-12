import type { Options as BaseOptions, FileExtension } from 'qr-code-styling';

export interface QRPreset {
  id: string;
  name: string;
  options: Partial<Options>;
}

export type PresetOptions = Pick<
  Options,
  'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions' | 'imageOptions'
>;
export interface Options extends BaseOptions { originalImage?: string; imageRadius?: number; }
