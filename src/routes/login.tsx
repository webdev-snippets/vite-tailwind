import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useToken } from "@/context/authContext";
import useApi from "@/hooks/useApi";
import { Token } from "@/types/backend";
import { TextInput } from "@/components/textInput";
import { Button } from "@/components/button";
import axios, { AxiosError } from "axios";

const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty().min(8),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

interface StrictLoginSchema extends LoginSchemaType {
    grant_type: 'password'
    scope: string
}


export default function LoginPage() {
    const { setToken } = useToken()
    const api = useApi()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    
const onSubmit = async (data: LoginSchemaType) => {
    const newData: StrictLoginSchema = {
        ...data,
        grant_type: 'password',
        scope: 'user user:write booking booking:write'
    };

    // console.log(newData);

    try {
        const response = await api.post<Token>("/auth/token", newData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        setToken(response.data);
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
                        alert('Invalid request data. Please check your input.');
                        break;
                    case 401:
                        alert('Unauthorized. Please check your credentials.');
                        break;
                    case 500:
                        alert('Server error. Please try again later.');
                        break;
                    default:
                        alert('An unexpected error occurred.');
                }
            }
        } else {
            // Handle non-axios errors (e.g., network issues, etc.)
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred. Please try again later.');
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

                <TextInput required label='password' type="password" action={errors.username ? 'error' : 'primary'} {...register('password', {required: true})} />
                {
                    errors.password && <span>{errors.password?.message}</span>
                }

                <Button type='submit' label="Login" />
            </form>
        </>
    )

}