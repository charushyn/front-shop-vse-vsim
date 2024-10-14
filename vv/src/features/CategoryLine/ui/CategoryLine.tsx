'use client'

import { getProducts } from "@/shared/utils/api/requests";
import { H2 } from "@/shared/ui";

import React from "react";

export default function CategoryLine({categoryID, categoryName} : {categoryID: number, categoryName: string}){
    const [productsLine, setProductsLine] = React.useState(Array<any>)

    React.useEffect(() => {
        const products = async () => {
            setProductsLine(await getProducts({categoriesID: [categoryID]}))
        }

        products()
    }, [])


    return(
            <div className="flex flex-col gap-2">
                <H2 text={categoryName}></H2>
                {
                    productsLine.map((product: any) => {
                        console.log(product)
                        return(
                            <div>1</div>
                        )
                    })
                }
            </div>        
    )
}