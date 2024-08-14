export default ($axios) => ({
    create(payload){

        return $axios.post('/project/create',payload)
    }
})