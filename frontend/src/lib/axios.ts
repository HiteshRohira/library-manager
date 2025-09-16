import axios from 'axios'
import { getAccessToken } from './access-token'

axios.interceptors.request.use(config => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
