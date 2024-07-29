import {defineStore} from "pinia";
import {ref} from 'vue'
import {api} from '@/api'
import Message from 'ant-design-vue/es/message'
import { useRouter } from 'vue-router';
const router = useRouter();
export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            userInfo: [],
            isAuth:false
        }
    },
    actions: {
        async login({email, password}) {
            try {
                const response = await api.auth.login({email, password})
                this.setUserData(response.data.data)
                localStorage.setItem('user', JSON.stringify(response.data.data));
                localStorage.setItem('token', response.data.data.token);
                this.isAuth = true
                return true
            } catch (e) {
                console.log(e)
                if (e.response.data.message) Message.error(e.response.data.message)
                else console.error(e)
            }
        },
        setUserData(userData: any) {
            this.userInfo = userData
        }
    }
})