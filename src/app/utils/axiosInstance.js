import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
});


export default axiosInstance;