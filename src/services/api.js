import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/LiveTasks/api'
});
export default api;