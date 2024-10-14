import { cn } from "@/shared/utils/index";

export default function A({text, className, href} : {text: string, className?: string, href: string}){
    return(
        <a target="_blank" href={href} className={cn(className, '')}>{text}</a>
    )
}