'use client'

import { getTable } from "@/shared/utils/api/requests"

import { H1, H2, P } from "@/shared/ui"

import React from "react"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/uiShadcn/table"

export default function UserTablePage(){
  const [data, setData] = React.useState(Array<Array<any>>)

  React.useEffect(() => {
    const res = async () => {
      setData((await getTable())?.data[0].data)
    }

    res()
  }, [])
  return(
    <div className="flex flex-col px-4">
      <Link href={'/'} className="flex mt-4 flex-row gap-4 py-2 px-4 text-white bg-main rounded-lg w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <H1 text="Повернутись на головну"></H1>
      </Link>
      <div className="w-fit h-fit p-4 flex flex-col border border-black mt-4 gap-4 rounded-lg">
        <H1 text="Контакти:"></H1>
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
      <div className="flex justify-center">
        <Table className="">
          {data?.map((array, i) => {
            return (
              <TableRow className="text-center">
                {
                  array.map((item:any, index:number) => {
                    if(i === 0 && index === 1){
                      return <TableCell>Фото</TableCell>
                    }
                    if(i === 0 && index !== 1){
                      return <TableCell>{item}</TableCell>
                    }
                    if(index === 1){
                      return (
                        <TableCell className="flex justify-center">
                          <img src={item} className="min-w-[120px] h-[120px]"></img>
                        </TableCell>
                      )
                    }
                    return <TableCell className="">{item}</TableCell>
                  })
                }
              </TableRow>
            )
          })}
        </Table>
      </div>
    </div>
  )
}