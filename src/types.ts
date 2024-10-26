export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface PincodeInfo {
  pincode: string;
  provider: 'A' | 'B' | 'General';
  region: 'metro' | 'non-metro' | 'tier-2-3';
}

export type RootStackParamList = {
  ProductList: undefined;
  DeliveryEstimation: { product: Product };
};