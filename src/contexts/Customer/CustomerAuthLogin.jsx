import React, { createContext, useEffect, useReducer, useState } from "react";
import { authReducer } from "../../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { useHistory } from "react-router-dom";
export const CustomerAuthLogin = createContext();

const CustomerAuthLoginProvider = ({ children }) => {
	const history = useHistory();

	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthennicated: false,
		user: null,
	});

	//Load user
	const loadUser = () => {
		if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
			const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
			dispatch({
				type: "SET_AUTH",
				payload: { isAuthenticated: true, user: user },
			});
			return user;
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	// Login
	const loginUser = async (userForm) => {
		const { username, password } = userForm;

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

			localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, JSON.stringify(userJSON));
			localStorage.setItem("user_token", token);
			loadUser();
			return role;
		}
	};

	// Logout
	const logoutUser = () => {
		localStorage.removeItem("user_login");
		localStorage.removeItem("user_token");
		dispatch({
			type: "SET_AUTH",
			payload: { isAuthenticated: false, user: null },
		});
	};

	const customerAuthContextData = {
		loginUser,
		loadUser,
		logoutUser,
		authState,
	};

	return (
		<CustomerAuthLogin.Provider value={customerAuthContextData}>
			{children}
		</CustomerAuthLogin.Provider>
	);
};

export default CustomerAuthLoginProvider;
