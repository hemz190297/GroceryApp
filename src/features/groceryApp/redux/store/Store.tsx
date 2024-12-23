const { configureStore } = require('@reduxjs/toolkit');
import ProductReducer from '../slices/ProductSlice' // Adjust path as necessary
import WishListReducer from '../slices/WishListSlice'
import AddToCartListReducer from '../slices/AddToCartSlice'
import CartListReducer from '../slices/AddToCartSlice'

export const store = configureStore({
    reducer: {
        productState: ProductReducer,
        wishListState: WishListReducer,
        addToCartListState: AddToCartListReducer,
        cartListState: CartListReducer,
    },
});
