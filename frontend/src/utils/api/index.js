// API config
import axios from 'axios';
import { getCookie } from 'utils/functions';

const options = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
};

const apiInstance = axios.create(options);

// Auth Token for every request
apiInstance.interceptors.request.use((config) => {
    const token = getCookie('token');

    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default apiInstance;   