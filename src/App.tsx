import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Status } from "@/types/backend";

export default function App() {
    const [response, setResponse] = useState<Status>({status: 'help'})

    const api = useApi()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Status>('/status'); // Replace with your endpoint
                console.log('response: ', response);
                setResponse(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [api]);
    return(
        <div className="bg-primary">
            hello
            {response?.status}
        </div>
    )
}