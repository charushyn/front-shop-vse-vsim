import axios from "axios";

// const CRM_URL = 'https://openapi.keycrm.app/v1'
// const CRM_TOKEN = 'MGQ0YTcxZjVjMjQyYWE4YWRlYjczY2I4YWU0NTM4NmY2MGZhMThhYQ'
// axios.defaults.baseURL = CRM_URL

const crm_instanse = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    },
    withCredentials: true,
})

const auth_instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
    },
    withCredentials: true,
})
axios.defaults.headers.common = {
}

export const login = async (login: string, password: string) => {
    
    try{
        const res = await auth_instance.post('/login', {
            login,
            password
        })
        return res
    } catch(error){
        console.log(error)
    }
}

export const uploadImg = async (img: File) => {
    const body = new FormData()
    body.append('file', img)

    try{
        const res = await auth_instance.post('/add-img', body)
        return res.data
    } catch(error){
        console.log(error)
    }
}

export const deleteImgTable = async (filename: string) => {
    try{
        const res = await auth_instance.post('/delete-img', {filename})
        return res.data
    } catch(error){
        console.log(error)
    }
}



export const getTable = async () => {
    
    try{
        const res = await auth_instance.get('/table')
        return res
    } catch(error){
        console.log(error)
    }
}

export const sendTable = async (data: Array<Array<any>>) => {
    
    try{
        const res = await auth_instance.post('/table', data)
        return res
    } catch(error){
        console.log(error)
    }
}

export const verify = async () => {
    
    try{
        const res = await auth_instance.get('/verify')
        return res.data
    } catch(error){
        console.log(error, 'error verify')
    }
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


export const getProducts = async ({categoriesID, limit} : {categoriesID?: Array<number>, limit?:number}) => {

    const params = {
        filter: categoriesID && {"category_id": `${categoriesID.toString()}`},
        limit: limit
    }
    
    try{
        const res = await crm_instanse.get('/crm/products', {params: params})
        return res.data.data
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
