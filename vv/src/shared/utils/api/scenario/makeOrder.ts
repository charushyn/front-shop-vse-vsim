'use server'

import { SaveOrder } from "@/shared/types/responses/SaveOrder";
import { saveOrder, updateOrderShippingAdress } from "../crm/order";
import { SaveCounterParty } from "@/shared/types/responses/SaveCounterParty";
import { saveCounterParty, saveInternetDocument } from "../novapost/server/novapost-server";
import { SaveInternetDocument } from "@/shared/types/responses/SaveInternetDocument";

export default async function makeOrder(values: {
    name: string;
    surname: string;
    phone: string;
    city: string;
    PaymentMethod: string;
    cityObject: {
      Present: string;
      Warehouses: number;
      MainDescription: string;
      Area: string;
      Region: string;
      SettlementTypeCode: string;
      Ref: string;
      DeliveryCity: string;
      AddressDeliveryAllowed: boolean;
      StreetsAvailability: boolean;
      ParentRegionTypes: string;
      ParentRegionCode: string;
      RegionTypes: string;
      RegionTypesCode: string;
    };
    departament: string;
    departamentObject: {
      SiteKey: string;
      Description: string;
      DescriptionRu: string;
      ShortAddress: string;
      ShortAddressRu: string;
      Phone: string;
      TypeOfWarehouse: string;
      Ref: string;
      Number: string;
      CityRef: string;
      CityDescription: string;
      CityDescriptionRu: string;
      SettlementRef: string;
      SettlementDescription: string;
      SettlementAreaDescription: string;
      SettlementRegionsDescription: string;
      SettlementTypeDescription: string;
      SettlementTypeDescriptionRu: string;
      Longitude: string;
      Latitude: string;
      PostFinance: string;
      BicycleParking: string;
      PaymentAccess: string;
      POSTerminal: string;
      InternationalShipping: string;
      SelfServiceWorkplacesCount: string;
      TotalMaxWeightAllowed: string;
      PlaceMaxWeightAllowed: string;
      SendingLimitationsOnDimensions: {
        Width: number;
        Height: number;
        Length: number;
      };
      ReceivingLimitationsOnDimensions: {
        Width: number;
        Height: number;
        Length: number;
      };
      Reception: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
      };
      Delivery: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
      };
      Schedule: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
      };
      DistrictCode: string;
      WarehouseStatus: string;
      WarehouseStatusDate: string;
      WarehouseIllusha: string;
      CategoryOfWarehouse: string;
      Direct: string;
      RegionCity: string;
      WarehouseForAgent: string;
      GeneratorEnabled: string;
      MaxDeclaredCost: string;
      WorkInMobileAwis: string;
      DenyToSelect: string;
      CanGetMoneyTransfer: string;
      HasMirror: string;
      HasFittingRoom: string;
      OnlyReceivingParcel: string;
      PostMachineType: string;
      PostalCodeUA: string;
      WarehouseIndex: string;
      BeaconCode: string;
      Location: string;
    },
    shipping_year: string,
    shipping_mounth: string,
    shipping_day: string,
    finalCount: number,
    products: Array<{
        sku: string,
        quantity: number
    }>
  }) {
    try{
      const order_res:SaveOrder = await saveOrder({
        firstName: values.name, 
        secondName: values.surname, 
        phone: values.phone, 
        products: values.products
    })


       const counterParty_res:SaveCounterParty = await saveCounterParty({FirstName: values.name, LastName: values.surname, Phone: values.phone})
    
      const internetDocument_res:SaveInternetDocument = await saveInternetDocument({
        Weight: "1",
        Description: "Дитячі іграшки",
        CitySenderRef: "db5c893b-391c-11dd-90d9-001a92567626",
        SenderRef: "cb8bc054-942f-11ee-a60f-48df37b921db",
        SenderAddressRef: "40498332-e1c2-11e3-8c4a-0050568002cf",
        ContactSenderRef: "cb8e974d-942f-11ee-a60f-48df37b921db",
        SendersPhone: "+380673267750",
        CityRecipientRef: values.cityObject.Ref,
        RecipientRef: counterParty_res.data[0].Ref,
        RecipientAddressRef: values.departamentObject.Ref,
        ContactRecipientRef: counterParty_res.data[0].ContactPerson.data[0].Ref,
        DateTime: `${values.shipping_day}.${values.shipping_mounth}.${values.shipping_year}`,
        // "14.11.2024"
        RecipientsPhone: values.phone,
        PayerType: values.finalCount > 1999 ? "Sender" : "Recipient",
        Cost: `${values.finalCount}`
      })


      const updatedOrder_res = await updateOrderShippingAdress({
        firstName: values.name,
        secondName: values.surname,
        phone: values.phone, 
        idOrder: order_res.id,
        tracking_code: internetDocument_res.data[0].IntDocNumber,
        shipping_address_city: values.cityObject.MainDescription,
        shipping_address_region: `${values.cityObject.Region} ${values.cityObject.Area}.`,
        warehouse_ref: values.departamentObject.Ref,
        shipping_date: `${values.shipping_year}.${values.shipping_mounth}.${values.shipping_day}`
      })
      console.log(updatedOrder_res, 4)
      return 200
    } catch (e: any){
        throw new Error("Сталася помилка")
    }
  }