import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        history: {
            data: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getHistoryStart: (state) => {
            state.history.isFetching = true;
        },
        getHistorySuccess: (state, action) => {
            state.history.isFetching = false;
            state.history.data = action.payload;
        },
        getHistoryError: (state) => {
            state.history.isFetching = false;
            state.history.error = true;
        },
    },
});
export const { getHistoryError, getHistoryStart, getHistorySuccess } = userSlice.actions;

export default userSlice.reducer;
