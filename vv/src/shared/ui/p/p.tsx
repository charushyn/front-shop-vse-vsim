import { cn } from "@/shared/utils/index"

export default function P({text, className} : {text: string, className?: string}){
    return(
        <p className={cn('m-s:text-xs m-l:text-sm t-m:text-base', className)}>{text}</p>
    )
}