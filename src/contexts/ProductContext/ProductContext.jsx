import React, { createContext, useReducer } from "react";
import { ProductReducer } from "../../reducers/Product/ProductReducer";
import { apiUrl } from ".././Customer/constants";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
	const [productState, dispatch] = useReducer(ProductReducer, {
		products: [],
		womenProduct: [],
		menProduct: [],
		productsLoading: true,
	});

	const getProducts = async () => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();
		dispatch({
			type: "PRODUCTS_lOADED_SUCCESS",
			payload: resJSON,
		});

		return resJSON;
	};

	const getWomenProducts = async () => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();
		const products = resJSON.filter((product) => {
			return product.categoryId === "WOMEN";
		});
		dispatch({
			type: "WOMEN_PRODUCTS_lOADED_SUCCESS",
			payload: products,
		});

		return products;
	};

	const getMenProducts = async () => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();
		const products = resJSON.filter((product) => {
			return product.categoryId === "MEN";
		});
		dispatch({
			type: "MEN_PRODUCTS_lOADED_SUCCESS",
			payload: products,
		});

		return products;
	};

	const searchProduct = async (searchTerm) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		const newProducts = resJSON.filter((item) => {
			return item.productName.toLowerCase().includes(searchTerm.toLowerCase());
		});

		dispatch({
			type: "SEARCH_PRODUCT",
			payload: newProducts,
		});
	};

	const filterCategoryProduct = async (searchTerm) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		const newProducts = resJSON.filter((item) => {
			return item.categoryId === searchTerm;
		});

		dispatch({
			type: "SEARCH_PRODUCT",
			payload: newProducts,
		});
	};

	const filterColorProduct = async (color) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		const newProducts = resJSON.map((item) => {
			const checkColor = item.sizeOfProductHadColors.find((a) => {
				return a.colorId === color;
			});

			if (checkColor !== "undefined") {
				return item;
			}
		});

		dispatch({
			type: "SEARCH_PRODUCT",
			payload: newProducts,
		});
	};

	const filterSizeProduct = async (size) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		const newProducts = resJSON.map((item) => {
			const checkColor = item.sizeOfProductHadColors.find((a) => {
				return a.sizeId === size;
			});

			if (checkColor !== "undefined") {
				return item;
			}
		});

		dispatch({
			type: "SEARCH_PRODUCT",
			payload: newProducts,
		});
	};

	const filterTagProduct = async (tag) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		const newProducts = resJSON.map((item) => {
			const checkColor = item.haveTags.find((a) => {
				return a.tagId === tag;
			});

			if (checkColor !== "undefined") {
				return item;
			}
		});

		dispatch({
			type: "SEARCH_PRODUCT",
			payload: newProducts,
		});
	};

	const sortPrice = async (sortString) => {
		const res = await fetch(`${apiUrl}/api/products/getProducts`);
		const resJSON = await res.json();

		if (sortString === "lowToHigh") {
			const sortedProducts = resJSON.sort((a, b) => {
				return a.price - b.price;
			});
			dispatch({
				type: "SEARCH_PRODUCT",
				payload: sortedProducts,
			});
		} else {
			const sortedProducts = resJSON.sort((a, b) => {
				return b.price - a.price;
			});
			dispatch({
				type: "SEARCH_PRODUCT",
				payload: sortedProducts,
			});
		}
	};

	const ProductContextData = {
		productState,
		getProducts,
		getWomenProducts,
		getMenProducts,
		searchProduct,
		filterCategoryProduct,
		filterColorProduct,
		filterSizeProduct,
		filterTagProduct,
		sortPrice,
	};

	return (
		<ProductContext.Provider value={ProductContextData}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductContextProvider;
