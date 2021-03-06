import axios from "axios";

export const backendHost = "https://course-work-backend.herokuapp.com"

const $api = axios.create({
    withCredentials: false,
    baseURL: backendHost
})

$api.interceptors.request.use((config) => {
    config.headers.AccessToken = localStorage.getItem("accesstoken")
    config.headers.RefreshToken = localStorage.getItem("refreshtoken")
    return config
})

$api.interceptors.response.use((response) => {
    if (response.headers.refreshtoken && response.headers.accesstoken) {
        console.log("accesstoken and refreshtoken gotten")
        localStorage.setItem("accesstoken", response.headers.accesstoken)
        localStorage.setItem("refreshtoken", response.headers.refreshtoken)
    }
    return response
})

export default $api;