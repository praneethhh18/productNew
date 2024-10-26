import { Product, PincodeInfo } from '../types';

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 9900) + 100,
    inStock: Math.random() > 0.2, // 80% of products are in stock
  }));
};

export const pincodeData: Record<string, PincodeInfo> = {
  // Metro cities
  '110001': { pincode: '110001', provider: 'A', region: 'metro' }, // Delhi
  '400001': { pincode: '400001', provider: 'A', region: 'metro' }, // Mumbai
  '700001': { pincode: '700001', provider: 'B', region: 'metro' }, // Kolkata
  '600001': { pincode: '600001', provider: 'B', region: 'metro' }, // Chennai

  // Non-metro cities
  '500001': { pincode: '500001', provider: 'B', region: 'non-metro' }, // Hyderabad
  '380001': { pincode: '380001', provider: 'B', region: 'non-metro' }, // Ahmedabad
  '411001': { pincode: '411001', provider: 'A', region: 'non-metro' }, // Pune

  // Tier 2-3 cities
  '800001': { pincode: '800001', provider: 'General', region: 'tier-2-3' }, // Patna
  '226001': { pincode: '226001', provider: 'General', region: 'tier-2-3' }, // Lucknow
  '440001': { pincode: '440001', provider: 'General', region: 'tier-2-3' }, // Nagpur
};