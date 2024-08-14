export default ($axios) => ({
    list(params : {}){
        return $axios.get('/user/list',{
            headers: {
                Authorization:'Bearer ' + window.localStorage.getItem('token'),
            },
            params: params,
        })
    }
})