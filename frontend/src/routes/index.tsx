import { createFileRoute } from '@tanstack/react-router'
import { useHealth } from '@/hooks/useApi'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, Loader2, Server } from 'lucide-react'

function Index() {
  const { data: health, isLoading, error } = useHealth()

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Backend Status */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Server className='h-5 w-5' />
              Backend Health Status
            </CardTitle>
            <CardDescription>
              Real-time connection status to the Go backend server
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='text-muted-foreground'>
                  Checking backend connection...
                </span>
              </div>
            ) : error ? (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  Backend is not responding. Make sure the Go server is running
                  on port 8080.
                </AlertDescription>
              </Alert>
            ) : health?.success ? (
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='h-5 w-5 text-green-600' />
                  <span className='font-medium text-green-600'>
                    Backend is healthy
                  </span>
                  <Badge variant='secondary'>Connected</Badge>
                </div>
                {health.data && (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2'>
                    <div className='bg-muted p-3 rounded-lg'>
                      <p className='text-sm font-medium'>Version</p>
                      <p className='text-lg font-mono'>{health.data.version}</p>
                    </div>
                    <div className='bg-muted p-3 rounded-lg'>
                      <p className='text-sm font-medium'>Status</p>
                      <p className='text-lg capitalize'>{health.data.status}</p>
                    </div>
                    <div className='bg-muted p-3 rounded-lg'>
                      <p className='text-sm font-medium'>Uptime</p>
                      <p className='text-lg'>Active</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  Backend returned an unexpected response.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
