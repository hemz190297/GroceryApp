const { createSlice } = require('@reduxjs/toolkit');

const CartSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        cardProducts(state, action) {
            state.data = action.payload;
        },
    },
});

export const { cardProducts } = CartSlice.actions;
export default CartSlice.reducer; 
