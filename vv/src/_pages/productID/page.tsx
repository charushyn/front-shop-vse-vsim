'use client'

import { H1, P, H2 } from '@/shared/ui'
import { getOffers, getProductByID } from '@/shared/utils/api/requests'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import React from 'react'
 
export default function ProductPage() {
  const [product, setProduct] = React.useState(Object)
  const [availableOffers, setAvailableOffers] = React.useState(Array<{name: string, value: string}>)
  // const [chosedProperties, setChosedProperties] = React.useState({})
  
  const params = useParams()

  React.useEffect(() => {
    const req = async () => {
      const item = await getProductByID({productID: +params.productID})

      if(item.has_offers){
        const offers:Array<any> = (await getOffers({product_id: item.id})).data
        setAvailableOffers(offers)
      }

      setProduct(item)
    }

    req()
  }, [])

  return (
    <div className='px-4 flex flex-col'>
        <Link href={'/'} className='flex flex-row justify-center gap-4 bg-main rounded-xl text-white py-4 items-center mt-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <H1 text='Каталог товарів' className='font-bold'></H1>
        </Link>
      <div className='flex flex-col'>
        
        <H1 text={product.name} className='font-bold text-center mt-10'></H1>
        <div className='flex flex-row overflow-x-auto gap-2 mt-4'>
          {
            product?.attachments_data?.map((src:string) => {
              return(
                <img src={src} className='w-full object-contain'></img>
              )
            })
          }
        </div>
        
      </div>
      {
        product.has_offers &&
        <div>
           <H1 text={'Оберіть варіант товару:'} className='mt-4 mb-2 font-bold'></H1>
           <div className='h-[1px] bg-light_gray'></div>
          <div className='flex flex-row gap-2 items-center my-2'>
            <P text='Від'></P>
            <H2 text={`${product.min_price} грн`} className='font-bold'></H2>
            <P text='до'></P>
            <H2 text={`${product.max_price} грн`} className='font-bold'></H2>
          </div>
          <div className='flex flex-col gap-2 max-h-[150px] overflow-y-auto'>
            {
              availableOffers.map((offer: any) => {
                if(offer.quantity !== 0){
                  return (
                    <Link href={`/${product.category_id}/${product.id}/${offer.id}`} className='flex flex-row gap-2 bg-light_gray font-bold rounded-lg p-2 items-center'>
                      <img src={offer.thumbnail_url} className='h-[60px] w-[60px] bg-white p-1 rounded-lg'></img>
                      <P text={`${product.name} ${offer.properties.map((property: {name: string, value: string}) => {return ` ${property.value}`})}. ${offer.price} грн`}></P>
                    </Link>
                  )
                }
              })
            }
          </div>
        </div>
      }
        <div className='flex flex-col gap-2 my-4'>
          <H2 text='Опис:' className='font-bold'></H2>
          <div className='h-[1px] bg-light_gray'></div>
          <P className='tracking-wider whitespace-pre-line break-words' text={product.description}></P>
        </div>
      
    </div>
  )
}