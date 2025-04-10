import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useToken } from '@/context/authContext'; // Adjust the import path as necessary

const useAxios = (): AxiosInstance => {
    const { token } = useToken();

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
        });
        if (token) {
            instance.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
        } else {
            delete instance.defaults.headers.common['Authorization'];
        }
        return instance;
    }, [token]); // Only recreate axios instance when the token changes
    return axiosInstance;
};
export default useAxios;
