const { configureStore } = require('@reduxjs/toolkit');
import ProductReducer from '../slices/ProductSlice' // Adjust path as necessary

export const store = configureStore({
    reducer: {
        productState: ProductReducer, // Make sure the key matches your state structure
    },
});
