import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getDiscounts = createAsyncThunk('getDiscounts', async () => {
    const discountId='658d33e46aa2c1dd62a384ea'
    const { data } = await axios.get(`/api/foodItems/get-one/discount/${discountId}`)
    return data
})

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
          discount:{}
    },
    reducers: {
        updateDiscount: (state, action) => {
            state.discount.figure = action.payload.figure
            state.discount.description = action.payload.description
            state.discount.image = action.payload.image

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDiscounts.fulfilled, (state, action) => {
            state.discount.figure = action.payload.figure
            state.discount.description = action.payload.description
            state.discount.image = action.payload.image
        })
    },
})
export const { updateDiscount } = discountSlice.actions
export default discountSlice.reducer