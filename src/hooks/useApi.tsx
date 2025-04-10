import { useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useToken } from '@/context/authContext'; // Adjust the import path as necessary

const useAxios = (): AxiosInstance => {
    const { token } = useToken();
    console.log('hit me')
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
    });

    useEffect(() => {
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    }, [token, axiosInstance]);

    return axiosInstance;
};

export default useAxios;