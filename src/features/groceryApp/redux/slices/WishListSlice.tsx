const { createSlice } = require('@reduxjs/toolkit');

const WishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addWishList(state, action) {
            const exists = state.data.some(item => item.id === action.payload.id);
            if (!exists) {
                state.data.push(action.payload);
            }
        },
        removeWishList(state, action) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
    },
});

export const { addWishList, removeWishList } = WishListSlice.actions;
export default WishListSlice.reducer;
