import axios from "axios";

const novapostUrl = 'https://api.novaposhta.ua/v2.0/json/'

const novapostInstance = axios.create({
    baseURL: novapostUrl,
    headers: {
        // "Accept": "*/*",
        // "Content-Type": 'application/json',
    },
})

export const getCity = async ({cityName} : {cityName: string}) => {
    
    try{
        const res = await novapostInstance.post('', {
            "modelName": "AddressGeneral",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                 "CityName" : cityName,
                 "Limit" : "50",
                 "Page" : "1"
            }
         })
        return res
    } catch(error){
        console.log(error)
    }
}

export const getDepartament = async ({cityRef, inputValue,  TypeOfWarehouseRef} : {cityRef: string, inputValue: string,  TypeOfWarehouseRef?: string}) => {
    
    try{
        const res = await novapostInstance.post('', {
            "modelName": "AddressGeneral",
            "calledMethod": "getWarehouses",
            "methodProperties": {
                "TypeOfWarehouseRef": TypeOfWarehouseRef ? TypeOfWarehouseRef : null,
                 "SettlementRef" : cityRef,
                 "FindByString": inputValue,
                 "Limit" : "50",
                 "Page" : "1"
            }
         })
        return res
    } catch(error){
        console.log(error)
    }
}