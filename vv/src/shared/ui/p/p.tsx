import { cn } from "@/shared/utils/index"

export default function P({className, children} : {className?: string, children: React.ReactNode}){
    return(
        <span className={cn('m-s:text-xs m-l:text-sm t-m:text-base', className)}>{children}</span>
    )
}