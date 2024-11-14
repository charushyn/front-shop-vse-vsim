import { H1, Button } from "@/shared/ui";

import Link from "next/link"

export default function BulkPreview(){
    return(
        <div className="flex flex-col gap-4 items-center px-4 mt-4 m-l:w-[80%] m-l:mx-auto t-s:w-[60%] t-s:my-10 d-s:my-[100px] d-s:w-[40%]">
            <H1 className=" font-bold">Маємо пропозиції для Оптовиків!</H1>
            <Link className="w-full text-center font-bold py-2 px-4 rounded-full bg-main text-white t-s:py-4" href="/table">Перейти до таблиці</Link>
        </div>
    )
}