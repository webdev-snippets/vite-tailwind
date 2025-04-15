import { BookIcon, CatIcon, ClipboardIcon, HomeIcon, LeafyGreenIcon, LockKeyholeIcon } from "lucide-react";
import { NavItemProps } from "@/components/navItem";
import { NavDrawer } from "@/components/navDrawer";
import { Button } from "@/components/button";
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
      label: 'register',
      route: '/register',
      action: 'tertiary',
      icon: ClipboardIcon

    },
    {
      label: 'products',
      route: '/products',
      action: 'secondary',
      icon: LeafyGreenIcon
    },
    {
      label: 'booking',
      route: '/booking',
      action: 'primary',
      icon: BookIcon
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
  return (
    <>
      <div className="bg-surface-container-low rounded-md flex flex-col md:flex-row items-stretch m-1 p-4 relative h-48">
        <div className="absolute top-2 left-2">
          <NavDrawer pathname={location.pathname} items={navItems} onItemClick={handleNav}>
            <Button label="navigation" size="lg" />
          </NavDrawer>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-4">
          <div className="text-2xl text-on-primary-container bg-primary-container px-6 py-3 rounded-full">
            <h1>Rosla Technologies</h1>
          </div>
          <div className="text-xl text-on-secondary-container bg-secondary-container px-6 py-3 rounded-full">
            <h2>We are a green energy company focused on sustainability</h2>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          {PageComponent && <PageComponent />}
        </Suspense>
      </div>
        <footer className="bg-tertiary-container text-on-tertiary-container p-4 mt-6">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="bg-tertiary text-on-tertiary rounded-md px-4 py-2">
              <h1 className="text-lg font-semibold">This is the footer</h1>
              <h1 className="text-lg font-semibold">Rosla Technologies</h1>
            </div>

            <div className="text-sm text-on-tertiary-container">
              <p>© 2025 Rosla Technologies. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </>
      )
}