import axios from 'axios'

export default()=>{
    return axios.create({
        baseURL:process.env.heroku_url //"http:/" + "/localhost:3000" 
    })
}