'use client'

import React from "react"
import {imgs, slideImg} from "../data/test-img"

export default function Slider(){
    const [index, setIndex] = React.useState(1)

    return(
        <div className="w-full m-s:h-[100px] m-l:h-[150px] relative flex items-center px-4 mt-4 t-s:h-[220px] t-m:h-[270px] d-s:h-[350px] t-s:px-8">
            <div className="absolute left-6 t-s:left-10" onClick={() => {
                setIndex(slideImg(imgs.length, index, 'previous'))
            }}>
                <div className="relative w-8 h-8 flex justify-center items-center">
                    <div className="bg-white opacity-50 rounded-full w-full h-full absolute"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
            </div>
            <div className="z-[-1] w-full h-full relative">
                <img src={imgs[index]} className={`w-full h-full object-cover absolute`}></img>
            </div>
            <div className="absolute right-6 t-s:right-10" onClick={() => {
                setIndex(slideImg(imgs.length, index, 'next'))
            }}>
                <div className="relative w-8 h-8 flex justify-center items-center">
                    <div className="bg-white opacity-50 rounded-full w-full h-full absolute"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    )
}