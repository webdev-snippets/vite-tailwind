import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Status } from "@/types/backend";
import { Button } from "@/components/button";



export default function StatusPage() {
    const [response, setResponse] = useState<Status>({status: 'help'})
    const api = useApi()
    const fetchData = useCallback(async () => {
        try {
            const response = await api.get<Status>('/status');
            setResponse(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [api])
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClick = () => {
        fetchData()
    }
    return(
        <div className="bg-primary-container text-on-primary-container">
            {response?.status}
            <Button label="refresh" onClick={handleClick} />
        </div>
    )
}