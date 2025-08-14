import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginUser } from '@/queries/login'
import { toast } from 'sonner'
import { useRouter } from '@tanstack/react-router'
import type { LoginRequest } from '@/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = LoginRequest

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
  })

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { isSubmitting } = useFormState({ control: loginForm.control })

  const onSubmit = async (data: LoginFormData) => {
    return mutate(data, {
      onSuccess: () => {
        console.log('success')
      },
      onError: (error, variables, context) => {
        // An error happened!
        console.log('oopsie an error', error, variables, context)
        toast.error(error?.response?.data?.message || 'login failed')
      },
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <div className='grid gap-6'>
                  <FormField
                    control={loginForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='m@example.com'
                            type='email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={isSubmitting || isPending}
                  >
                    {isSubmitting || isPending ? <Loader2 /> : 'Login'}
                  </Button>
                </div>
                <div className='text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <a href='#' className='underline underline-offset-4'>
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  )
}
