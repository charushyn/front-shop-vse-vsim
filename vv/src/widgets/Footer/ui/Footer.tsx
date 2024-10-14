'use client'

import { H1, H2, P } from "@/shared/ui";

import React from "react";

export default function Footer(){
    const titles = ['Ми у соцмережах', 'Контакти', 'Розділи']
    const [active, setActive] = React.useState('')


    return(
        <footer className=" bg-light_gray px-4" id="footer">
            <div className="flex flex-col w-full">
                            <div className="flex flex-col justify-center border-b-[0.25px] border-opacity-30 border-gray" onClick={() => {
                                active === titles[0] ? setActive('') : setActive(titles[0])
                                }}>
                                <div className="flex flex-row justify-center py-4 gap-2 mt-2">
                                    <H2 text={titles[0]} className="font-semibold"></H2>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-6 ${active === titles[0] && 'rotate-180'} duration-200`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                {/* desc */}
                                <div className={`grid transition-grid-rows duration-500 ease-in-out ${active === titles[0] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <a href="https://www.instagram.com/vse.vsim.shop/" target="_blank" className="flex flex-row justify-center gap-2 overflow-hidden mb-2 items-center">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRca2QB2rdMxLqU9HydJjD5Tywl4LLS_h1vKQ&s" className="w-5 h-5"></img>
                                        <H2 text="vse.vsim.shop" className="underline"></H2>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center border-b-[0.25px] border-opacity-30 border-gray" onClick={() => {
                                active === titles[1] ? setActive('') : setActive(titles[1])
                                }}>
                                <div className="flex flex-row justify-center py-4 gap-2 mt-2">
                                    <H2 text={titles[1]} className="font-semibold"></H2>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-6 ${active === titles[1] && 'rotate-180'} duration-200`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                {/* desc */}
                                <div className={`grid transition-grid-rows duration-500 ease-in-out ${active === titles[1] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} mb-2`}>
                                        <div className="flex flex-col gap-2 overflow-hidden m-m:pl-6">
                                            <div className="flex flex-row gap-2 items-center relative">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K6iHlN79UOl9U5uImTPZr-0KQiqNWq5_Zw&s" className="w-6 h-6"></img>
                                                <H2 text="Телеграм: +380 67 326 7750"></H2>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center relative">
                                                <img src="https://img.icons8.com/?size=160&id=bV3syodg1hrI&format=png" className="w-6 h-6"></img>
                                                <H2 text="Вайбер: +380 67 326 7750"></H2>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center relative cursor-pointer">
                                            <img src="https://seeklogo.com/images/O/olx-logo-20F1656D13-seeklogo.com.png" className="w-6 h-6"></img>
                                                <H2 text="ОЛХ: Натисніть для переходу" className="underline"></H2>
                                                <a href="https://www.olx.ua/uk/list/user/8mgNS/" target="_blank" className="absolute w-full h-full top-0 bottom-0"></a>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col justify-center border-b-[1px] border-gray border-opacity-30" onClick={() => {
                                active === titles[2] ? setActive('') : setActive(titles[2])
                                }}>
                                <div className="flex flex-row justify-center py-4 gap-2">
                                    <H2 text={titles[2]} className="font-semibold"></H2>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-6 ${active === titles[2] && 'rotate-180'} duration-200`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                
                                <div className={`grid transition-grid-rows duration-500 ease-in-out ${active === titles[2] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className=" overflow-hidden">some info lol</div>
                                </div>
                            </div> */}
                </div>
            <div className=" text-center pt-10 pb-4">
                site was made by: <a className=" underline" target="_blank" href="https://t.me/charushyn">charushyn</a>
            </div>
        </footer>
    )
}