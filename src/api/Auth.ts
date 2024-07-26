export default ($axios) => ({
    login({email, password}){
        return $axios.post('/auth/login',{email, password})
    }
})