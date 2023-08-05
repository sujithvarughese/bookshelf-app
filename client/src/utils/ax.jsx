// axios
import axios from "axios";
import { config } from "../../constants.js";

const axAPI = axios.create({
	baseURL: "https://openlibrary.org"
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
	baseURL: config.url.API_URL,
	withCredentials: true
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
