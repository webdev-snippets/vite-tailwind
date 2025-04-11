import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Health } from "@/types/backend";
import { Button } from "@/components/button";



export default function StatusPage() {
    const [response, setResponse] = useState<Health>({status: 'Failing', debug_level: 'Unknown', issuer: "Unknown", db_url: 'Unknown', expire_time: 99})
    const api = useApi()
    const fetchData = useCallback(async () => {
        try {
            const response = await api.get<Health>('/health');
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
        <div className="bg-primary-container rounded-xl p-2 text-on-primary-container">
            {
                Object.entries(response).map((_) => {
                    return(
                        <div key={_[0]} className="bg-primary text-on-primary rounded-md p-1 m-1">
                            {_[0]}: {_[1]}
                        </div>
                    )
                })
            }
            <Button label="refresh" onClick={handleClick} />
        </div>
    )
}