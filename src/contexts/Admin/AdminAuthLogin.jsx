import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { useHistory } from "react-router-dom";
export const AdminAuthLogin = createContext();

const AdminAuthLoginProvider = ({ children }) => {
	const history = useHistory();

	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthennicated: false,
		user: null,
	});

	//Load user
	const loadAdmin = () => {
		if (localStorage.getItem("admin_login")) {
			const user = JSON.parse(localStorage.getItem("admin_login"));
			dispatch({
				type: "SET_AUTH",
				payload: { isAuthenticated: true, user: user },
			});
			return user;
		}
	};

	useEffect(() => {
		loadAdmin();
	}, []);

	// Login
	const loginAdmin = async (userForm) => {
		const { username, password } = userForm;

		if (
			localStorage.getItem("user_token") &&
			localStorage.getItem("user_login")
		) {
			localStorage.removeItem("user_token");
			localStorage.removeItem("user_login");
		}
		// Get token
		const token = await fetch(`${apiUrl}/api/Logins`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(userForm),
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					console.log(res);
				}
			})
			.catch((error) => console.log(error));

		//Auth login is customer or admin
		if (token) {
			const user = await fetch(
				`${apiUrl}/api/accounts/GetAccountInformation/${username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: "Bearer " + token,
					},
				}
			);
			const userJSON = await user.json();
			const { role } = userJSON;

			localStorage.setItem("admin_login", JSON.stringify(userJSON));
			localStorage.setItem("admin_token", token);
			loadAdmin();
			return role;
		}
	};

	//Logout
	const logoutAdmin = () => {
		localStorage.removeItem("admin_login");
		localStorage.removeItem("admin_token");
		dispatch({
			type: "SET_AUTH",
			payload: { isAuthenticated: false, user: null },
		});
	};

	const adminAuthContextData = {
		loginAdmin,
		loadAdmin,
		logoutAdmin,
		authState,
	};

	return (
		<AdminAuthLogin.Provider value={adminAuthContextData}>
			{children}
		</AdminAuthLogin.Provider>
	);
};

export default AdminAuthLoginProvider;
