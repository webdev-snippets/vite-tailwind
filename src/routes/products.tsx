import { useCallback, useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Product } from "@/types/backend";
import { Card } from "@/components/card";



export default function ProductPage() {
    const [response, setResponse] = useState<Product[]>([{
        title: 'Unknown',
        description: 'Unknown',
        price: 99,
        tags: ["Unknown"],
        id: 'Error'
    }])
    const api = useApi()
    const fetchData = useCallback(async () => {
        try {
            const response = await api.get<Product[]>('/product');
            setResponse(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [api])
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return(
        <div className=" rounded-xl p-2">
            <div className="flex flex-row gap-3">
            {
                response?.map((_) => {
                    return(
                        <Card  key={_.id} className="max-w-100" title={_.title} tags={_.tags} imageSrc={_.image_uri!} price={_.price}>
                        {_.description}
                    </Card>
                    )
                })
            }
            </div>
        </div>
    )
}