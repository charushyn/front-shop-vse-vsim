import MainLayout from "../layouts/MainLayout"

import { ProductsPage } from "@/_pages"

export default function products(){
    return(
        <>
            <MainLayout>
                <ProductsPage></ProductsPage>
            </MainLayout>
        </>
    )
}