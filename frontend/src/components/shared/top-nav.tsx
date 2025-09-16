import type * as React from 'react'
import { Separator } from '../ui/separator'

interface TopNavProps {
  maybe?: true
}

export const TopNav: React.FC<TopNavProps> = () => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <Separator
        orientation='vertical'
        className='mr-2 data-[orientation=vertical]:h-4'
      />
    </header>
  )
}
