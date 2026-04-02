import axios from "axios"

const API = axios.create({
    baseURL : "https://banking-apps.onrender.com",
    // baseURL : "http://localhost:3131",
    withCredentials : true
})




export default API