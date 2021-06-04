import React, { createContext, useReducer } from "react";
import { ProductAdminReducer } from "../../reducers/Admin/ProductAdminReducer";
import { apiUrl } from ".././Customer/constants";

export const ProductAdminContext = createContext();

const ProductAdminContextProvider = ({ children }) => {
	const [productsAdminState, dispatch] = useReducer(ProductAdminReducer, {
		products: [],
		productLoading: true,
	});

	const getProductsAdmin = async () => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();
		dispatch({
			type: "PRODUCTS_lOADED_SUCCESS",
			payload: resJSON,
		});
		return resJSON;
	};

	const removeProductAdmin = async (token, productId) => {
		// console.log(productId);
		const res = await fetch(`${apiUrl}/api/Products/${productId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
		});
		const resJSON = await res.json();
		dispatch({
			type: "DELETE_PRODUCT",
			payload: productId,
		});
		return resJSON;
	};

	const ProductAdminContextData = {
		getProductsAdmin,
		productsAdminState,
		removeProductAdmin,
	};

	return (
		<ProductAdminContext.Provider value={ProductAdminContextData}>
			{children}
		</ProductAdminContext.Provider>
	);
};

export default ProductAdminContextProvider;
