'use client'

import { Product } from '@/shared/types/Product'
import { H1, P, H2, CountBar } from '@/shared/ui'
import { getOffers, getProductByID } from '@/shared/utils/api/requests'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {Button} from '@/shared/ui'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '@/shared/utils/redux/productCart/productCart'
import { toast } from 'react-toastify'

import FadeLoader from "react-spinners/FadeLoader"

import { useRouter } from 'next/navigation'
 
export default function ProductPage() {
  const [product, setProduct] = React.useState<Product>(Object)
  const [availableOffers, setAvailableOffers] = React.useState(Array<{name: string, value: string}>)

  const [slideIndex, setSlideIndex] = React.useState(0)

  const [activeNav, setActiveNav] = React.useState(false)
  const [modalProduct, setModalProduct] = React.useState<any>(Object)

  const [itemCount, setItemCount] = React.useState(1)

  const [isLoading, setIsLoading] = React.useState(true)

  const [showAllDescription, setShowAllDescrition] = React.useState(false)


  const dispatch = useDispatch()

  const router = useRouter()
  

  const cart = useSelector((state: any) =>  state.cartReducer.cart)
  
  const params = useParams()

  React.useEffect(() => {
    const productIndexInCart = cart.findIndex((cartItem: {item: Product, quantity: number}) => product.id === cartItem.item.id)

    if(productIndexInCart === -1){
      return
    } else {
      setItemCount(cart[productIndexInCart].quantity)
    }
  }, [])

  React.useEffect(() => {
    const req = async () => {
      const item = await getProductByID({productID: +params.productID})

      if(item.has_offers){
        const offers:Array<any> = (await getOffers({product_id: item.id})).data
        setAvailableOffers(offers)
      }

      setProduct(item)
      setIsLoading(false)
    }

    req()
  }, [])

  return (
    <div className='px-4 flex flex-col'>
        {
          <div className={`bg-gray ${activeNav ? 'bg-opacity-50' : 'bg-opacity-0'} flex t-s:justify-center transition-[background-color] duration-300 h-full w-full fixed overflow-y-scroll overflow-x-hidden top-0 left-0 right-0 ${activeNav ? 'opacity-100 z-[100]' : 'opacity-0 z-[-100]'}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        setActiveNav(false)
                        }}>
                        {/* body popup */}
                        <div className={`bg-white h-fit p-4 m-4 d-s:w-[50svw] relative ${activeNav ? 'opacity-100' : 'opacity-0'}  transition-opacity top-0 duration-1000 t-s:p-8`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            }}>
                            {
                              
                            }
                            <div className='flex flex-col'>
                              <div className='flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => {
                                  setActiveNav(false)
                                }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </div>
                              <img src={modalProduct.thumbnail_url} className='w-full h-[200px] object-contain mb-4 mt-4 d-s:h-[400px]'></img>
                              {
                                product.has_offers ? <H2>{`${product.name} ${modalProduct.properties?.map((property: {name: string, value: string}) => {return ` ${property.value}`})}.`}</H2>
                                :
                                <H2>{`${product.name}`}</H2>
                              }
                              
                              <H2 className='font-bold mt-4'>{`${modalProduct.price}.00 грн`}</H2>
                              <div className='flex flex-row gap-2 items-center justify-center mt-4 mb-2'>
                                <CountBar count={itemCount} funcAdd={() => {
                                    if(itemCount < modalProduct.quantity){
                                      setItemCount(itemCount + 1)
                                    }
                                }} funcMinus={() => {
                                  if(itemCount - 1 === 0){
                                    setActiveNav(false)
                                  } else {
                                    setItemCount(itemCount - 1)
                                  }
                                }}></CountBar>
                                </div>
                              <div className='flex justify-center mb-4'>
                                <P>{`В наявності: ${modalProduct.quantity} шт`}</P>
                              </div>
                              <Button text={"Додати у кошик"} variant="default" className='d-s:w-fit d-s:px-10 d-s:py-6 self-center' onClick={() => {
                                  if(product.has_offers){
                                    try{
                                      dispatch(addItem({item: {name: product.name, ...modalProduct}, quantity: itemCount}))
                                      toast('Услішно!', {type: 'success', onClose: () => setActiveNav(false), autoClose: 500})
                                    } catch(e: any) {
                                      toast(e.message, {type: "warning"})
                                    }
                                  } else {
                                    try{
                                      dispatch(addItem({item: modalProduct, quantity: itemCount}))
                                      toast('Услішно!', {type: 'success', onClose: () => setActiveNav(false), autoClose: 500})
                                    } catch(e: any) {
                                      toast(e.message, {type: "warning"})
                                    }
                                    
                                  }
                                  
                              }}></Button>
                              <div className='flex flex-col gap-2 my-4'>
                                <H2 className='font-bold'>Опис:</H2>
                                <div className='h-[1px] bg-light_gray'></div>
                                <P className='tracking-wider whitespace-pre-line break-words'>{product.description}</P>
                              </div>
                            </div>
                        </div>
                    </div>
        }
        <div className='flex flex-row gap-2 items-center mt-4 mb-2 cursor-pointer' onClick={() => {
            window.history.back()
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
          <H2>Назад</H2>
        </div>
        <Link href={'/'} className='flex flex-row justify-center gap-4 bg-main rounded-xl text-white py-4 items-center mt-4 t-l:w-fit px-10'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <H1 className='font-bold'>Каталог товарів</H1>
        </Link>
        {
          isLoading ?
          <FadeLoader></FadeLoader>
          :
        <div className='flex flex-col'>
        
          <H1 className='font-bold text-center mt-10 mb-4 d-s:mb-10'>{product.name}</H1>
          <div className='flex flex-col t-l:flex-row'>
                <div className={`relative w-full flex flex-row items-center min-h-[50svh] d-s:w-[40svw] ${!product.has_offers && 'mx-auto'}`}>
                    {
                      product.attachments_data.length > 1 &&
                      <div className="absolute w-8 h-8 flex justify-center items-center left-2" onClick={() => {
                        if(slideIndex === 0){
                          setSlideIndex(product?.attachments_data?.length - 1)
                        } else {
                          setSlideIndex(slideIndex - 1)
                        }
                      }}>
                          <div className="bg-white opacity-50 rounded-full w-full h-full absolute"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                          </svg>
                      </div>
                    }
                    
                      <img src={product?.attachments_data?.[slideIndex]} className=' object-contain max-h-[50svh] w-full'></img>
                      <div className='absolute bottom-0 w-full text-center'>
                        <P className='mx-auto'>{slideIndex + 1}/{product.attachments_data.length}</P>
                      </div>
                      {
                        product.attachments_data.length > 1 &&
                        <div className="absolute w-8 h-8 flex justify-center items-center right-2" onClick={() => {
                        if(slideIndex === product?.attachments_data?.length - 1){
                          setSlideIndex(0)
                        } else {
                          setSlideIndex(slideIndex + 1)
                        }
                      }}>
                          <div className="bg-white opacity-50 rounded-full w-full h-full absolute"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                      </div>
                      }
                      
              </div>
              {
                product.has_offers &&
                <div id="offers">
                  <H1 className={`mt-4 mb-2 font-bold d-s:font-medium ${window.location.href.includes("offers") ? 'text-red-700' : ''}`}>{'Оберіть варіант товару:'}</H1>
                  <div className='h-[1px] bg-light_gray'></div>
                  <div className='flex flex-row gap-2 items-center my-2'>
                    <P>Від</P>
                    <H2 className='font-bold'>{`${product.min_price} грн`}</H2>
                    <P>до</P>
                    <H2 className='font-bold'>{`${product.max_price} грн`}</H2>
                  </div>
                  <div className='flex flex-col gap-2 max-h-[190px] overflow-y-auto'>
                    {
                      availableOffers.map((offer: any) => {
                        if(offer.quantity !== 0){
                          return (
                            <button className='flex flex-row gap-2 bg-light_gray font-bold rounded-lg p-2 items-center text-left' onClick={() => {
                              setModalProduct(offer)
                              setActiveNav(true)
                            }}>
                              <img src={offer.thumbnail_url} className='h-[60px] w-[60px] bg-white p-1 rounded-lg'></img>
                              <P>{`${product.name} ${offer.properties.map((property: {name: string, value: string}) => {return ` ${property.value}`})}. ${offer.price} грн`}</P>
                            </button>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              }
            </div>
          
          
        </div>
        }
      
      
        <div className='flex flex-col gap-2 my-4'>
          <H2 className='font-bold'>Опис:</H2>
          <div className='h-[1px] bg-light_gray'></div>
          <P className={`tracking-wider whitespace-pre-line break-words ${!showAllDescription && 'line-clamp-6'}`}>{product.description}</P>
          {
            !showAllDescription &&
            <div onClick={() => setShowAllDescrition(true)}>
              <H2 className='underline'>Показати увесь опис</H2>
            </div>
          }
        </div>
      {
        !product.has_offers &&
        <Button disabled={product.quantity > 0 ? false : true} text={product.has_offers ? 'Перейти до товару' : "Додати у кошик"} variant="default" className='mb-10 d-s:w-fit d-s:px-10 d-s:py-6 d-s:self-center' onClick={() => {
          console.log(product)
            setModalProduct(product)
            setActiveNav(true)
          
      }}></Button>
      }
      {
        product.has_offers &&
        <Link href={'#offers'} aria-disabled={product.quantity > 0 ? false : true} className='mb-10 text-center font-bold py-2 px-4 rounded-full bg-main text-white d-s:w-fit d-s:px-10 d-s:py-6 d-s:self-center' onClick={() => {
          
          
      }}>{product.has_offers ? 'Перейти до товару' : "Додати у кошик"}</Link>
      }
    </div>
  )
}