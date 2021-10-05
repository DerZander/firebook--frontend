import axios from "axios";
import store from "../store/index";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 30000,
  validateStatus(status) {
    return status >= 200 && status < 300 && status !== 204;
  },
});

http.interceptors.request.use((request) => {
  const scopedRequest = request;
  const token = store.getters["Login/token"];

  console.log("There token", token);
  if (token) {
    scopedRequest.headers.Authorization = token;
    console.log(scopedRequest.headers.Authorization);
    console.log(scopedRequest.headers);
  }
  console.log("request: ", scopedRequest);
  return scopedRequest;
});

http.interceptors.response.use(
  (resp) => resp,
  (err) => {
    console.log();
    switch (err.response.status) {
      case 401:
        console.log("case 401");
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
