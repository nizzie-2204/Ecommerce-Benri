export const ProductAdminReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "PRODUCTS_lOADED_SUCCESS":
			console.log(payload);
			return {
				...state,
				products: payload,
				productLoading: false,
			};

		// case "ADD_PRODUCT":
		// 	return {
		// 		...state,
		// 		cartItems: [...state.cartItems.cartItems, payload],
		// 	};

		case "DELETE_PRODUCT":
			console.log(payload);
			return {
				...state,
				products: state.products.filter((product) => {
					return product.productId !== payload;
				}),
			};

		// 	return {
		// 		...state,
		// 		cartItems: newState,
		// 	};

		default:
			return state;
	}
};
