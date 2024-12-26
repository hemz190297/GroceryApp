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

// Define the state type
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
        addCartProduct: (state = initialState, action: PayloadAction<CartProduct>) => {
            const existingProduct = state.data.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                state.data.push({ ...action.payload, qty: 1 });
            }
        },
        reduceCartProduct: (state = initialState, action: PayloadAction<{ id: number }>) => {
            const product = state.data.find(item => item.id === action.payload.id);
            if (product) {
                if (product.qty > 1) {
                    product.qty -= 1;
                } else {
                    state.data = state.data.filter(item => item.id !== action.payload.id);
                }
            }
        },
    },
});

export const { addCartProduct, reduceCartProduct } = CartSlice.actions;
export default CartSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type userProp = {
//     user: Partial<any> | null;
// };

// const initialState: userProp = {
//     user: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setLocation: (state = initialState, action: PayloadAction<any>) => {
//             state.user = action.payload;
//         },
//     },
//     extraReducers: builder => { },
// });

// export const { setLocation } = userSlice.actions;

// export default userSlice.reducer;
// ceb - dfsu - byd