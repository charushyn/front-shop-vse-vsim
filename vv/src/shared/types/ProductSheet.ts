export type ProductSheetType = {
  name: string;
  sku: string;
  thumbnail_url: string;
  price: number;
  quantity: number;
  weight?: any;
  length?: any;
  height?: any;
  width?: any;
  properties?: Array<Property>;
  created_at: string;
  updated_at: string;
  description: string;
};

type Property = {
  name: string;
  value: any;
};
