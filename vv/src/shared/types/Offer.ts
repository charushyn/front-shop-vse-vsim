export type Offer = {
  id: number;
  product_id: number;
  sku: string;
  barcode: any;
  thumbnail_url: string;
  price: number;
  purchased_price: number;
  quantity: number;
  in_reserve: number;
  weight: any;
  length: any;
  height: any;
  width: any;
  properties: Array<Property>;
  is_default: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type Property = {
  name: string;
  value: any;
};
