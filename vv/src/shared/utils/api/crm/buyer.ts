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

export const saveBuyer = async ({firstName, secondName, phone} : {firstName: string, secondName: string, phone: string}) => {
    
    try{
        const res = await crm_instanse.post('/crm/buyer', {
            "full_name": `${firstName} ${secondName}`,
            "phone": [
                phone
            ],
            "shipping": [],
            "custom_fields": []
        })
        return res.data
    } catch(error){
        console.log(error)
    }
}
