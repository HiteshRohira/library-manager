import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen bg-background'>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
})
