import React, { createContext, useReducer } from "react";
import { editProfileReducer } from "../../reducers/Customer/EditProfileReducer";
import { apiUrl } from "./constants";

export const CustomerEditProfileContext = createContext();

const CustomerEditProfileProvider = ({ children }) => {
	const [editProfileState, dispatch] = useReducer(editProfileReducer, {
		phone: "",
		fullname: "",
		address: "",
	});

	const editProfile = async (newInfo) => {
		const token = localStorage.getItem("user_token");
		const user_local = JSON.parse(localStorage.getItem("user_login"));
		const { userName } = user_local;

		console.log(JSON.stringify(newInfo));

		const res = await fetch(
			`${apiUrl}/api/Accounts/ChangeAccountInformation/${userName}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(newInfo),
			}
		);
		console.log(res);
		const resJSON = await res.json();
		localStorage.setItem("user_login", JSON.stringify(newInfo));
		return resJSON;
	};

	const changePassword = async (newPassword) => {
		const token = localStorage.getItem("user_token");
		const user_local = JSON.parse(localStorage.getItem("user_login"));
		const { userName, address, fullName, phoneNumber, password } = user_local;

		const newForm = {
			address: address,
			fullName: fullName,
			password: newPassword,
			phoneNumber: phoneNumber,
			userName: userName,
		};

		console.log(newForm);

		const res = await fetch(
			`${apiUrl}/api/Accounts/ChangeAccountInformation/${userName}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(newForm),
			}
		);
		const resJSON = await res.json();
		localStorage.setItem("user_login", JSON.stringify(newForm));
		return resJSON;
	};

	const editProfileContextData = {
		editProfileState,
		editProfile,
		changePassword,
	};

	return (
		<CustomerEditProfileContext.Provider value={editProfileContextData}>
			{children}
		</CustomerEditProfileContext.Provider>
	);
};

export default CustomerEditProfileProvider;
