import axios from "axios";
import store from "../store/index";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 30000,
  validateStatus(status) {
    return status >= 200 && status < 300 && status !== 204;
  },
});

http.interceptors.request.use((request) => {
  const scopedRequest = request;
  const token = store.getters["Login/token"]["Login/token"];

  if (token) scopedRequest.headers.Authorization = token;
  return scopedRequest;
});

http.interceptors.response.use(
  (resp) => resp,
  (err) => {
    console.log(err);
    switch (err.response.status) {
      case 401:
        store.dispatch("Login/logout").then(() => {
          window.app.$route.push("/login");
        });
        break;
      case 400:
        // Wrong username or password
        console.log("Error 400");
        break;
      case 403:
        // Error
        console.log("Error 403");
        break;
      case 404:
        // Error
        console.log("Error 404");
        break;
      case 500:
        // Error
        console.log("Error 500");
        break;
      case undefined:
        console.log("Error undef");
        //undef error
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

export default http;
