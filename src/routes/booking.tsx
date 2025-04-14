import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import useApi from "@/hooks/useApi";
import { Booking } from "@/types/backend";
import { TextInput } from "@/components/textInput";
import { Button } from "@/components/button";
import axios, { AxiosError } from "axios";
import { DateInput } from "@/components/dateInput";
import { Select, SelectItemProps } from "@/components/select";

const loginSchema = z.object({
    time: z.coerce.string(),
    location: z.string().nonempty(),
    notes: z.string(),
    booking_type: z.enum(['installation', 'consultation'])
});

type LoginSchemaType = z.infer<typeof loginSchema>;


export default function BookingPage() {
    const api = useApi()

    const { register, handleSubmit,control, formState: { errors, isValid } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            time: '',
            location: "",
            notes: "",
            booking_type: 'consultation'
        }
    })

    const onSubmit = async (data: LoginSchemaType) => {

        console.log(data);

        try {
            const response = await api.post<Booking>("/booking", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response.data)
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

    const selectItems: SelectItemProps[] = [
        {
            value: 'consultation',
            action: 'secondary'
        },
        {
            value: 'installation',
            action: 'secondary'
        }
    ]

    return (
        <>
            <div className="bg-surface-container-high text-on-surface rounded-md p-2 m-2">
                <h1 className="text-lg text-semibold">Booking</h1>
                <h2>add a booking to schedule an appoinetment with our team</h2>
            </div>
            <form className="bg-surface-container-highest" onSubmit={handleSubmit(onSubmit)}>
                <DateInput required label='time' action={errors.time ? 'error' : 'primary'} {...register('time', { required: true })} />
                {
                    errors.time && <span>{errors.time?.message}</span>
                }

                <TextInput required label='location' action={errors.location ? 'error' : 'primary'} {...register('location', { required: true })} />
                {
                    errors.location && <span>{errors.location?.message}</span>
                }
                <TextInput label='notes' action={errors.notes ? 'error' : 'secondary'} {...register('notes')} />
                {
                    errors.notes && <span>{errors.notes?.message}</span>
                }
                <Controller name="booking_type" control={control} render={({ field }) => { // have to use hack here as onChange is passed to onValueChange internally so we do it in the controller
                    return (
                        <Select required selectItems={selectItems} onValueChange={field.onChange} {...field} >
                            <Button label={field.value || 'Booking Type'} />
                        </Select>
                    )
                }} />
                {
                    errors.notes && <span>{errors.notes?.message}</span>
                }
                <Button type='submit' label="Confirm" disabled={!isValid} />
            </form>
        </>
    )

}