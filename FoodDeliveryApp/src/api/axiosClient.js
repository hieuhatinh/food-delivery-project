import axios from 'axios'

import * as storage from '../storage'
import { KEY_USER } from '../storage/keys'

const IP_ADRESS = '192.168.1.9'

const axiosClient = axios.create({
    baseURL: `http://${IP_ADRESS}:3000`,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    async function (request) {
        const token = await storage.getItem(KEY_USER)

        const newHeaders = {
            ...request.headers,
            Authorization: `Bearer ${token}`,
        }

        request = {
            ...request,
            headers: newHeaders,
        }

        return request
    },
    function (error) {
        // Xử lý lỗi
        return Promise.reject(error)
    },
)

axiosClient.interceptors.response.use(
    function (response) {
        response = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        }

        return response
    },
    function (error) {
        return Promise.reject(error)
    },
)

export default axiosClient
