export type Product = {
    attachments_data: Array<string>
    sku: any,
    category_id: number
    created_at: string
    currency_code: string
    description: string 
    has_offers: boolean
    height?: number
    id: number 
    in_reserve: number
    is_archived: boolean
    length?:number
    max_price: number
    min_price: number
    name: string
    quantity: number
    sources: Array<any>
    thumbnail_url: string
    unit_type: any
    updated_at: string
    weight?: number
    width?: number
    properties?: any,
    price?: number,
    custom_fields?: Array<{
        id: number,
        uuid: string,
        name: string,
        type: string,
        value: any
    }>
}