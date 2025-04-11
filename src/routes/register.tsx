import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import useApi from "@/hooks/useApi";
import { User } from "@/types/backend";
import { TextInput } from "@/components/textInput";
import { Button } from "@/components/button";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const loginSchema = z.object({
    username: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().nonempty().min(8),
});

type LoginSchemaType = z.infer<typeof loginSchema>;



export default function LoginPage() {
    const api = useApi()
    const [res, setRes] = useState<User>()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            email: '',
            password: ""
        }
    })
    
const onSubmit = async (data: LoginSchemaType) => {


    // console.log(newData);

    try {
        const response = await api.post<User>("/user", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRes(()=> response.data )

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // AxiosError specific handling
            const axiosError = error as AxiosError;
            
            // Log the error response or message
            console.error('API request failed:', axiosError.response?.data || axiosError.message);

            // Handle specific cases like 401 (unauthorized), 400 (bad request), etc.
            if (axiosError.response) {
                switch (axiosError.response.status) {
                    case 400:
                        console.error('Invalid request data. Please check your input.');
                        break;
                    case 401:
                        console.error('Unauthorized. Please check your credentials.');
                        break;
                    case 500:
                        console.error('Server error. Please try again later.');
                        break;
                    default:
                        console.error('An unexpected error occurred.');
                }
            }
        } else {
            // Handle non-axios errors (e.g., network issues, etc.)
            console.error('Unexpected error:', error);
            console.error('An unexpected error occurred. Please try again later.');
        }
    }
};

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput required label='username' action={errors.username ? 'error' : 'primary'} {...register('username', { required: true })} />
                {
                    errors.username && <span>{errors.username?.message}</span>
                }
                <TextInput required label='email' action={errors.username ? 'error' : 'tertiary'} {...register('email', { required: true })} />
                {
                    errors.email && <span>{errors.email?.message}</span>
                }

                <TextInput required label='password' type="password" action={errors.username ? 'error' : 'primary'} {...register('password', {required: true})} />
                {
                    errors.password && <span>{errors.password?.message}</span>
                }

                <Button type='submit' label="Login" />
            </form>

            {
                res && <div>
                    <p>
                        new user: {res.username}
                    </p>
                </div>
            }
        </>
    )

}