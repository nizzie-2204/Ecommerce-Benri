export const OrderAdminReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "ORDERS_lOADED_SUCCESS":
			console.log(payload);
			return {
				...state,
				orders: payload,
				ordersLoading: false,
			};

		// case "ADD_PRODUCT":
		// 	return {
		// 		...state,
		// 		cartItems: [...state.cartItems.cartItems, payload],
		// 	};

		// case "DELETE_PRODUCT":
		// 	console.log(payload);
		// 	const newState = state.cartItems.cartItems.filter((item) => {
		// 		return item !== payload;
		// 	});

		// 	return {
		// 		...state,
		// 		cartItems: newState,
		// 	};

		default:
			return state;
	}
};
