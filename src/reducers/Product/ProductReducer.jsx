export const ProductReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "PRODUCTS_lOADED_SUCCESS":
			return {
				...state,
				products: payload,
				productsLoading: false,
			};

		case "WOMEN_PRODUCTS_lOADED_SUCCESS":
			return {
				...state,
				womenProduct: payload,
				productsLoading: false,
			};

		case "MEN_PRODUCTS_lOADED_SUCCESS":
			return {
				...state,
				menProduct: payload,
				productsLoading: false,
			};

		case "SEARCH_PRODUCT":
			// console.log(payload);
			return {
				...state,
				products: payload,
			};

		case "ADD_PRODUCT":
			return {
				...state,
				products: [...state.products, payload],
			};

		default:
			return state;
	}
};
