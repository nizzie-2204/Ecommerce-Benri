import React, { createContext, useReducer } from "react";
import { OrderAdminReducer } from "../../reducers/Admin/OrderAdminReducer";
import { apiUrl } from ".././Customer/constants";

export const OrderAdminContext = createContext();

const OrderAdminContextProvider = ({ children }) => {
	const [ordersAdminState, dispatch] = useReducer(OrderAdminReducer, {
		orders: [],
		ordersLoading: true,
	});

	const getOrdersAdmin = async (token) => {
		const res = await fetch(`${apiUrl}/api/Orders/GetOrders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});

		const resJSON = await res.json();
		dispatch({
			type: "ORDERS_lOADED_SUCCESS",
			payload: resJSON,
		});

		return resJSON;
	};

	const approveOrder = async (token, orderData) => {
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

	const denyOrder = async () => {};

	const OrderAdminContextData = {
		getOrdersAdmin,
		approveOrder,
		ordersAdminState,
	};

	return (
		<OrderAdminContext.Provider value={OrderAdminContextData}>
			{children}
		</OrderAdminContext.Provider>
	);
};

export default OrderAdminContextProvider;
