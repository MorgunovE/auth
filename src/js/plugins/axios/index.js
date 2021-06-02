import axios from 'axios';
import API_ENV from '../../config/api.config';
import interceptors from './interseptors';


const instance = axios.create({
    baseURL: API_ENV.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

interceptors(instance);


export default instance;