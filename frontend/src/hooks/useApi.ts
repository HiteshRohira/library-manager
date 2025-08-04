import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/lib/api'

// Health check hook to see if backend is working
export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: api.health,
  })
}
