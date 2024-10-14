'use client'

import { getProductByID } from "@/shared/utils/api/requests"

import { P, Button, H2, H1, CustomLink } from "@/shared/ui"

export default function ProductCardMini({product, action} : {product: any, action: "link" | "button"}){
    // const product = await getProductByID({productID: id})
    console.log(product)
    return(
        <div className="flex flex-col gap-2 border-light_gray border-[1px] p-4 rounded-3xl">
            <img src={product.thumbnail_url} className="w-full h-full object-contain p-4"></img>
            <H2 text={product.name} className=" font-bolder"></H2>
            <div className="flex flex-row justify-between mt-4 mb-2">
                <H2 text={`${product.min_price}.00 грн`} className="font-bold"></H2>
                <P text="В наявності" className=" text-light_green"></P>
            </div>
            {
                action === "link" ?
                <CustomLink href={`/${product.category_id}/${product.id}`} variant="default" text="Перейти"></CustomLink>
                :
                <Button text='Додати у кошик' variant="default" onClick={() => {}}></Button>
            }
        </div>
    )
}