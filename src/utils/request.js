import axios from 'axios'

export const service = axios.create({
    // eslint-disable-next-line
    baseURL: '',
    timeout: 15 * 1000 // 15秒
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },
    error => {
        console.log('API error: ', error) // for debug
        return Promise.reject(error)
    }
)

export default service
