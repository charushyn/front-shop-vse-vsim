'use client'

import { cn } from "@/shared/utils/index"
import {P} from "@/shared/ui/index"

export default function Button({className, variant, text, onClick, disabled} : {className?: string, variant: 'default' | 'outline', text: string, onClick: Function, disabled?:boolean}){
    switch(variant){
        case 'default':
            return(
                <button disabled={disabled} className={cn(`text-center font-bold py-2 px-4 rounded-full bg-main text-white d-s:w-fit d-s:px-10 d-s:py-6 ${disabled && 'bg-opacity-50'}`, className)} onClick={() => {onClick()}}>
                    {text}
                </button>
            )
        case 'outline':
            return(
                <button disabled={disabled}  className={cn(`text-center font-bold py-2 px-4 rounded-full bg-white text-black border-[1.5px] border-main ${disabled && ' border-opacity-50'}`, className)} onClick={() => {onClick()}}>
                    <P>{text}</P>
                </button>
            )
    }
    
}