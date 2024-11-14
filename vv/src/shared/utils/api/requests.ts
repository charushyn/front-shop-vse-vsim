import axios from "axios";
import axiosThrottle from 'axios-request-throttle';

axiosThrottle.use(axios, {requestsPerSecond: 1})

const backendUrl = 'http://localhost:8000'

const crm_instanse = axios.create({
    baseURL: backendUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    },
    withCredentials: true,
})


axios.defaults.headers.common = {
}


export const getCategories = async ({categoriesID, parentID, limit} : {categoriesID?: Array<number>, parentID?: Array<number>, limit?: number}) => {

    const params = {
        filter: categoriesID && {"category_id": `${categoriesID.toString()}`} || parentID && {"parent_id": `${parentID.toString()}`},
        limit: limit
    }
    
    try{
        const res = await crm_instanse.get('/crm/products/categories', {params: params})
        return res.data.data
    } catch(error){
        console.log(error)
    }
}

export const getProductByID = async ({productID} : {productID: number}) => {
    
    try{
        const res = await crm_instanse.get(`/crm/products/${productID}`)
        return res.data
    } catch(error){
        console.log(error)
    }
}

export const getOffers = async ({product_id} : {product_id?: number}) => {

    const params = {
        filter: {"product_id": `${product_id}`} 
        
    }
    
    try{
        const res = await crm_instanse.get('/crm/offers', {params: params})
        return res.data
    } catch(error){
        console.log(error)
    }
}


export const getProducts = async ({categoriesID, limit, sort, customFields} : {categoriesID?: Array<number>, limit?:number, sort?: 'byQuantity', customFields?: boolean }) => {

    const params = {
        filter: categoriesID && {"category_id": `${categoriesID.toString()}`},
        include: customFields && {"include": `customFields`},
        limit: typeof limit === "number" ? limit + 5 : ''
    }
    
    try{
        const res = await crm_instanse.get('/crm/products', {params: params})

        if(sort === "byQuantity" && res.data.data.length > 1){
            const sortedArray = res.data.data.sort((a: any, b: any) => b.quantity - a.quantity)
            return sortedArray
        } else {
            return res.data.data
        }
    } catch(error){
        console.log(error)
    }
}

// export const getProductsByCategoryID = async (...IDS: number[]) => {
//     try{
//         const res = await axios.get('/products/categories', {params: `${...IDS}`})
//         return res
//     } catch(error){
//         console.log(error)
//     }
// }
