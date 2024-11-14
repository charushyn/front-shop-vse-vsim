'use client'

import { P } from "@/shared/ui"
import { getUserDevice } from "@/shared/utils"
import Link from "next/link"
import React from "react"

import { useRouter } from "next/navigation"

import {Button} from "@/shared/ui"

import { useSearchParams } from "next/navigation"



export default function CategoriesMini({categories} : {categories: Array<any>}){
    const [userScreen, setUserScreen] = React.useState('')
    const [activeMoreCategories, setActiveMoreCategories] = React.useState(false)

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const router = useRouter()




    React.useEffect(() => {
        setUserScreen(getUserDevice(screen.width))
    }, [])
    
    return (
        <div className="">
            <div className="grid grid-cols-2 t-s:grid-cols-3 gap-4 mb-4">
            {
                categories.map((item:any, index) => {
                    if(activeMoreCategories) {
                        return(
                            <button onClick={() => {
                                if(typeof params.get("category") === "object"){
                                    window.location.href = `/products/?categories=${item.id}`
                                } else {
                                    window.location.href = `/products/?categories=${params.get("categories")},${item.id}`
                                }
                            }} key={item.name} className="border p-2">
                                <P>{item.name}</P>
                            </button>
                        )
                    }
                    if(userScreen === 'm' && index >= 6){ return }
                    return(
                        <button onClick={() => {
                            if(typeof params.get("category") === "object"){
                                window.location.href = `/products/?categories=${item.id}`
                            } else {
                                window.location.href = `/products/?categories=${params.get("categories")},${item.id}`
                            }
                        }} key={item.name} className="border p-2 t-l:p-4">
                            <P>{item.name}</P>
                        </button>
                    )
                })
            }
            </div>
            {
                !activeMoreCategories && userScreen === 'm' && <Button text="Більше категорій..." variant="outline" onClick={() => setActiveMoreCategories(true)}></Button>
            }
        </div>
    )
}