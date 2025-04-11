import { CatIcon, HomeIcon, LeafyGreenIcon, LockKeyholeIcon } from "lucide-react";
import { NavItemProps } from "./components/navItem";
import { NavDrawer } from "./components/navDrawer";
import { Button } from "./components/button";
import { useState, useEffect, Suspense } from "react";


export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const [PageComponent, setPageComponent] = useState<React.ComponentType | null>(null)
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


  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNav = (item: NavItemProps) => {
    const route = item.route
    if (route !== window.location.pathname) {
      history.pushState({}, '', route)
      setCurrentPath(route)
    }
  }

  useEffect(() => {
    // convert route to component path
    const loadPage = async () => {
      const routeName = currentPath === '/' ? 'home' : currentPath.slice(1)
      try {
        const module = await import(`@/routes/${routeName}.tsx`)
        setPageComponent(() => module.default)
      } catch (e) {
        console.error('Page not found:', routeName, e)
        const NotFound = await import(`@/routes/notFound.tsx`)
        setPageComponent(() => NotFound.default)
      }
    }

    loadPage()
  }, [currentPath])
    return(
        <>
        <div className="bg-surface-container-low rounded-md flex-row flex m-1 p-2 gap-3">
            <div>
                <NavDrawer pathname={location.pathname} items={navItems} onItemClick={handleNav}>
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
        <Suspense fallback={<div>Loading...</div>}>
          {PageComponent && <PageComponent />}
        </Suspense>
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