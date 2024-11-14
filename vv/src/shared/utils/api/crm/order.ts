import axios from "axios";
import axiosThrottle from 'axios-request-throttle';

axiosThrottle.use(axios, {requestsPerSecond: 1})

const backendUrl = 'http://localhost:8000'

const crm_instanse = axios.create({
    baseURL: backendUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        
    },
    withCredentials: true,
})


axios.defaults.headers.common = {
}

export const saveOrder = async ({firstName, secondName, phone, products} : {firstName: string, secondName: string, phone: string, products: Array<{sku: string, quantity: number}>}) => {
    
    try{
        const res = await crm_instanse.post('/crm/order', {
            "source_id": 2,
            "buyer": {
            "full_name": `${firstName} ${secondName}`,
            "phone": phone
            },
          "products": products
        })
        return res.data
    } catch(error){
        console.log(error)
    }
}

export const updateOrderShippingAdress = async (
    {
        firstName, 
        secondName, 
        phone, 
        idOrder,
        tracking_code,
        shipping_address_city,
        shipping_address_region,
        warehouse_ref,
        shipping_date
    } : 
    {
        firstName: string, 
        secondName: string, 
        phone: string, 
        idOrder: number,
        tracking_code: string,
        shipping_address_city: string,
        shipping_address_region: string,
        warehouse_ref: string,
        shipping_date: string

    }) => {
    
    try{
        const res = await crm_instanse.put(`/crm/order/${idOrder}`, {
            "source_id": 2,
            "buyer": {
            "full_name": `${firstName} ${secondName}`,
            "phone": phone
            },
            "shipping": {
                "delivery_service_id": 1,
                "tracking_code": tracking_code,
                "shipping_address_city": shipping_address_city,
                "shipping_address_country": "Ukraine",
                "shipping_address_region": shipping_address_region,
                "shipping_secondary_line": "string",
                "recipient_full_name": `${firstName} ${secondName}`,
                "recipient_phone": phone,
                "warehouse_ref": warehouse_ref,
                "shipping_date": shipping_date
            }
        })
        return res.data
    } catch(error){
        console.log(error)
    }
}



// {
//     "id": 1,
//     "source_uuid": null,
//     "global_source_uuid": null,
//     "status_on_source": null,
//     "source_id": 2,
//     "client_id": 3,
//     "grand_total": 190,
//     "total_discount": 0,
//     "margin_sum": 190,
//     "expenses_sum": 0,
//     "discount_amount": null,
//     "discount_percent": null,
//     "shipping_price": null,
//     "taxes": null,
//     "register_id": null,
//     "fiscal_result": [],
//     "fiscal_status": null,
//     "shipping_type_id": null,
//     "status_group_id": 1,
//     "status_id": 1,
//     "closed_from": null,
//     "status_expired_at": null,
//     "status_changed_at": "2024-11-13T18:46:36.000000Z",
//     "parent_id": null,
//     "manager_comment": null,
//     "client_comment": null,
//     "discount_data": null,
//     "is_gift": false,
//     "promocode": null,
//     "wrap_price": null,
//     "gift_wrap": false,
//     "payment_status": "not_paid",
//     "gift_message": null,
//     "last_synced_at": null,
//     "created_at": "2024-11-13T18:46:36.000000Z",
//     "updated_at": "2024-11-13T18:46:36.000000Z",
//     "closed_at": null,
//     "ordered_at": "2024-11-13T18:46:36.000000Z",
//     "source_updated_at": null,
//     "deleted_at": null,
//     "payments_total": 0,
//     "is_expired": false,
//     "has_reserves": false,
//     "buyer_comment": null,
//     "products": [
//         {
//             "id": 1,
//             "sku": "K-B-001",
//             "variation_id": null,
//             "publication_source_uuid": null,
//             "name": "Кіт батон 50 см у преміум дизайні м'яка іграшка",
//             "upsale": false,
//             "price": 190,
//             "discount_amount": 0,
//             "discount_percent": 0,
//             "individual_discount": 0,
//             "loyalty_discount": 0,
//             "total_discount": 0,
//             "purchased_price": 0,
//             "price_sold": 190,
//             "quantity": 1,
//             "unit_type": null,
//             "stock_status": null,
//             "picture": {
//                 "thumbnail": "https://vsevsimcomua.api.keycrm.app/file-storage/thumbnails/vsevsimcomua/uploads/2024-11-13/WVxcHNm6Z87BO5KYjcKgPZ1E5556G78o.webp"
//             },
//             "comment": null,
//             "properties": [],
//             "product_status_id": null,
//             "created_at": "2024-11-13T18:46:36.000000Z",
//             "updated_at": "2024-11-13T18:46:36.000000Z"
//         }
//     ],
//     "buyer": {
//         "id": 3,
//         "company_id": null,
//         "full_name": "John Doe",
//         "birthday": null,
//         "phone": "+15552341234",
//         "email": "john.doe@mail.app",
//         "note": null,
//         "picture": null,
//         "image": null,
//         "orders_sum": "0.00",
//         "discount": 0,
//         "currency": "USD",
//         "orders_count": 0,
//         "has_duplicates": 1,
//         "manager_id": null,
//         "deleted_at": null,
//         "created_at": "2024-11-13T18:46:36.000000Z",
//         "updated_at": "2024-11-13T18:46:36.000000Z"
//     },
//     "shipping": null,
//     "payments": []
// }

