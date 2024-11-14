'use client'

import { useDispatch, useSelector } from "react-redux"

import { Button, H1, H2, P } from "@/shared/ui"
import { Product } from "@/shared/types/Product"
import { clearCart, decrementItem, incrementItem, removeItem } from "@/shared/utils/redux/productCart/productCart"

import { useRouter } from "next/navigation"

import { CartItem } from "@/entities"

import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button as B }  from "@/shared/uiShadcn/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/uiShadcn/form"
import { Input } from "@/shared/uiShadcn/input"

import parsePhoneNumber from 'libphonenumber-js'

import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength
} from 'libphonenumber-js'



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Занадто коротко.",
  }),
  surname: z.string().min(2, {
    message: "Занадто коротко.",
  }),
  phone: z.string().refine((value) => isValidPhoneNumber(value, 'UA'), {message: "Неправильний номер телефону."}),
  city: z.string().min(1, 'Введіть назву н.п.'),
  PaymentMethod: z.string().min(1, 'Оберіть тип оплати.'),
  cityObject: z.object({
    Present: z.string(),
    Warehouses: z.number(),
    MainDescription: z.string(),
    Area: z.string(),
    Region: z.string(),
    SettlementTypeCode: z.string(),
    Ref: z.string().min(1, '!'),
    DeliveryCity: z.string(),
    AddressDeliveryAllowed: z.boolean(),
    StreetsAvailability: z.boolean(),
    ParentRegionTypes: z.string(),
    ParentRegionCode: z.string(),
    RegionTypes: z.string(),
    RegionTypesCode: z.string()
}),
  departament: z.string().min(1, '!'),
  departamentObject: z.object(
    {
      SiteKey: z.string(),
      Description: z.string(),
      DescriptionRu: z.string(),
      ShortAddress: z.string(),
      ShortAddressRu: z.string(),
      Phone: z.string(),
      TypeOfWarehouse: z.string(),
      Ref: z.string().min(1, '!'),
      Number: z.string(),
      CityRef: z.string(),
      CityDescription: z.string(),
      CityDescriptionRu: z.string(),
      SettlementRef: z.string(),
      SettlementDescription: z.string(),
      SettlementAreaDescription: z.string(),
      SettlementRegionsDescription: z.string(),
      SettlementTypeDescription: z.string(),
      SettlementTypeDescriptionRu: z.string(),
      Longitude: z.string(),
      Latitude: z.string(),
      PostFinance: z.string(),
      BicycleParking: z.string(),
      PaymentAccess: z.string(),
      POSTerminal: z.string(),
      InternationalShipping: z.string(),
      SelfServiceWorkplacesCount: z.string(),
      TotalMaxWeightAllowed: z.string(),
      PlaceMaxWeightAllowed: z.string(),
      SendingLimitationsOnDimensions: z.object({
          Width: z.number(),
          Height: z.number(),
          Length: z.number()
      }),
      ReceivingLimitationsOnDimensions: z.object({
          Width: z.number(),
          Height: z.number(),
          Length: z.number()
      }),
      Reception: z.object({
          Monday: z.string(),
          Tuesday: z.string(),
          Wednesday: z.string(),
          Thursday: z.string(),
          Friday: z.string(),
          Saturday: z.string(),
          Sunday: z.string()
      }),
      Delivery: z.object({
          Monday: z.string(),
          Tuesday: z.string(),
          Wednesday: z.string(),
          Thursday: z.string(),
          Friday: z.string(),
          Saturday: z.string(),
          Sunday: z.string()
      }),
      Schedule: z.object({
          Monday: z.string(),
          Tuesday: z.string(),
          Wednesday: z.string(),
          Thursday: z.string(),
          Friday: z.string(),
          Saturday: z.string(),
          Sunday: z.string()
      }),
      DistrictCode: z.string(),
      WarehouseStatus: z.string(),
      WarehouseStatusDate: z.string(),
      WarehouseIllusha: z.string(),
      CategoryOfWarehouse: z.string(),
      Direct: z.string(),
      RegionCity: z.string(),
      WarehouseForAgent: z.string(),
      GeneratorEnabled: z.string(),
      MaxDeclaredCost: z.string(),
      WorkInMobileAwis: z.string(),
      DenyToSelect: z.string(),
      CanGetMoneyTransfer: z.string(),
      HasMirror: z.string(),
      HasFittingRoom: z.string(),
      OnlyReceivingParcel: z.string(),
      PostMachineType: z.string(),
      PostalCodeUA: z.string(),
      WarehouseIndex: z.string(),
      BeaconCode: z.string(),
      Location: z.string()
  }
  
  )
})

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/uiShadcn/select"
import { getCity, getDepartament, saveCounterParty, saveInternetDocument } from "@/shared/utils/api/novapost"
import { TypographyP } from "@/shared/uiShadcn/typography"
import {CountBar} from "@/shared/ui"
import { toast } from "react-toastify"
import { saveOrder, updateOrderShippingAdress } from "@/shared/utils/api/crm/order"
import { SaveOrder } from "@/shared/types/responses/SaveOrder"
import { SaveCounterParty } from "@/shared/types/responses/SaveCounterParty"
import { SaveInternetDocument } from "@/shared/types/responses/SaveInternetDocument"

export default function CartPage(){
    const cart = useSelector((state: any) =>  state.cartReducer.cart)
    const dispath = useDispatch()

    const router = useRouter()

    const [finalCount, setFinalCount] = React.useState(0)
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)

    const [citySelect, setCitySelect] = React.useState(Array<any>)
    const [departemantSelect, setDepartemantSelect] = React.useState(Array<any>)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        surname: "",
        phone: "",
        city: "",
        cityObject: {},
        departament: "",
        departamentObject: {},
        PaymentMethod: "",
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const phoneNumber = parsePhoneNumber(values.phone, 'UA')
      values.phone = phoneNumber ? phoneNumber.number.toString() : ''
      try{
        // const order_res:SaveOrder = await saveOrder({
        //   firstName: values.name, 
        //   secondName: values.surname, 
        //   phone: values.phone, products: cart.map((cartItem: any) => {
        //     return {
        //       sku: cartItem.item.sku,
        //       quantity: cartItem.quantity
        //     }
        //   })})

        // const counterParty_res:SaveCounterParty = await saveCounterParty({FirstName: values.name, LastName: values.surname, Phone: values.phone})

        // console.log(counterParty_res)

        // const internetDocument_res:SaveInternetDocument = await saveInternetDocument({
        //   Weight: "1",
        //   Description: "Дитячі іграшки",
        //   CitySenderRef: "db5c893b-391c-11dd-90d9-001a92567626",
        //   SenderRef: "cb8bc054-942f-11ee-a60f-48df37b921db",
        //   SenderAddressRef: "40498332-e1c2-11e3-8c4a-0050568002cf",
        //   ContactSenderRef: "cb8e974d-942f-11ee-a60f-48df37b921db",
        //   SendersPhone: "+380673267750",
        //   CityRecipientRef: values.cityObject.Ref,
        //   RecipientRef: counterParty_res.data[0].Ref,
        //   RecipientAddressRef: values.departamentObject.Ref,
        //   ContactRecipientRef: counterParty_res.data[0].ContactPerson.data[0].Ref,
        //   DateTime: "14.11.2024",
        //   RecipientsPhone: values.phone,
        //   PayerType: finalCount > 1999 ? "Sender" : "Recipient",
        //   Cost: `${finalCount}`
        // })

        // const updatedOrder_res = await updateOrderShippingAdress({
        //   firstName: values.name,
        //   secondName: values.surname,
        //   phone: values.phone, 
        //   idOrder: order_res.id,
        //   tracking_code: internetDocument_res.data[0].IntDocNumber,
        //   shipping_address_city: values.cityObject.MainDescription,
        //   shipping_address_region: `${values.cityObject.Region} ${values.cityObject.Area}.`,
        //   warehouse_ref: values.departamentObject.Ref,
        //   shipping_date: "2024-11-14"
        // })
        dispath(clearCart())
        router.push('/success-order')
      } catch (e: any){

      }
    }
    

    React.useEffect(() => {
      let sum = 0
      cart.map((item: any) => {
        sum = sum + item.quantity * item.item.price
      })
      setFinalCount(sum)
    }, [cart])

    return(
        <div className="flex flex-col px-4 min-h-svh">
            <div className='flex flex-row gap-2 items-center mt-4 mb-2 cursor-pointer' onClick={() => {
              router.push('/')
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            <H2>Назад</H2>
          </div>
            <H1 className="mt-2 mb-6 font-medium">Кошик:</H1>
            {
                cart.length > 0 ?
                cart.map((product: {item: Product, quantity: number}, index: number) => {
                    return (
                        <CartItem product={product} funcMinus={() => {
                          if(product.quantity - 1 === 0){
                            dispath(removeItem({index: index}))
                            toast('Продукт видалено', {type: "success"})
                          } else {
                            dispath(decrementItem({index: index}))
                          }
                        }} funcAdd={() => {
                          if(product.quantity < product.item.quantity){
                            dispath(incrementItem({index: index}))
                          }
                        }} funcRemove={() => dispath(removeItem({index: index}))}></CartItem>

                        
                    )
                })
                :
                <H2 className="text-center mt-10">Пусто...</H2>
            }
            {
              cart.length > 0 &&
              <div className="flex flex-row gap-2 mb-10 justify-end">
                <H2>Загалом:</H2> 
                <H2 className=" font-bold">{`${finalCount}.00 грн`}</H2>
              </div>
            }
            {
              finalCount !== 0 && finalCount < 1999 &&
              <div className=" bg-main text-white flex flex-row justify-center p-4 rounded-2xl gap-4 items-center mb-10 t-s:w-[350px] self-end">
                <div className="w-[10%]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </div>
                <H2 className="w-[90%]">Наповніть кошик від 1999 грн та насолоджуйтесь безкоштовною доставкою!</H2>
              </div>
            }
            {
              finalCount > 1999 &&
              <div className=" bg-light_green text-white flex flex-row justify-center p-4 rounded-2xl gap-4 items-center mb-10 t-s:w-[350px] self-end">
                <div className="w-[10%]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </div>
                <H2 className="w-[80%]">Безкоштовна доставка діє!</H2>
              </div>
            }
            {
              finalCount !== 0 &&
              <Button text={"Оформити замовлення"} variant="default" className='mb-10 self-center' onClick={() => {
                router.push('#orderform')
                setIsOrderCompleted(true)
              }}></Button>
            }
            {
              isOrderCompleted &&
              <div className="flex justify-center mb-10" id="orderform">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 t-s:w-[40%]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Імʼя</FormLabel>
                        <FormControl>
                          <Input placeholder="Ввдедіть імʼя" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Прізвище</FormLabel>
                        <FormControl>
                          <Input placeholder="Введіть прізвище" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Номер телефону</FormLabel>
                        <FormControl>
                          <Input placeholder="Введіть номер телефону" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                  
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Населенний пункт</FormLabel>
                        <FormControl>
                          <Input placeholder="Введіть населений пункт" onChangeCapture={async (e) => {
                            const res = (await getCity({cityName: e.currentTarget.value}))?.data.data
                            form.setValue("departament", "")
                            form.setValue("cityObject.Ref", "")
                            setCitySelect(res)
                            
                          }} {...field}/>
                        </FormControl>
                        <FormDescription>
                          Оберіть населенний пункт з списку нижче.
                        </FormDescription>
                        <FormMessage />
                        <div className="w-full flex flex-col gap-2 max-h-[220px] border-gray rounded-lg overflow-y-auto">
                        {
                            citySelect[0]?.Addresses.map((item: any) => {
                              if(item.AddressDeliveryAllowed){
                                return <div className="border p-2 rounded-lg" onClick={() => {
                                  form.setValue("cityObject", item)
                                  form.setValue("city", item.Present)
                                  setCitySelect([])
                                }}><P>{item.Present}</P></div>
                              }
                            })
                          }
                        </div>
                      </FormItem>
                    )}
                  />
                  {
                    form.getValues("cityObject.Ref") &&
                    <FormField
                    control={form.control}
                    name="departament"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>№ Відділеня або поштомату</FormLabel>
                        <FormControl>
                          <Input placeholder="" onChangeCapture={async (e) => {
                            const res = (await getDepartament({cityRef: form.getValues("cityObject.Ref"), inputValue: e.currentTarget.value}))
                            form.setValue("departamentObject.Ref", "")
                            setDepartemantSelect(res?.data.data)
                            
                          }} {...field}/>
                        </FormControl>
                        <FormDescription>
                          Оберіть номер зі списку нижче.
                        </FormDescription>
                        <FormMessage />
                        <div className="w-full flex flex-col gap-2 max-h-[220px] border-gray rounded-lg overflow-y-auto">
                        {
                            departemantSelect?.map((item: any) => {
                                return <div className="border p-2" onClick={() => {
                                  form.setValue("departament", item.Description)
                                  form.setValue("departamentObject", item)
                                  setDepartemantSelect([])
                                }}><P>{item.Description}</P></div>
                            })
                          }
                          </div>
                      </FormItem>
                    )}
                  />
                  }
                  
                  {
                    form.getValues("departamentObject.Ref") && form.getValues("cityObject.Ref") &&
                    <FormField
                    control={form.control}
                    name="PaymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Спосіб оплати</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть спосіб оплати" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Накладний">Накладний платіж</SelectItem>
                            {/* <SelectItem value="Передоплата">Передоплата</SelectItem> */}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  }
                  
                  <B type="submit" className="w-full bg-main" disabled={form.getValues("cityObject.Ref") && form.getValues("departamentObject.Ref") ? false : true}>Замовити</B>
                </form>
              </Form>
              </div>
            }
            
        </div>
    )
}