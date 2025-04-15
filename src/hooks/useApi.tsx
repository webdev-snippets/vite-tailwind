import { useMemo } from 'react';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useToken } from '@/context/authContext'; 

const useAxios = (): AxiosInstance => {
    const { token } = useToken();

    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000',
        });
        if (token) {
            instance.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
        } else {
            delete instance.defaults.headers.common['Authorization'];
        }


        instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                console.log(error.toJSON());
                return Promise.reject(error);
            }
        );

        return instance;
    }, [token]); 
    return axiosInstance;
};
export default useAxios;
