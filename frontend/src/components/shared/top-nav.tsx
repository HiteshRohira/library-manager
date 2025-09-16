import type * as React from 'react'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/types'
import { logoutUser } from '@/queries/auth'
import { clearAccessToken } from '@/lib/access-token'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const TopNav: React.FC = () => {
  const navigate = useNavigate()
  const { mutate } = useMutation<void, ApiError, void>({
    mutationFn: logoutUser,
  })

  const handleLogout = async () => {
    return mutate(undefined, {
      onSuccess: () => {
        console.log('successful logout')
        clearAccessToken()
        navigate({ to: '/login' })
      },
      onError: (error, variables, context) => {
        // An error happened!
        console.log('oopsie an error', error, variables, context)
        toast.error(
          error.response?.data?.message || 'Logout failed. Please try again.'
        )
      },
    })
  }

  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
      Library Manager
      <Button
        className='flex justify-end'
        variant={'secondary'}
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </header>
  )
}
