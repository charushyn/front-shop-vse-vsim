'use server'

import { getCategories } from "@/shared/utils/api/requests"
import { getProducts } from "@/shared/utils/api/requests"
import Link from "next/link"
import { CategoryLine } from "@/features"

import { H1, H2, P } from "@/shared/ui"
import { getUserDevice } from "@/shared/utils"
import { CategoriesMini, ProductCardMini } from "@/entities"

export default async function Categories(){
    const categories = await getCategories({})
    const products = await getProducts({})
 
    return(
        <div className="my-4 flex flex-col px-4">
            <H1 text="Популярні категорії" className="mb-4 underline"></H1>
            <CategoriesMini categories={categories}></CategoriesMini>
            <H1 text="Популярні товари" className="my-4 underline"></H1>
            <div className="flex flex-col gap-2">
                {
                    products.map((product: any) => {
                        if(product.quantity === 0){ return }
                        return(
                                <ProductCardMini action="link" product={product}></ProductCardMini>
                        )
                    })
                }
            </div>
            {/* {
                categories?.map((item:any) => {
                    return(
                        <div className="flex flex-col gap-2">
                            <CategoryLine categoryID={item.id} categoryName={item.name}></CategoryLine>
                        </div>
                    )
                })
            } */}
            {/* {
                products.map((item: any) => {
                    return(
                        <Link href={`/${item.category_id}/${item.id}`} key={item.name} className="border">
                            <img src={item.thumbnail_url} className="w-10 h-10"></img>
                            {item.name}
                        </Link>
                    )
                })
            } */}
        </div>
    )
}