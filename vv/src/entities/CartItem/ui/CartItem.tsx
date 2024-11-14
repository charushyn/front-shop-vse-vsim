import { Product } from "@/shared/types/Product"
import { CountBar, H2, P } from "@/shared/ui"

export default function CartItem({product, funcAdd, funcMinus, funcRemove} : {product: {item: Product, quantity: number}, funcAdd: () => void, funcMinus: () => void, funcRemove: () => void}){
    return(
        <div className="flex flex-col items-center border-b pb-4 gap-4 mb-4">
                            <img src={product.item.thumbnail_url} className="w-[100px] h-[100px] object-contain t-l:h-[400px] t-l:w-fit"></img>
                            <P className=" text-center my-2 font-bold">{product.item.name}</P>
                            <P>{`${product.item.quantity} шт. на складі`}</P>
                            <CountBar count={product.quantity} funcAdd={funcAdd} funcMinus={funcMinus}></CountBar>
                        </div>
    )
}