'use client'

import { getProducts } from "@/shared/utils/api/requests"

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
import { Product } from "@/shared/types/Product"

export default function UserTablePage(){
  const [urlPhotoZoom, setUrlPhotoZoom] = React.useState("")
  const [data, setData] = React.useState(Array<{
    name: string,
    thumbnail_url: string,
    sku?:string,
    info: {
      id: 4,
      uuid: "CT_1001",
      name: "ТАБЛИЦЯ_ОПТ",
      type: "textarea",
      value: string
  }
  }>)

  React.useEffect(() => {
    const res = async () => {
      const response = await getProducts({customFields: true, limit: 45})
      const filteredData:Array<any> = []
      response.map((item: Product) => {
        let index = item.custom_fields?.findIndex((field: any) => field.uuid === 'CT_1001')

        if(index === -1 || index == undefined){
          return
        } else {
          filteredData.push({
            name: item.name,
            thumbnail_url: item.thumbnail_url,
            sku: item.sku ? item.sku : '',
            info: item.custom_fields?.[index]
          })
        }
      })
      setData(filteredData)
    }

    res()
  }, [])
  return(
    <div className="flex flex-col px-4">
      {
          <div className={`bg-gray ${urlPhotoZoom.length > 0 ? 'bg-opacity-50' : 'bg-opacity-0'} flex t-s:justify-center transition-[background-color] duration-300 h-full w-full fixed overflow-y-scroll overflow-x-hidden top-0 left-0 right-0 ${urlPhotoZoom.length > 0 ? 'opacity-100 z-[100]' : 'opacity-0 z-[-100]'}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        setUrlPhotoZoom("")
                        }}>
                        {/* body popup */}
                        <div className={`bg-white h-fit p-4 m-4 d-s:w-[50svw] relative ${urlPhotoZoom.length > 0 ? 'opacity-100' : 'opacity-0'}  transition-opacity top-0 duration-1000 t-s:p-8`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            }}>
                            <div className='flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => {
                                  setUrlPhotoZoom("")
                                }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </div>
                            <img src={urlPhotoZoom} className="w-[250px] h-[250px] d-s:w-[40svw] d-s:h-[40svh] object-contain"></img>
                        </div>
                    </div>
        }
      <Link href={'/'} className="flex mt-4 flex-row gap-4 py-2 px-4 text-white bg-main rounded-lg w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <H1>Повернутись на головну</H1>
      </Link>
      <div className="w-fit h-fit p-4 flex flex-col border border-black mt-4 gap-4 rounded-lg">
        <H1>Контакти:</H1>
        <div className="flex flex-row gap-2 items-center relative">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K6iHlN79UOl9U5uImTPZr-0KQiqNWq5_Zw&s" className="w-6 h-6"></img>
          <H2>Телеграм: +380 67 326 7750</H2>
        </div>
        <div className="flex flex-row gap-2 items-center relative">
          <img src="https://img.icons8.com/?size=160&id=bV3syodg1hrI&format=png" className="w-6 h-6"></img>
          <H2>Вайбер: +380 67 326 7750</H2>
        </div>
      </div>
      <div className="my-4">
        <H1 className="font-bold">Пересувайте таблицю та переглядайте товари на ОПТ</H1>
      </div>
      <div className="flex justify-center">
        <Table className="">
          <TableHeader className="text-center">
              <TableRow className="grid grid-cols-[1fr_200px_200px_400px] t-s:grid-cols-4">
                <TableCell className="">Артикул</TableCell>
                <TableCell className="">Фото</TableCell>
                <TableCell className="">Назва</TableCell>
                <TableCell className="">Інформація</TableCell>
              </TableRow>
          </TableHeader>
          <TableBody>
          {data.length > 0 && data.map((item, index) => {
            return (
              <TableRow className="text-center items-center grid grid-cols-[1fr_200px_200px_400px] t-s:grid-cols-4">
                <TableCell className="">{item.sku}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <img src={item.thumbnail_url} onClick={() => setUrlPhotoZoom(item.thumbnail_url)} className=""></img>
                </TableCell>
                <TableCell className="tracking-wider whitespace-pre-line break-words">{item.name}</TableCell>
                <TableCell className="tracking-wider whitespace-pre-line break-words">{item.info.value}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}