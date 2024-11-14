'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface productCart {
    cart: Array<any>
}

const initialState: productCart = {
    cart: []
}

export const productCart = createSlice({
    name: 'productCart',
    initialState,
    reducers: {
        addItem: (state, action: {payload: {item: any, quantity: number}}) => {
            let newArray = JSON.parse(JSON.stringify(state.cart))

            const productIndexInCart = newArray.findIndex((cartItem: any) => cartItem.item.id === action.payload.item.id)

            try{
                if(productIndexInCart === -1){
                    state.cart = [...state.cart, action.payload]
                } else {
                    if(action.payload.quantity + newArray[productIndexInCart].quantity > newArray[productIndexInCart].item.quantity){
                        throw new Error('Перебільшено можливу кількість, перевірьте кошик')
                    } else {
                        newArray[productIndexInCart].quantity = newArray[productIndexInCart].quantity + action.payload.quantity
                        state.cart = newArray
                    }
                }
            } catch(e: any){
                throw new Error(e.message)
            }

            
            
        
        },
        incrementItem: (state, action) => {

            let newArray = JSON.parse(JSON.stringify(state.cart))

            newArray[action.payload.index].quantity = newArray[action.payload.index].quantity + 1

            state.cart = newArray
        },
        decrementItem: (state, action: {payload: {index: number}}) => {

            let newArray = JSON.parse(JSON.stringify(state.cart))

            newArray[action.payload.index].quantity = newArray[action.payload.index].quantity - 1

            state.cart = newArray
        },
        removeItem: (state, action: {payload: {index: number}}) => {
            let newArray = JSON.parse(JSON.stringify(state.cart))

            newArray.splice(action.payload.index, 1)

            state.cart = newArray
        },
        clearCart: (state) => {
            state.cart = []
        }
    }
})

export const { addItem, decrementItem, removeItem, incrementItem, clearCart } = productCart.actions;

export default productCart.reducer;