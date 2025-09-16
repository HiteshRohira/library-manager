import { TopNav } from '@/components/shared/top-nav'
import { isAuthenticated } from '@/lib/access-token'
import { refreshToken } from '@/queries/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (isAuthenticated()) return

    // Try to refresh if not authenticated
    try {
      await refreshToken()
      return
    } catch {
      // throw redirect({
      //   to: '/login',
      //   search: {
      //     redirect: location.href,
      //   },
      // })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='w-full'>
      <TopNav />
      <Outlet />
    </main>
  )
}
