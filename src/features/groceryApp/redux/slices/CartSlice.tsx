import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a single cart product
export interface CartProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    qty: number;
}

interface CartState {
    data: CartProduct[];
}

const initialState: CartState = {
    data: [],
};


const CartSlice = createSlice({
    name: 'cart',
    initialState,
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
        addCartProduct: (state, action: PayloadAction<CartProduct>) => {
            const existingProduct = state.data.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                state.data.push({ ...action.payload, qty: 1 });
            }
        },
        reduceCartProduct: (state, action: PayloadAction<{ id: number }>) => {
            const product = state.data.find(item => item.id === action.payload.id);
            if (product) {
                product.qty > 1 ? (product.qty -= 1) : (state.data = state.data.filter(item => item.id !== action.payload.id));
            }
        },
        removeCartProduct(state, action: PayloadAction<number>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
    },
});

export const { addCartProduct, reduceCartProduct, removeCartProduct } = CartSlice.actions;
export default CartSlice.reducer;
