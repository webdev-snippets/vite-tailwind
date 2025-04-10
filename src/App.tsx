import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Status } from "@/types/backend";
import { NavDrawer } from "./components/navDrawer";
import { Button } from "./components/button";

const items = [
    { label: "Home", route: "/" },
    { label: "Profile", route: "/profile" },
    { label: "Settings", route: "/settings" },
  ] 

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
            <NavDrawer items={items} pathname="/">
                <Button label="hello" />
            </NavDrawer>
            hello
            {response?.status}
        </div>
    )
}