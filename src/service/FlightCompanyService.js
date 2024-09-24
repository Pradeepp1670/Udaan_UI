import axios from "axios"
import { getToken } from "./AuthService";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const companies = () => axios.get("http://localhost:8080/api/company/getAll")