const { configureStore } = require('@reduxjs/toolkit');

import ProductReducer from '../slices/ProductSlice'
import WishListReducer from '../slices/WishListSlice'
import AddToCartListReducer from '../slices/AddToCartSlice'
import CartReducer from '../slices/CartSlice'
import AddressReducer from '../slices/AddressSlice'

export const store = configureStore({
    reducer: {
        productState: ProductReducer,
        wishListState: WishListReducer,
        addToCartListState: AddToCartListReducer,
        cartListState: CartReducer,
        addressState: AddressReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
