import { PincodeInfo } from '../types';
import { addDays, setHours, setMinutes, isAfter } from 'date-fns';

export const calculateDeliveryDate = (
  pincodeInfo: PincodeInfo,
  isInStock: boolean
): { date: Date; provider: string; isSameDay: boolean } => {
  const now = new Date();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  let deliveryDate: Date;
  let isSameDay = false;

  switch (pincodeInfo.provider) {
    case 'A': {
      const cutoff = setHours(setMinutes(today, 0), 17); // 5 PM
      if (isInStock && !isAfter(now, cutoff)) {
        deliveryDate = today;
        isSameDay = true;
      } else {
        deliveryDate = tomorrow;
      }
      break;
    }
    
    case 'B': {
      const cutoff = setHours(setMinutes(today, 0), 9); // 9 AM
      if (!isAfter(now, cutoff)) {
        deliveryDate = today;
        isSameDay = true;
      } else {
        deliveryDate = tomorrow;
      }
      break;
    }
    
    case 'General':
    default: {
      const daysToAdd = pincodeInfo.region === 'metro' ? 2 :
        pincodeInfo.region === 'non-metro' ? 3 : 5;
      deliveryDate = addDays(today, daysToAdd);
    }
  }

  return {
    date: deliveryDate,
    provider: pincodeInfo.provider,
    isSameDay,
  };
};