import { useRuntimeConfig } from '#app'

import axios from 'axios'

export function useAxios () {
  const config = useRuntimeConfig()

  const options = {
    baseURL: config.public.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }

  const axiosIns = axios.create(options)

  axiosIns.interceptors.response.use(null, error => {
    const status = error?.response?.status || 500

    if (status === 401) {
      const path = window.location.pathname
      window.location.href = '/login'
    } else if (status === 403) {
      window.location.href = '/'
    } else if (status === 404) {
      window.location.href = '/not-found'
    }

    return Promise.reject(error)
  })

  return axiosIns
}
