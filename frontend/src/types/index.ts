export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface HealthResponse {
  timestamp: string
  version: string
  status: string
}

// Error types
export interface ApiErrorResponse {
  success: false
  message: string
  error?: string
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse

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
