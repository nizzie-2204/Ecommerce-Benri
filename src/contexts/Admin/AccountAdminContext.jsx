import React, { createContext, useReducer } from "react";
import { AccountAdminReducer } from "../../reducers/Admin/AccountAdminReducer";
import { apiUrl } from ".././Customer/constants";

export const AccountAdminContext = createContext();

const AccountAdminContextProvider = ({ children }) => {
	const [accountsAdminState, dispatch] = useReducer(AccountAdminReducer, {
		accounts: [],
		accountsLoading: true,
	});

	const getAccountsAdmin = async (token) => {
		const res = await fetch(`${apiUrl}/api/Accounts/GetAccounts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});
		const resJSON = await res.json();
		console.log(resJSON);
		dispatch({
			type: "ACCOUNTS_lOADED_SUCCESS",
			payload: resJSON,
		});
		return resJSON;
	};

	// const removeProductAdmin = async (token, productId) => {
	// 	// console.log(productId);
	// 	const res = await fetch(`${apiUrl}/api/Products/${productId}`, {
	// 		method: "DELETE",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 			Authorization: "Bearer " + token,
	// 		},
	// 	});
	// 	const resJSON = await res.json();
	// 	dispatch({
	// 		type: "DELETE_PRODUCT",
	// 		payload: productId,
	// 	});
	// 	return resJSON;
	// };

	const AccountsAdminContextData = {
		getAccountsAdmin,
		accountsAdminState,
	};

	return (
		<AccountAdminContext.Provider value={AccountsAdminContextData}>
			{children}
		</AccountAdminContext.Provider>
	);
};

export default AccountAdminContextProvider;
