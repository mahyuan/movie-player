import axios from 'axios'

const request = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? import.meta.env.VITE_BASE_API : '',
  baseURL: import.meta.env.VITE_ENV === 'prod' ? import.meta.env.VITE_BASE_API : '',
  withCredentials: true,
  timeout: 30000
})

request.interceptors.request.use(
  config => {
    return config
  }, error => {
    Promise.reject(error)
  }
)
request.interceptors.response.use(
  resp => {
    return resp.data
  }, err => {
    return Promise.reject(err)
  }
)

export default request
