import axios from 'axios';

const HTTP = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // because users are impatient
});

export default HTTP;
