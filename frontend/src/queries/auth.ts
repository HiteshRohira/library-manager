import axios from 'axios'
import type { LoginRequest, LoginResponse } from '@/types'
import { clearAccessToken, setAccessToken } from '@/lib/access-token'

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

export async function refreshToken(): Promise<string> {
  try {
    const { data } = await axios.get<LoginResponse>('/api/refresh', {
      withCredentials: true,
    })

    if (!data?.token) {
      throw new Error('No token in refresh response')
    }

    setAccessToken(data.token)
    return data.token
  } catch (err) {
    clearAccessToken()
    throw err
  }
}

export const logoutUser = async (): Promise<void> => {
  const response = await axios.post('/api/logout')
  return response.data
}
