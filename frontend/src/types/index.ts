// Backend error response structure
export interface JSONResponse<T = any> {
  error: boolean
  message: string
  data?: T
}

// For successful responses
export interface ApiSuccess<T = any> extends JSONResponse<T> {
  error: false
  data: T
}

// For error responses
export interface ApiErrorRes extends JSONResponse {
  error: true
  message: string
}

// Custom error type for Axios errors with our API structure
export interface ApiError {
  response?: {
    data?: ApiErrorRes
    status?: number
    statusText?: string
  }
  message: string
  name: string
}

// Environment variables
export interface EnvVars {
  VITE_API_URL: string
  VITE_APP_TITLE: string
  VITE_APP_DESCRIPTION: string
  VITE_NODE_ENV: string
  VITE_ENABLE_DEVTOOLS: string
  VITE_ENABLE_MOCK_API: string
  VITE_DEFAULT_LOCALE: string
}

// Authentication types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refresh_token: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}
