import { z } from 'zod'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
})

export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & {
  data?: T
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      )
    }

    const data = await response.json()

    // Validate response structure
    const result = ApiResponseSchema.parse(data)

    if (!result.success) {
      throw new ApiError(result.message || 'API request failed')
    }

    return result as ApiResponse<T>
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

// API functions
export const api = {
  health: () => apiRequest('/api/health'),
}

// React Query key factory
export const queryKeys = {
  health: ['health'] as const,
}
