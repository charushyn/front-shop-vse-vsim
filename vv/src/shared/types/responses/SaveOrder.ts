export type SaveOrder = {
    id: number,
    parent_id?: number,
    source_uuid?: string,
    source_id: number,
    status_id: number,
    status_group_id: number,
    grand_total: number,
    promocode: string,
    total_discount?: number,
    expenses_sum: number,
    shipping_price?: number,
    wrap_price: number,
    taxes: number,
    manager_comment: null | string,
    buyer_comment: null | string,
    gift_message: null | string,
    is_gift: boolean,
    payment_status: string,
    last_synced_at: string,
    created_at: string,
    updated_at: string,
    closed_at: string
  }