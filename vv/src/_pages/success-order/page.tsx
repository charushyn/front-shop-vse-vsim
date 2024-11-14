import { H1 } from "@/shared/ui";
import Link from 'next/link'

export default function SuccessOrder(){

    return(
        <div className="h-svh flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col gap-2 text-green-700 max-w-[50%] items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[60px] h-[60px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
                <H1>Замовлення успішно складене!</H1>
            </div>
            <Link href={'/'} className="text-center py-2 px-4 rounded-full bg-white text-black border-[1.5px] border-main">Повернутись на головну</Link>
        </div>
    )
}