import axios from 'axios'

export default()=>{
    return axios.create({
        baseURL:'https:/' + '/secure-citadel-58191.herokuapp.com'
    })
}