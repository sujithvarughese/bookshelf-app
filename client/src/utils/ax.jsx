// axios
import axios from "axios";

const ax = axios.create({
	baseURL: 'https://openlibrary.org',
	withCredentials: true
});
// response
ax.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// console.log(error.response)
		return Promise.reject(error);
	}
);

export default ax