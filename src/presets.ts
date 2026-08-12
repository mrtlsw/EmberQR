import { QRPreset } from './types';

export const presets: QRPreset[] = [
  {
    id: 'basic',
    name: 'Basic Standard',
    options: {
      dotsOptions: {
        type: 'square',
        color: '#000000',
        gradient: null as any
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#000000',
        gradient: null as any
      },
      cornersDotOptions: {
        type: 'square',
        color: '#000000',
        gradient: null as any
      },
      backgroundOptions: {
        color: '#ffffff',
        gradient: null as any
      }
    }
  },
  {
    id: 'orange-eyes-white-dots',
    name: 'Orange Eyes - White Dots',
    options: {
      dotsOptions: {
        type: 'dots',
        color: '#ffffff',
        gradient: null as any
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#f97316',
        gradient: null as any
      },
      cornersDotOptions: {
        type: 'square',
        color: '#f97316',
        gradient: null as any
      },
      backgroundOptions: {
        color: '#111111',
        gradient: null as any
      }
    }
  },
  {
    id: 'blue-eyes-round-dots',
    name: 'Blue eyes - Round Dots',
    options: {
      dotsOptions: {
        type: 'rounded',
        color: '#ffffff',
        gradient: null as any
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#38bdf8',
        gradient: null as any
      },
      cornersDotOptions: {
        type: 'extra-rounded',
        color: '#38bdf8',
        gradient: null as any
      },
      backgroundOptions: {
        color: '#0f172a',
        gradient: null as any
      }
    }
  }
];
