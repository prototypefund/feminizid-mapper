import axios from 'axios'
import { store } from '../../store'

const API_URL = process.env.VUE_APP_API_URL

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': store.state.csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  console.log('secureAxios error')
  if (error.response
      && error.response.config
      && error.response.status === 401) {
    return plainAxiosInstance
      .post('/refresh', {},
            { headers: { 'X-CSRF-TOKEN': store.state.csrf } })
      .then(response => {
        console.log('hit refresh endpoint')
        plainAxiosInstance.get('/me')
                          .then(meResponse => store.commit('setCurrentUser', {
                            currentUser: meResponse.data,
                            csrf: response.data.csrf }))
                          .catch(error => {
                            store.commit('unsetCurrentUser')
                            location.replace('/')
                            return Promise.reject(error)
                          })
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = response.state.csrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        store.commit('unsetCurrentUser')
        location.replace('/')
        return Promise.reject(error)
      })
  } else if (error.response
             && error.response.status === 403) {
    console.log('forbidden')
    store.commit('unsetCurrentUser')
    location.replace('/')
    return Promise.reject(error)
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
