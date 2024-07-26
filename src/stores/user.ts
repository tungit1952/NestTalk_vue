import {defineStore} from "pinia";
import {ref} from 'vue'
import {api} from '@/api'

export const useUserStore =  defineStore('user', () => {
    const userInfo = ref({})
    const login = async ({email, password}) => {
        try {
            await api.auth.login({email, password})
        }catch (e){
            console.log(e.response.data)
        }
    }
    return {
        login
    }
})