import axios from "axios"

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const register = (registerDto) => axios.post("http://localhost:8080/api/auth/register",registerDto);

export const login = (email, password) => axios.post("http://localhost:8080/api/auth/login",{email,password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}
export const isLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser");

    if(username == null){
        return false;
    }
    else{
        return true;
    }
}

export const getLoggedInUser = () => {
    return sessionStorage.getItem("authenticatedUser")
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdmin = () => {
    const admin = sessionStorage.getItem("role");

    if(admin!= null && admin === 'ROLE_ADMIN'){
        return true;
    }
    else{ 
        return false;
    }
}