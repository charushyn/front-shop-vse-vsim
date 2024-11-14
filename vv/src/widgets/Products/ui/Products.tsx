'use server'

import { getCategories } from "@/shared/utils/api/requests"
import { getProducts } from "@/shared/utils/api/requests"
import Link from "next/link"

import { Button, H1, H2, P } from "@/shared/ui"
import { getUserDevice } from "@/shared/utils"
import { CategoriesMini, ProductCardMini } from "@/entities"

import { useSearchParams } from "next/navigation"

import { headers } from "next/headers"
import { Product } from "@/shared/types/Product"

export default async function Products(){
    const data = await getCategories({})
    const categories = data.filter((item:any) => {
        if(typeof item.parent_id === "object"){
            return true
        } else {
            return false
        }
    })

    const products = await getProducts({sort: "byQuantity"})


    const previewProducts = products.splice(0, 8)

    return(
        <div className="my-4 flex flex-col px-4">
            <H1 className="mb-4 underline">Популярні категорії</H1>
            <CategoriesMini categories={categories}></CategoriesMini>
            <H1 className="my-4 underline">Популярні товари</H1>
            <div className="grid grid-cols-1 t-s:grid-cols-2 gap-4 d-s:grid-cols-4">
                {
                    previewProducts.map((product: any) => {
                        return(
                                <ProductCardMini action="link" product={product}></ProductCardMini>
                        )
                    })
                }
            </div>
            <Link href={'/products'} className="flex flex-col gap-4 items-center px-4 mt-4 m-l:w-[80%] m-l:mx-auto t-s:w-[60%] t-s:my-10 d-s:my-[100px] d-s:w-[40%] w-full text-center font-bold py-2 rounded-full bg-main text-white t-s:py-4">
                Перейти до повного каталогу
            </Link>
        </div>
    )
}