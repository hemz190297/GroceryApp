const { createSlice } = require('@reduxjs/toolkit');

const CartListSlice = createSlice({
    name: 'cartList',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addToCartList(state, action) {
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
        }
    }
});

export const { addToCartList } = CartListSlice.actions;
export default CartListSlice.reducer; 