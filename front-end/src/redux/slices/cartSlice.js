import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const addToCart = createAsyncThunk('addToCart', async (productData) => {
    console.log("productData: "+JSON.stringify(productData))
    const { id, quantity,size, instructions,sameProduct } = productData
    const { data } = await axios.get(`/api/foodItems/get-one/${id}`)
    console.log("productData: "+JSON.stringify(data))

    const productAdded = {
        productId: data._id,
        name: data.name,
        image: data.image ?? null,
        size:size,
        quantity: quantity,
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
            console.log("state.cartItems" + state.cartItems)
            console.log("state.itemsCount" + state.itemsCount)
            console.log("state.cartSubtotal" + state.cartSubtotal)
            console.log("action.payload" + JSON.stringify(action.payload))
            state.cartItems = state.cartItems.filter((item) => {return item.productId !== action.payload.productId && item.size !== action.payload.size})
            state.itemsCount = state.itemsCount - action.payload.quantity
            state.cartSubtotal = state.cartSubtotal - (action.payload.size.price * action.payload.quantity)
        },
        resetCart:(state)=>{
            document.location.href="/foodItem-list"
            localStorage.removeItem("cart")
            state.cart={}

        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("state.cartItems" + state.cartItems)
            console.log("state.itemsCount" + state.itemsCount)
            console.log("state.cartSubtotal" + state.cartSubtotal)
            console.log("action.payload" + action.payload)
            const { productAdded,sameProduct } = action.payload

            const productAlreadyExistsInState = state.cartItems.find((product) => {
                return (product.productId === productAdded.productId && product.size.value === productAdded.size.value)
            })

            if (productAlreadyExistsInState) {
                console.log("Hi I am here2")
                state.itemsCount = 0
                state.cartSubtotal = 0
                state.cartItems.map((item) => {
                    if (item.productId === productAlreadyExistsInState.productId && sameProduct) {
                        item.quantity = Number(productAdded.quantity)
                    }
                    else if (item.productId === productAlreadyExistsInState.productId) {
                        item.quantity += Number(productAdded.quantity)
                    }
                    state.itemsCount += Number(item.quantity)
                    state.cartSubtotal += (Number(item.quantity) * Number(productAdded.size.price))
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


