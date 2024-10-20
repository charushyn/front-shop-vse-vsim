'use client'

import {H2, P, A} from '@/shared/ui/index'
import Link from 'next/link'

import logo from '@/../public/static-img/logo-shop.png'

import React from 'react'

export default function Header(){
    const [activeNav, setActiveNav] = React.useState(false)
    return(
        <header className='border-b border-light_gray'>
            <div className="flex m-s:flex-col p-4 m-s:gap-2 t-s:px-8">
                {/* popup */}


                    <div className={`bg-gray ${activeNav ? 'bg-opacity-50' : 'bg-opacity-0'} transition-[background-color] duration-300 h-full w-full fixed top-0 left-0 right-0 ${activeNav ? 'opacity-100 z-[100]' : 'opacity-0 z-[-100]'}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        setActiveNav(false)
                        }}>
                        {/* body popup */}
                        <div className={`bg-white h-fit p-4 relative ${activeNav ? 'top-[0px]' : 'top-[-9999px]'}  transition-[top] duration-500 t-s:p-8`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            }}>
                            <div className='flex flex-row justify-between pb-4 border-b'>
                                <img src={logo.src} className="w-10 h-10 t-s:w-[60px] t-s:h-[60px]"></img>
                                {/* Logo */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 t-s:w-8 t-s:h-8" onClick={() => {setActiveNav(false)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            {/* button for close popup */}
                            </div>
                            <div className='flex flex-col gap-4 pt-4'>
                                <a href='#about' className=' underline-offset-4 underline' onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setActiveNav(false)
                                }}>Про Нас</a>
                                <a href='#footer' className=' underline-offset-4 underline' onClick={(e: React.MouseEvent<HTMLElement>) => {
                                setActiveNav(false)
                                }}>Соц. мережі</a>
                                <div className='flex flex-row gap-2 items-center'>
                                    <Link href={'/login'} target='#footer' className=' underline-offset-4 underline' onClick={(e: React.MouseEvent<HTMLElement>) => {
                        setActiveNav(false)
                        }}>Вхід</Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>


                <div className='flex flex-row justify-between'>
                    <img src={logo.src} className="w-10 h-10 t-s:w-[60px] t-s:h-[60px]"></img>
                    {/* Logo */}
                    <div className="flex flex-row gap-1 items-center border-[1px] p-1 rounded-md t-s:px-4 t-s:gap-2" onClick={() => {setActiveNav(true)}}>
                        <P text='Розділи'></P>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 t-s:w-7 t-s:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    {/* button for popup */}
                </div>
                {/* block logo+button */}
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <H2 text='+38 (067) 326-77-50' className='text-main font-bold'></H2>
                        <P text='Пн-Сб: 8:00-17:00'></P>
                    </div>
                    {/* phone number */}
                    {/* <Link href={'/card'} className='relative w-8 h-8 t-s:mt-2 t-s:w-9 t-s:h-9 t-m:w-10 t-m:h-10'>
                        <svg className='text-main absolute h-full w-full' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.132 2.504 4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.263A2.004 2.004 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.145-5.504-1.736-.992zM14 13h2v5h-2v-5zm-6 0h2v5H8v-5z"/>
                        </svg>
                        <div className='m-s:w-5 m-s:h-5 bg-red-500 absolute flex justify-center items-center rounded-full right-[-4px] bottom-[-4px] t-m:w-6 t-m:h-6 t-m:right-[-5px] t-m:bottom-[-5px]'>
                            <P text='1' className='text-white'></P>
                        </div>
                    </Link> */}
                    {/* icon basket */}
                </div>
                {/* block for phone number + basket */}
            </div>
        </header>
    )
}