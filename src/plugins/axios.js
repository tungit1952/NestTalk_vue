import axios from 'axios';
import { Plugin } from 'vue';
const API_URL = process.env.VUE_APP_API_URL;
export const axiosConfig = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

