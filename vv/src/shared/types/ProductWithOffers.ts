export type ProductWithOffer = {
    
        id: number,
        name: string,
        description: string,
        thumbnail_url: string,
        attachments_data: Array<string>,
        quantity: number,
        unit_type?: any,
        in_reserve: number,
        currency_code: "UAH",
        min_price: number,
        max_price: number,
        weight?: any,
        length?: any,
        height?: any,
        width?: any,
        has_offers: true,
        is_archived: boolean,
        category_id: 11,
        created_at: Date,
        updated_at: Date,
        sources: Array<any>,
        custom_fields?: Array<{
            id: number,
            uuid: string,
            name: string,
            type: string,
            value: any
        }>
    
}