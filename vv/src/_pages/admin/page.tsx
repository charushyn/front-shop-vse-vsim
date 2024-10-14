import Link from "next/link"

export default function AdminPage(){
    return(
        <div className="flex justify-center items-center h-svh w-full">
            <Link href={'/admin/table'} className="text-black border px-4 py-2 border-black rounded-lg">Перейти до панелі</Link>
        </div>
    )
}