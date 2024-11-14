import { cn } from "@/shared/utils/index"

export default function H2({className, children} : {className?: string, children: React.ReactNode}){
    return(
        <h2 className={cn(className, ' m-s:text-sm t-s:text-base t-m:text-lg')}>{children}</h2>
    )
}