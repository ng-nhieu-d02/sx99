import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        info: {
            infoUser: null,
            isFetching: false,
            error: false,
            success: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginError: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerError: (state) => {
            state.register.isFetching = false;
            state.register.success = false;
            state.register.error = true;
        },
        infoStart: (state) => {
            state.info.isFetching = true;
        },
        infoSuccess: (state, action) => {
            state.info.isFetching = false;
            state.info.success = true;
            state.info.error = false;
            state.info.infoUser = action.payload;
        },
        infoError: (state) => {
            state.info.isFetching = false;
            state.info.success = false;
            state.info.error = true;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.login.success = false;
            state.info.infoUser = null;
            state.logout.error = false;
        },
        logoutError: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginError,
    registerStart,
    registerError,
    registerSuccess,
    infoStart,
    infoSuccess,
    infoError,
    logoutStart,
    logoutSuccess,
    logoutError,
} = authSlice.actions;
export default authSlice.reducer;
