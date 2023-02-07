import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { logoutSuccess } from './Redux/authSlice';

export const createAxios = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let data = new Date();
            const decodedToken = jwt_decode(user.access_token);
            if (decodedToken.exp < data.getTime() / 1000) {
                dispatch(logoutSuccess());
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
