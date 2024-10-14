'use client'

import { cn } from "@/shared/utils/index"
import {P} from "@/shared/ui/index"

import Lin from 'next/link'

export default function CustomLink({className, variant, text, href} : {className?: string, variant: 'default' | 'outline', text: string, href:string}){
    switch(variant){
        case 'default':
            return(
                <Lin href={href} className={cn('text-center font-bold py-2 px-4 rounded-full bg-main text-white', className)}>
                    {text}
                </Lin>
            )
        case 'outline':
            return(
                <Lin href={href} className={cn('text-center font-bold py-2 px-4 rounded-full bg-white text-black border-[1.5px] border-main', className)}>
                    <P text={text}></P>
                </Lin>
            )
    }
    
}