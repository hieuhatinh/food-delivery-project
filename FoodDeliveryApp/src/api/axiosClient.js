import axios from 'axios'

// const IP_ADRESS = '192.168.24.103'
// const IP_ADRESS = '192.168.24.105'
const IP_ADRESS = '192.168.24.109'
// const IP_ADRESS = '172.20.10.7'

const axiosClient = axios.create({
    baseURL: `http://${IP_ADRESS}:3000`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient
