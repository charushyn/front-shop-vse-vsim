export type UpdateOrderShippingAdress = {
    buyer_comment: string;
    manager_comment: string;
    status_id: number;
    discount_percent: number;
    discount_amount: number;
    products: Product[];
    shipping: Shipping;
  };
  
  type Product = {
    sku: string;
    id: number;
    name: string;
    comment: string;
    price: number;
    purchased_price: number;
    discount_amount: number;
    discount_percent: number;
    quantity: number;
    product_status_id: number;
  };
  
  type Shipping = {
    delivery_service_id: number;
    tracking_code: string;
    shipping_address_city: string;
    shipping_address_country: string;
    shipping_address_region: string;
    shipping_address_zip: string;
    shipping_receive_point: string;
    shipping_secondary_line: string;
    recipient_full_name: string;
    recipient_phone: string;
    warehouse_ref: string;
    shipping_date: string;
  };
  