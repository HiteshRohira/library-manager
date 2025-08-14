import axios from 'axios'
import type { LoginRequest, LoginResponse } from '@/types'

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    '/api/authenticate',
    credentials,
    { withCredentials: true }
  )
  return response.data
}
