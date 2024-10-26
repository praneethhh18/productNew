import { PincodeInfo } from '../types';
import { pincodeData } from './data';

export const validatePincode = async (pincode: string): Promise<PincodeInfo | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return pincodeData[pincode] || null;
};