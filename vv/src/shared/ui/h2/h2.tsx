import { cn } from "@/shared/utils/index"

export default function H2({text, className} : {text: string, className?: string}){
    return(
        <h2 className={cn(className, ' m-s:text-sm t-s:text-base t-m:text-lg')}>{text}</h2>
    )
}