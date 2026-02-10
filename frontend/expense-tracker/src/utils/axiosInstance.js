
import { BASE_URL  } from "./apiPaths";
import axios from 'axios';

const axiosInstance = axios.create({
    // If we are in production, use the deployed URL. If local, use localhost.
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ... rest of your interceptors
//Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;

    },
    (error)=>{
        return Promise.reject(error);
    }

);
//Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
    if(error.response){
        if(error.response.status===401){
            window.location.href="/login";
        }else if(error.resposne.status===500){
            console.error("Server Error. Please try again later");
        }
    }else if(error.code==="ECONNABORTED"){
        console.error("Request timeout .Please try again");
    }
    return Promise.reject(error);
}
);export default axiosInstance;