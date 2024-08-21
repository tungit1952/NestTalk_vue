export default ($axios) => ({
    find(id:number) {
        return $axios.post('/room-chat/find', {id}, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
                }
            }
        )
    }
})