// axios
import axios from "axios";

const axAPI = axios.create({
  baseURL: "https://openlibrary.org",
  withCredentials: true,
});
// response
axAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);

const axDB = axios.create({
  baseURL: "http://localhost:8800/api/v1",
  withCredentials: true,
});
// response
axDB.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);

export { axAPI, axDB };
