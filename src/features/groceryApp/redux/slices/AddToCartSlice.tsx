import { PayloadAction } from "@reduxjs/toolkit";

const { createSlice } = require('@reduxjs/toolkit');

const CartListSlice = createSlice({
    name: 'cartList',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addToCartList(state = initialState, action) {
            let isExist = false;
            let cartList = state.data;
            cartList.map(item => {
                if (item.id == action.payload.id) {
                    isExist = true;
                }
            })
            if (!isExist) {
                cartList.push(action.payload)
            }
            state.data = cartList;
        },
        addCartProduct: (state, action: initialState) => {
            const existingProduct = state.data.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                state.data.push({ ...action.payload, qty: 1 });
            }
        },
        reduceCartProduct: (state, action: initialState) => {
            const product = state.data.find(item => item.id === action.payload.id);
            if (product) {
                product.qty > 1 ? (product.qty -= 1) : (state.data = state.data.filter(item => item.id !== action.payload.id));
            }
        },
        removeCartProduct(state, action: PayloadAction<number>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
    }
});

export const { addToCartList, addCartProduct, reduceCartProduct, removeCartProduct } = CartListSlice.actions;
export default CartListSlice.reducer;



