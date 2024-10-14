'use client'

import { P } from "@/shared/ui"
import { getUserDevice } from "@/shared/utils"
import Link from "next/link"
import React from "react"

import {Button} from "@/shared/ui"



export default function CategoriesMini({categories} : {categories: Array<any>}){
    const [categoriesClient, setCategoriesClient] = React.useState(Array<any>)
    const [userScreen, setUserScreen] = React.useState('')
    const [activeMoreCategories, setActiveMoreCategories] = React.useState(false)

    React.useEffect(() => {
        setCategoriesClient(categories)
        setUserScreen(getUserDevice(screen.width))
    }, [])
    
    return (
        <div className="">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 mb-4">
            {
                categoriesClient.map((item:any, index) => {
                    if(activeMoreCategories) {
                        return(
                            <Link href={`/${item.id}/`} key={item.name} className="border p-2">
                                <P text={item.name}></P>
                            </Link>
                        )
                    }
                    if(userScreen === 'm' && index >= 6){ return }
                    return(
                        <Link href={`/${item.id}/`} key={item.name} className="border p-2">
                            <P text={item.name}></P>
                        </Link>
                    )
                })
            }
            </div>
            {
                !activeMoreCategories && <Button text="Більше категорій..." variant="outline" onClick={() => setActiveMoreCategories(true)}></Button>
            }
        </div>
    )
}