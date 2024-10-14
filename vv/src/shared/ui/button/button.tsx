'use client'

import { cn } from "@/shared/utils/index"
import {P} from "@/shared/ui/index"

export default function Button({className, variant, text, onClick} : {className?: string, variant: 'default' | 'outline', text: string, onClick: Function}){
    switch(variant){
        case 'default':
            return(
                <button className={cn('text-center font-bold py-2 px-4 rounded-full bg-main text-white', className)} onClick={() => {onClick()}}>
                    {text}
                </button>
            )
        case 'outline':
            return(
                <button className={cn('text-center font-bold py-2 px-4 rounded-full bg-white text-black border-[1.5px] border-main', className)} onClick={() => {onClick()}}>
                    <P text={text}></P>
                </button>
            )
    }
    
}