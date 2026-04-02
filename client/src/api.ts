import axios from "axios"

const API = axios.create({
    // baseURL : "https://to-do-list-2q0e.onrender.com",
    baseURL : "http://localhost:3131",
    withCredentials : true
})




export default API