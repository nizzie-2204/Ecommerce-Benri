import React, { createContext, useReducer } from "react";
import { CartItemsReducer } from "../../reducers/CartItem/CartItemsReducer";
import { apiUrl } from ".././Customer/constants";

export const CartItems = createContext();

const CartItemsProvider = ({ children }) => {
	const [cartItemsState, dispatch] = useReducer(CartItemsReducer, {
		cartItems: [],
		cartItemsLoading: true,
	});

	const getCartItems = async (username, token) => {
		const res = await fetch(
			`${apiUrl}/api/CartItems/GetCartItems/${username}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);

		const resJSON = await res.json();
		// console.log(resJSON);
		dispatch({
			type: "CARTITEMS_lOADED_SUCCESS",
			payload: { cartItemsLoading: true, cartItems: resJSON },
		});

		return resJSON;
	};

	const removeItem = async (cartIdItem, token, size, color, item) => {
		const res = await fetch(
			`${apiUrl}/api/CartItems/DeleteCartItem/${cartIdItem}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			}
		);
		const resJSON = await res.json();

		dispatch({
			type: "DELETE_PRODUCT",
			payload: item,
		});

		return resJSON;
	};

	const addItem = async (product, token) => {
		console.log(JSON.stringify(product));

		const res = await fetch(`${apiUrl}/api/CartItems/AddCartItem`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(product),
		});

		dispatch({
			type: "ADD_PRODUCT",
			payload: product,
		});

		return res;
	};

	const updateItem = async (item, token) => {
		console.log(JSON.stringify(item));
		const res = await fetch(`${apiUrl}/api/CartItems/UpdateCartItem`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(item),
		});

		return res;
	};

	const totalPrice = () => {
		const filterItem = cartItemsState?.cartItems?.cartItems?.map((item) => {
			return {
				price: item.productView.price,
				quantity: item.quantityInCart,
			};
		});

		const total = filterItem?.reduce((accumulator, currValue) => {
			return accumulator + currValue.price * currValue.quantity;
		}, 0);

		return total;
	};

	// const totalQuantity = () => {
	// 	console.log(cartItemsState);
	// };

	const CartItemsContextData = {
		getCartItems,
		cartItemsState,
		removeItem,
		addItem,
		updateItem,
		totalPrice,
	};

	return (
		<CartItems.Provider value={CartItemsContextData}>
			{children}
		</CartItems.Provider>
	);
};

export default CartItemsProvider;
