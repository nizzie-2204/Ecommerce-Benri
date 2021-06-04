export const CartItemsReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "CARTITEMS_lOADED_SUCCESS":
			return {
				...state,
				cartItems: payload,
				cartItemsLoading: false,
			};

		case "ADD_PRODUCT":
			return {
				...state,
				cartItems: [...state.cartItems.cartItems, payload],
			};

		case "DELETE_PRODUCT":
			console.log(payload);
			const newState = state.cartItems.cartItems.filter((item) => {
				return item !== payload;
			});

			return {
				...state,
				cartItems: newState,
			};

		default:
			return state;
	}
};
