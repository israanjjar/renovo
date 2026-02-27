import type { SDGId } from '@/types';

export interface SDGInfo {
  name: string;
  fullName: string;
  color: string;
}

export const SDG_INFO: Record<SDGId, SDGInfo> = {
  7: { name: 'Clean Energy', fullName: 'Affordable and Clean Energy', color: 'sdg-7' },
  12: { name: 'Responsible Consumption', fullName: 'Responsible Consumption and Production', color: 'sdg-12' },
  13: { name: 'Climate Action', fullName: 'Climate Action', color: 'sdg-13' },
  14: { name: 'Life Below Water', fullName: 'Life Below Water', color: 'sdg-14' },
  15: { name: 'Life on Land', fullName: 'Life on Land', color: 'sdg-15' },
};

export function getSDGColor(sdg: SDGId): string {
  const colors: Record<SDGId, string> = {
    7: '#FCC30B',
    12: '#BF8B2E',
    13: '#3F7E44',
    14: '#0A97D9',
    15: '#56C02B',
  };
  return colors[sdg];
}
