export const apiUrl =
	process.env.NODE_ENV !== "production"
		? "https://localhost:5001"
		: "something";

export const LOCAL_STORAGE_TOKEN_NAME = "user_login";
export const LOCAL_STORAGE_TOKEN_ADMIN = "admin_login";
