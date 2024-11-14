import { cn } from "@/shared/utils/index"

export default function H1({className, children} : {className?: string, children: React.ReactNode}){
    return(
        <h1 className={cn(className, 'm-s:text-base t-m:text-xl')}>{children}</h1>
    )
}