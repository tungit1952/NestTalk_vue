export default ($axios) => ({
    create(payload){
        return $axios.post('/project/create',payload,{
            headers: {
                Authorization:'Bearer ' + window.localStorage.getItem('token'),
            },
        })
    }
})