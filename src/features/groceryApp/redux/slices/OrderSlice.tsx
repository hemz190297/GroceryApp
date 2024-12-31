import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addOrders(state, action) {
            state.data.push(action.payload);
        },
    },
})
export const { addOrders } = OrderSlice.actions;
export default OrderSlice.reducer;