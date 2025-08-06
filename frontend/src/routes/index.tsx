import { createFileRoute } from '@tanstack/react-router'

function Index() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/50'>
      <div className='container mx-auto px-4 py-8'>Home page</div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
