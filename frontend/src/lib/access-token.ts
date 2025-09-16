let accessToken: string | null = null

export function getAccessToken() {
  return accessToken
}

export function setAccessToken(value: string) {
  accessToken = value
}

export function clearAccessToken() {
  accessToken = null
}

export const isAuthenticated = () => !!getAccessToken()
