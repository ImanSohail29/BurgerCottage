import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const addToCart = createAsyncThunk('addToCart', async (productData) => {
    console.log("productData: "+JSON.stringify(productData))
    const { id, quantity,size, instructions,sameProduct,selectedAddOns } = productData
    const { data } = await axios.get(`/api/foodItems/get-one/${id}`)
    console.log("productData: "+JSON.stringify(data))
    console.log("sameProduct: "+sameProduct)

    const productAdded = {
        productId: data._id,
        name: data.name,
        image: data.image ?? null,
        size:size,
        quantity: quantity,
        selectedAddOns:selectedAddOns
    }
    return { productAdded, sameProduct }
})
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        itemsCount: 0,
        cartSubtotal: 0,
    },
    reducers: {
        removeFromCart: (state, action) => {
            console.log("state.cartItems" + state.cartItems.selectedAddOns)
            console.log("state.itemsCount" + state.itemsCount)
            console.log("state.cartSubtotal" + state.cartSubtotal)
            console.log("action.payload: " + JSON.stringify(action.payload))
            state.cartItems.splice(action.payload.index,1)
            state.itemsCount = state.itemsCount - action.payload.quantity
            state.cartSubtotal = state.cartSubtotal - (action.payload.size.price * action.payload.quantity)
        },
        resetCart:(state)=>{
            return {
                cartItems: [],
                itemsCount: 0,
                cartSubtotal: 0,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("state.cartItems" +JSON.stringify(state.cartItems))
            console.log("state.itemsCount" + state.itemsCount)
            console.log("state.cartSubtotal" + state.cartSubtotal)
            console.log("action.payload" + action.payload)
            const { productAdded,sameProduct } = action.payload

            const productAlreadyExistsInState = state.cartItems.find((product) => {
                return (product.productId === productAdded.productId && product.size.value === productAdded.size.value && JSON.stringify(product.selectedAddOns) === JSON.stringify(productAdded.selectedAddOns))
            })
            console.log("productAlreadyExistsInState : "+JSON.stringify(productAlreadyExistsInState))
            if (productAlreadyExistsInState) {
                console.log("Hi I am here2")
                state.itemsCount = 0
                state.cartSubtotal = 0
               
                state.cartItems.map((item) => {
                    const flag1=item.productId === productAlreadyExistsInState.productId 
                    const flag2=sameProduct && item.size.value === productAdded.size.value 
                    const flag3=JSON.stringify(item.selectedAddOns) === JSON.stringify(productAdded.selectedAddOns)
                    console.log("flag : "+flag1+flag2+flag3)
                    console.log("product Added price: "+productAdded.size.price)
                    console.log("product Added value: "+productAdded.size.value)
                    console.log("product Added value: "+productAdded.quantity)
                    if ((item.productId === productAlreadyExistsInState.productId) && sameProduct && (item.size.value === productAdded.size.value)  && (JSON.stringify(item.selectedAddOns) === JSON.stringify(productAdded.selectedAddOns))) {
                        console.log("Hi I am here3")
                        item.quantity = Number(productAdded.quantity)
                    }else if (item.productId === productAlreadyExistsInState.productId && (item.size.value === productAdded.size.value)  && (JSON.stringify(item.selectedAddOns) === JSON.stringify(productAdded.selectedAddOns))){
                        console.log("Hi I am here5")
                        item.quantity += Number(productAdded.quantity)
                    }
                    state.itemsCount += Number(item.quantity)
                    state.cartSubtotal += (Number(item.quantity) * Number(item.size.price))
                })
            }
            else {
                state.itemsCount += Number(productAdded.quantity)
                state.cartSubtotal += Number(productAdded.quantity) * Number(productAdded.size.price)
                state.cartItems = [...state.cartItems, productAdded]

            }
        })
        builder.addCase(addToCart)

    },
})
export const { removeFromCart,resetCart } = cartSlice.actions
export default cartSlice.reducer


