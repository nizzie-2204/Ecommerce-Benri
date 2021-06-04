import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce/lib";
export const CustomerAuthLogin = createContext();

const CustomerAuthLoginProvider = ({ children }) => {
	const history = useHistory();

	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthennicated: false,
		user: null,
	});

	// Login
	const loginUser = async (userForm) => {
		const {
			username,
			password,
			confirmPasword,
			phone,
			address,
			fullname,
		} = userForm;
	};

	// Check username is already exist or not
	const checkUsername = async (username) => {
		console.log(username);
		let myResult;
		const res = await fetch(`${apiUrl}/api/accounts/CheckAccountAsync`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(username),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				myResult = result;
			})
			.catch((error) => console.log(error));

		return myResult;
	};

	const registerUser = async (registerForm) => {
		let message = "";
		const { username, password, phoneNumber, address, fullname } = registerForm;
		const dataRegisterForm = {
			username: username,
			password: password,
			phoneNumber: phoneNumber,
			address: address,
			fullname: fullname,
		};
		console.log(JSON.stringify(dataRegisterForm));
		const resMessage = await fetch(`${apiUrl}/api/accounts/createAccount`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(dataRegisterForm),
		});

		const a = await resMessage.json();
		return a;
	};

	const customerAuthContextData = {
		registerUser,
		checkUsername,
	};

	return (
		<CustomerAuthLogin.Provider value={customerAuthContextData}>
			{children}
		</CustomerAuthLogin.Provider>
	);
};

export default CustomerAuthLoginProvider;
