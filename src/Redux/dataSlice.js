import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
        setData: (state, action) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
})

export const { setData } = dataSlice.actions

export default dataSlice.reducer
