import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from './access-token'
import router from '@/router'
import { logoutUser } from '@/queries/auth'

const api = axios.create({
  baseURL: '/api',
})

let isRefreshing = false
type PendingRequest = {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void
  reject: (error: any) => void
  originalRequest: AxiosRequestConfig & { _retry?: boolean }
}
let failedQueue: PendingRequest[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else {
      if (token && prom.originalRequest.headers) {
        prom.originalRequest.headers.Authorization = `Bearer ${token}`
      }
      prom.resolve(api(prom.originalRequest))
    }
  })
  failedQueue = []
}

api.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

// Refresh client without any interceptors to avoid infinite loop in case of 401
const refreshClient: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined

    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({ resolve, reject, originalRequest })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    return new Promise<AxiosResponse>(async (resolve, reject) => {
      try {
        const refreshResponse = await refreshClient.post(
          '/auth/refresh',
          null,
          {
            withCredentials: true,
          }
        )

        const newToken = (refreshResponse.data as { accessToken: string })
          .accessToken
        if (!newToken) throw new Error('No access token in refresh response')

        setAccessToken(newToken)
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`

        processQueue(null, newToken)

        if (originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        resolve(api(originalRequest))
      } catch (refreshError) {
        processQueue(refreshError, null)
        try {
          await logoutUser()
        } catch {}
        clearAccessToken()
        // Fallback redirect to login. If your router instance is exported, prefer using it to navigate.
        router.navigate({ to: '/login' })
        reject(refreshError)
      } finally {
        isRefreshing = false
      }
    })
  }
)

export default api
