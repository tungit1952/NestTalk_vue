import type {Message} from "@/dataType";

export default ($axios) => ({
    create(payload: Message) {
        return $axios.post('/message/create', payload, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
                }
            }
        )
    },
    find(id:number, page:number){
        return $axios.get(`/message/${id}/${page}`,{
            headers: {
                Authorization:'Bearer ' + window.localStorage.getItem('token'),
            },
        })
    }
})