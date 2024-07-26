import Auth from "@/api/Auth.ts";
import axios from 'axios';
const API_URL = 'http://localhost:3000';
const axiosConfig = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const api  ={
    auth: Auth(axiosConfig),
}