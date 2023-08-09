const prod = {
	url: {
		API_URL: "https://dark-plum-dalmatian-sock.cyclic.app" || "https://bookshelf-rzqy.onrender.com/api/v1"
	}
};

const dev = {
	url: {
		API_URL: "http://localhost:8800/api/v1"
	}
};

export const config =
	process.env.NODE_ENV === "development" ? dev : prod;