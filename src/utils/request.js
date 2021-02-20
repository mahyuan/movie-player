import axios from 'axios'

// const baseUrl = import.meta.env.VITE_BASE_API

const request = axios.create({
  // baseURL: baseUrl,
  baseURL: process.env.NODE_ENV === 'production' ? import.meta.env : '',
  withCredentials: true,
  timeout: 30000
})

request.interceptors.response.use(
  resp => {
    return resp.data
  }, err => {
    return Promise.reject(err)
  }
)

export default request
