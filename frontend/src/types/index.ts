export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

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

// Form types
export interface UserFormData {
  name: string
  email: string
}

// Router types
export interface RouteParams {
  userId?: string
}

// Query types
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
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
