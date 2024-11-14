'use client'

import { getOffers, getProductByID } from "@/shared/utils/api/requests"

import { P, Button, H2, H1, CustomLink } from "@/shared/ui"
import { Product } from "@/shared/types/Product"

import React from "react"

import { useRouter } from "next/navigation"

export default function ProductCardMini({product, action} : {product: Product, action: "link" | "button"}){

    const router = useRouter()

    const [properties, setProperties] = React.useState(Array<object>)

    React.useEffect(() => {
        const req = async () => {
            if(product.has_offers){
                const offersRes = await getOffers({product_id: product.id})
                var array:Array<any> = []
                offersRes.data.map((offer: any, offerIndex: number) => {
                    offer.properties.map((property: any, propertyIndex: number) => {
                        if(!array[propertyIndex]){
                            
                            array.push({name: property.name, values: [property.value]})
                            return
                        }
                        if(array[propertyIndex].values.some((value: any) => { value === property.value})){
                            return
                        } else {
                            array[propertyIndex].values.push(property.value)
                        }
                    })
                })
                setProperties(array)
            }
        }

        req()
    }, [])
    
    return(
        <div className="flex flex-col justify-between gap-2 border-light_gray border-[1px] p-4 rounded-3xl">
            <div>
                <img src={product.thumbnail_url} onClick={() => {
                    router.push(`/products/${product.id}`)
                }} className="w-full h-[150px] object-contain object-center t-s:h-[300px] p-4"></img>
                <H2 className=" font-bold break-words">{product.name}</H2>
                {
                    properties.length !== 0 &&
                    <H2 className="mt-4 mb-2">Варінати товару:</H2>
                }
                {properties.map((item: any) => {
                    return (
                        <div className="break-words">
                            <P className=" font-medium">{item.name}:</P>
                            {
                                item.values.map((value: any, index: number) => {
                                    return <P className="px-[2px] ">{`${value}${index === item.values.length - 1 ? '.' : ','}`}</P>
                                })
                            }
                        </div>
                    )
                })}
                
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between mt-4 mb-2">
                        <H2 className="font-bold">{product.min_price !== product.max_price ? `від ${product.min_price}.00 грн` : `${product.min_price}.00 грн`}</H2>
                        <P className={product.quantity === 0 ? ' text-gray text-opacity-40' : 'text-green-700'}>{product.quantity === 0 ? 'Немає в наявності' : 'В наявності'}</P>
                </div>
                <Button disabled={product.quantity === 0} text={product.has_offers ? 'Перейти до товару' : "Додати у кошик"} className=" self-center" variant="default" onClick={() => {
                router.push(`/products/${product.id}`)
                }}></Button>
            </div>
            
        </div>
    )
}