const { createSlice } = require('@reduxjs/toolkit');

const WishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addWishList(state, action) {
            let productWish = state.data;
            productWish.push(action.payload);
            state.data = productWish;
        },
    },
});

export const { addWishList } = WishListSlice.actions;
export default WishListSlice.reducer;