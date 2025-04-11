import { CatIcon, HomeIcon, LeafyGreenIcon, LockKeyholeIcon } from "lucide-react";
import { NavItemProps } from "./components/navItem";
import StatusPage from "./routes/status";
import { NavDrawer } from "./components/navDrawer";
import { Button } from "./components/button";
import ProductPage from "./routes/products";
import LoginPage from "./routes/login";


export default function App() {
    const navItems: NavItemProps[] = [
        {
            label: "home",
            route: "/",
            action: "primary",
            icon: HomeIcon
        },
        {
            label: "status",
            route: "/status",
            action: 'tertiary',
            icon: CatIcon
        },
        {
            label: "login",
            route: "/login",
            action: 'primary',
            icon: LockKeyholeIcon
        },
        {
            label: 'products',
            route: '/products',
            action: 'secondary',
            icon: LeafyGreenIcon
        }
    ]
    return(
        <>
        <div className="bg-surface-container-low rounded-md flex-row flex m-1 p-2 gap-3">
            <div>
                <NavDrawer pathname={location.pathname} items={navItems} >
                    <Button label='navigation' /> 
                </NavDrawer>
            </div>
            <div className="self-center justify-self-center text-2xl items-center text-on-primary-container bg-primary-container p-3 rounded-full">
                <h1>Rosla Technologies</h1>
            </div>
            <div className="self-center bg-secondary-container p-3 text-xl text-on-secondary-container rounded-full">
                <h2>We are a green energy company focused on sustainability</h2>
            </div>
        </div>
            <LoginPage />
        <div>
            <div className="bg-tertiary-container text-on-tertiary-container flex flex-row mt-3 p-2">
                <div className="bg-tertiary text-on-tertiary rounded-md p-2 m-3">
                    <h1>
                        this is the footer
                    </h1>
                </div>

            </div>
                
        </div>
        </>
    )
}