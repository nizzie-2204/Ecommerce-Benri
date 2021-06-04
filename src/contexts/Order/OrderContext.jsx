import React, { createContext, useReducer } from "react";
import { OrderReducer } from "../../reducers/Order/OrderReducer";
import { apiUrl } from "../Customer/constants";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
	const [orderState, dispatch] = useReducer(OrderReducer, {
		orders: [],
		ordersLoading: true,
	});

	// const getOrder = async (username, token) => {
	// 	const res = await fetch(`${apiUrl}/api/Orders/GetOrders/${username}`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 			Authorization: "Bearer " + token,
	// 		},
	// 	});
	// 	const resJSON = await res.json();
	// 	console.log(resJSON);
	// 	if (resJSON) {
	// 		dispatch({
	// 			type: "ORDER_lOADED_SUCCESS",
	// 			payload: resJSON,
	// 		});
	// 	}
	// };

	const getAllOrders = async (token, username) => {
		const res = await fetch(`${apiUrl}/api/Orders/GetOrders/${username}`, {
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
			type: "ORDER_lOADED_SUCCESS",
			payload: resJSON,
		});
		return resJSON;
	};

	const denyOrder = async (token, orderData) => {
		const res = await fetch(`${apiUrl}/api/Orders/UpdateOrder`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(orderData),
		});

		const resJSON = await res.json();
		return resJSON;
	};

	const addOrderByCash = async (username, shippingObject, token) => {
		console.log(JSON.stringify(shippingObject));
		const res = await fetch(`${apiUrl}/api/Orders/AddOrder/${username}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(shippingObject),
		});

		return res;
	};

	const addOrderByVisa = async (username, shippingObject, token, visaForm) => {
		console.log(visaForm);
		const res = await fetch(`${apiUrl}/api/Orders/AddOrder/${username}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(shippingObject),
		});

		const orderId = await res.json();
		const visaFormData = {
			orderId: orderId,
			...visaForm,
		};

		if (res) {
			console.log(res);
			const res2 = await fetch(`${apiUrl}/api/Payment/Charge`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(visaFormData),
			});
			if (res2) {
				console.log("Successfully");
				return res2;
			}
		}
	};

	const OrderContextData = {
		addOrderByCash,
		orderState,
		addOrderByVisa,
		getAllOrders,
		denyOrder,
	};

	return (
		<OrderContext.Provider value={OrderContextData}>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderContextProvider;
