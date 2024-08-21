import axios from 'axios';

import Auth from "@/api/Auth.ts";
import User from "@/api/User";
import RoomChat from "@/api/RoomChat";
import Message from "@/api/Message";


const API_URL = 'http://localhost:3000';
const axiosConfig = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const api  ={
    auth: Auth(axiosConfig),
    user: User(axiosConfig),
    roomChat: RoomChat(axiosConfig),
    message: Message(axiosConfig),
}