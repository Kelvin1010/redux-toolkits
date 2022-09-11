import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import modalReducer from './closeModal'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    }
})