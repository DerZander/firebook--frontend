import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "@/store/modules/login";
// import { ApiErrorAlert, Alert } from "@/models";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 30000,
  validateStatus(status) {
    return status >= 200 && status < 300 && status !== 204;
  },
});

http.interceptors.request.use((request) => {
  const scopedRequest = request;
  const token = Cookies.get(COOKIE_NAME); //window.app.$store.getters["Login/token"];
  if (token) scopedRequest.headers.Authorization = token;
  return scopedRequest;
});

http.interceptors.response.use(
  (resp) => resp,
  (err) => {
    console.log(err);
    switch (err.response.status) {
      case 401:
        // window.app.$store.dispatch(
        //   "alerts/add",
        // new Alert()
        //   .setType(Alert.WARNING)
        //   .setMessage("Bitte loggen Sie sich erneut ein!")
        //   .setHeader("Warnung")
        // );
        window.app.$store.dispatch("Login/logout").then(() => {
          window.app.$router.push("/login");
        });
        break;
      case 400:
        console.log("400");
        // window.app.$store.dispatch(
        //   "alerts/add",
        // new Alert()
        //   .setType(Alert.DANGER)
        //   .setMessage("Falscher Benutzername oder Passwort")
        //   .setHeader("Fehler")
        // );
        break;
      case 403:
        // window.app.$store.dispatch("alerts/add", new ApiErrorAlert(err));
        window.app.$router.go(-1);
        break;
      case 404:
        // window.app.$store.dispatch("alerts/add", new ApiErrorAlert(err));
        break;
      case 500:
        // window.app.$store.dispatch("alerts/add", new ApiErrorAlert(err));
        break;
      case undefined:
        console.log("undefined");
        // window.app.$store.dispatch(
        //   "alerts/add",
        // new Alert()
        //   .setType(Alert.DANGER)
        //   .setMessage("Ein unbekannter Fehler ist aufgetreten.")
        //   .setHeader("Fehler")
        // );
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);
export default http;
