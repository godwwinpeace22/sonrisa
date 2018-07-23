import axios from 'axios'

export default()=>{
    return axios.create({
        baseURL: 'http:/' +'/localhost:3000' //'https:/' + '/secure-citadel-58191.herokuapp.com'
    })
}