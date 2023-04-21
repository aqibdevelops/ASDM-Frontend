import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: { firstName: '' },
    reducers: {
        setFirstName(state, action) {
            state.firstName = action.payload
        }
    }
})
export const actions = counterSlice.actions;
const store = configureStore({
    reducer: counterSlice.reducer
})
export default store;
