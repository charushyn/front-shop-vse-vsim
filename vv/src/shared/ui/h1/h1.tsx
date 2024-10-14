import { cn } from "@/shared/utils/index"

export default function H1({text, className} : {text: string, className?: string}){
    return(
        <h1 className={cn(className, ' m-s:text-base t-m:text-xl')}>{text}</h1>
    )
}