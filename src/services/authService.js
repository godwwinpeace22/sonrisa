import api from '@/services/api'
export default {
    Login(url,credentials){
        return api().post(url, credentials)
    },
    Register(url,credentials){
        return api().post(url,credentials)
    }
}