import axios from 'axios';
import {
    infoError,
    infoStart,
    infoSuccess,
    loginError,
    loginStart,
    loginSuccess,
    logoutError,
    logoutStart,
    logoutSuccess,
    registerError,
    registerStart,
    registerSuccess,
} from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth/login', user);
        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            dispatch(infoStart());
            const res2 = await axios.post(
                'http://127.0.0.1:8000/api/auth/me',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${res.data.access_token}`,
                    },
                },
            );
            dispatch(infoSuccess(res2.data));
            return res.status;
        }
        // navigate('/profile');
    } catch (err) {
        dispatch(loginError());
        return err.response.status;
    }
};

export const getInfoUser = async (user, dispatch, axiosJWT, money) => {
    try {
        const res = await axiosJWT.post(
            'http://127.0.0.1:8000/api/auth/me',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.access_token}`,
                },
            },
        );
        dispatch(infoSuccess(res.data));
        if (res.data.money > money) {
            return res.data.money - money;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
};

export const logoutUser = async (user, dispatch, navigate, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            'http://127.0.0.1:8000/api/auth/logout',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.access_token}`,
                },
            },
        );
        dispatch(logoutSuccess());
        return 200;
    } catch (error) {
        dispatch(logoutSuccess());
        return 401;
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/auth/register', user);
        dispatch(registerSuccess());
        return res.status;
    } catch (error) {
        dispatch(registerError());
        return error.response.status;
    }
};

// api/history/bet
export const UserBet = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('http://127.0.0.1:8000/api/history/bet', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        return error;
    }
};
export const huyDon = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete(
            `http://127.0.0.1:8000/api/history/bet/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return res;
    } catch (error) {
        return error;
    }
};

export const getHistoryBet = async (accessToken, axiosJWT, url) => {
    try {
        const res = await axiosJWT.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const napTien = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('http://127.0.0.1:8000/api/history/payments', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const HistoryPayment = async (accessToken, axiosJWT, url) => {
    try {
        const res = await axiosJWT.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res;
    } catch (error) {
        return error;
    }
};
export const getBanking = async (user, axiosJWT) => {
    try {
        const res = await axiosJWT.get('http://127.0.0.1:8000/api/history/banking', {
            headers: {
                Authorization: `Bearer ${user}`,
            },
        });
        return res;
    } catch (error) {
        return 401;
    }
};
