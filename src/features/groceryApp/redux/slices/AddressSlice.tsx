import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
    name: 'address',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        addAddress(state, action) {
            state.data.push(action.payload)
        },
        removeAddress(state, action) {
            let removeadd = state.data.filter((item) => {
                return item.id !== action.payload;
            });
            state.data = removeadd
        },
        editAddress(state, action) {
            state.data.forEach(item => {
                if (item.id === action.payload.id) {
                    item.state = action.payload.state;
                    item.city = action.payload.city;
                    item.pincode = action.payload.pincode;
                    item.type = action.payload.type;
                }
            });
        }
    },
})
export const { addAddress, removeAddress, editAddress } = AddressSlice.actions;
export default AddressSlice.reducer;