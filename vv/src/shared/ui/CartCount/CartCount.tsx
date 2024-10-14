export default function CartCount({count, funcAdd, funcMinus} : {count: number, funcAdd: () => void, funcMinus: () => void}){
    return(
        <div className="flex flex-row gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => {funcMinus()}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
            <div className="py-1 px-3 rounded-full border-[0.25px] border-gray border-opacity-30">
                {count}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => {funcAdd()}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    )
}