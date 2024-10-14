'use client'

import { Button, H1, CustomLink } from '@/shared/ui'
import { getCategories, getProducts } from '@/shared/utils/api/requests'
import { useParams } from 'next/navigation'

import Link from 'next/link'

import { ProductCardMini } from '@/entities'

import {P} from '@/shared/ui'

import React from 'react'
 
export default function CategoryPage() {
  const params = useParams()

  const [products, setProducts] = React.useState(Array<any>)
  const [category, setCategory] = React.useState(Object)
  const [categorysChildren, setCategorysChildren] = React.useState(Array<any>)
  const [isProducts, setIsProducts] = React.useState(true)

  React.useEffect(() => {

    let allIDs:Array<number> = []

    const req = async () => {

      
      const category = (await getCategories({categoriesID: [+params.categoryID]}))[0]
      const products = await getProducts({categoriesID: [+params.categoryID]})
      const categoryChildren:Array<any> = await getCategories({parentID: [+params.categoryID]})

      setCategory(category)
      setCategorysChildren(categoryChildren)
      if(products.length === 0 && categoryChildren.length === 0){
        setIsProducts(false)
      }
      setProducts(products.length === 0 ? await getProducts({categoriesID: [...categoryChildren.map((item:{id:number}) => {return item.id})]}) : products)



    }






    req()
  }, [])
  
  return (
    <div className='flex flex-col gap-2 px-4 min-h-svh'>
      
      <H1 text={`Категорія: ${category.name ? category.name : ''}`}></H1>
      {
        categorysChildren &&
          <div className='flex flex-row gap-2 mt-2 overflow-auto'>
            {
              categorysChildren.map((category: any) => {
                return (
                  <Link href={`/${category.id}/`} key={category.name} className="border py-4 min-w-[70%] text-center">
                    <P text={category.name}></P>
                  </Link>
                )
              })
            }
          </div>
      }
      {
        !isProducts &&
        <div className='flex flex-col border bg-light_gray px-2 py-4 text-center gap-2'>
          <P text='Товарів на жаль немає...'></P>
          <CustomLink variant='default' text='Повернутись на головну' href={'/'}></CustomLink>
        </div>
      }
      {
        products &&
        <div className="flex flex-col gap-2">
                {
                    products.map((product: any) => {
                        if(product.quantity === 0){ return }
                        return(
                                <ProductCardMini product={product} action="button"></ProductCardMini>
                        )
                    })
                }
            </div>
      }
    </div>
  )
}