const sethAuthToken = (token) => {
	if (token) {
		// axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		fetch.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		delete fetch.defaults.headers.common["Authorization"];
	}
};

export default sethAuthToken;
