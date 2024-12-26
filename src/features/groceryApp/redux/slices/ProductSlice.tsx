const { createSlice } = require('@reduxjs/toolkit');

const ProductSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addProducts(state = initialState, action) {
            state.data = action.payload;
        },
    },
});

export const { addProducts } = ProductSlice.actions;
export default ProductSlice.reducer; 
