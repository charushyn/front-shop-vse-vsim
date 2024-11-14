import axios from "axios";

const novapostUrl = 'https://api.novaposhta.ua/v2.0/json/'

const novapostInstance = axios.create({
    baseURL: novapostUrl,
    headers: {
        "Accept": "*/*",
        "Content-Type": 'application/json',
    },
})

export const getCity = async ({cityName} : {cityName: string}) => {
    
    try{
        const res = await novapostInstance.post('', {
            "apiKey": process.env.NP_SECRET,
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
            "apiKey": process.env.NP_SECRET,
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

export const saveCounterParty = async ({FirstName,  LastName, Phone} : {FirstName: string,  LastName: string, Phone: string}) => {
    try{
        const res = await novapostInstance.post('', {
            "apiKey": process.env.NP_SECRET,
            "modelName": "CounterpartyGeneral",
            "calledMethod": "save",
            "methodProperties": {
                "FirstName" : FirstName,
                "MiddleName" : "",
                "LastName" : LastName,
                "Phone" : Phone,
                "Email" : "",
                "CounterpartyType" : "PrivatePerson",
                "CounterpartyProperty" : "Recipient"
            }
         })
        return res.data
    } catch(error){
        console.log(error)
    }
}

export const saveContactPerson = async ({CounterpartyRef, FirstName,  LastName, Phone} : {FirstName: string,  LastName: string, Phone: number, CounterpartyRef: string}) => {
    try{
        const res = await novapostInstance.post('', {
            "apiKey": process.env.NP_SECRET,
            "modelName": "ContactPersonGeneral",
            "calledMethod": "save",
            "methodProperties": {
            "CounterpartyRef" : CounterpartyRef,
            "FirstName" : FirstName,
            "LastName" : LastName,
            "MiddleName" : null,
            "Phone" : Phone
            }
         })
        return res
    } catch(error){
        console.log(error)
    }
}

export const saveInternetDocument = async (
    {
        Weight, 
        Description, 
        CitySenderRef, 
        SenderRef, 
        SenderAddressRef, 
        ContactSenderRef, 
        SendersPhone, 
        CityRecipientRef, 
        RecipientRef, 
        RecipientAddressRef, 
        ContactRecipientRef,
        DateTime,
        PayerType,
        RecipientsPhone,
        Cost,
    } : {
        Weight: string, 
        Description: string, 
        CitySenderRef: string, 
        SenderRef: string, 
        SenderAddressRef: string, 
        ContactSenderRef: string, 
        SendersPhone: string, 
        CityRecipientRef: string, 
        RecipientRef: string, 
        RecipientAddressRef: string, 
        ContactRecipientRef: string,
        DateTime: string,
        RecipientsPhone: string,
        PayerType: "Sender" | "Recipient",
        Cost: string
    }) => {
    try{
        const res = await novapostInstance.post('', {
            "apiKey": process.env.NP_SECRET,
            "modelName": "InternetDocumentGeneral",
            "calledMethod": "save",
            "methodProperties": {
                "PayerType" : PayerType,
                "PaymentMethod" : "Cash",
                "DateTime" : "дд.мм.рррр",
                "CargoType" : "Cargo",
                "Weight" : Weight,
                "ServiceType" : "WarehouseWarehouse",
                "SeatsAmount" : "1",
                "Description" : Description,
                "Cost" : Cost,
                "CitySender" : CitySenderRef,
                "Sender" : SenderRef,
                "SenderAddress" : SenderAddressRef,
                "ContactSender" : ContactSenderRef,
                "SendersPhone" : SendersPhone,
                "CityRecipient" : CityRecipientRef,
                "Recipient" : RecipientRef,
                "RecipientAddress" : RecipientAddressRef,
                "ContactRecipient" : ContactRecipientRef,
                "RecipientsPhone" : RecipientsPhone,
                "BackwardDeliveryData": [
                {
                    "PayerType": "Recipient",
                    "CargoType": "Money",
                    "RedeliveryString": Cost
                }
        ]
            }    
         })
        return res.data
    } catch(error){
        console.log(error)
    }
}
