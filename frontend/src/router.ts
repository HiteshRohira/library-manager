import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create and export a dedicated router instance
export const router = createRouter({
  routeTree,
  context: {
    accessToken: '',
  },
})

// Register the router instance for type safety across the app
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
