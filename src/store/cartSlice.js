import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {cartItems} from '../cartItems';
import axios from 'axios';
import { openModal } from "./closeModal";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: 
        //cartItems
        []
    ,
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    // () => {
    //     return fetch(url)
    //     .then(
    //         res => res.json()
    //     )
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }
    async (_, thunkAPI) => {
        try {
            const res = await axios(url)
            //console.log(thunkAPI)
            //console.log(thunkAPI.getState())
            //thunkAPI.dispatch(openModal())
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!')
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state,action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount +1;
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount -1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
              amount += item.amount;
              total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getCartItems.pending] : (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled] : (state,action) => {
            //console.log(action)
            state.isLoading =false;
            state.cartItems= action.payload
        },
        [getCartItems.rejected] : (state,action) => {
            console.log(action)
            state.isLoading = false;
        },
    }
})


//console.log(cartSlice)
export const {
    clearCart, 
    removeItem, 
    increase, 
    decrease,
    calculateTotals
} = cartSlice.actions;



export default cartSlice.reducer;