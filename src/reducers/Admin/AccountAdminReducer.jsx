export const AccountAdminReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "ACCOUNTS_lOADED_SUCCESS":
			return {
				...state,
				accounts: payload,
				accountsLoading: false,
			};

		// case "ADD_PRODUCT":
		// 	return {
		// 		...state,
		// 		cartItems: [...state.cartItems.cartItems, payload],
		// 	};

		// case "DELETE_PRODUCT":
		// 	console.log(payload);
		// 	return {
		// 		...state,
		// 		products: state.products.filter((product) => {
		// 			return product.productId !== payload;
		// 		}),
		// 	};

		// 	return {
		// 		...state,
		// 		cartItems: newState,
		// 	};

		default:
			return state;
	}
};
