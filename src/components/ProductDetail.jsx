import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { useParams } from "react-router";
import { ProductContext } from "../contexts/ProductContext/ProductContext";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { BsCheck } from "react-icons/bs";
import { CartItems } from "../contexts/CartItems/CartItems";
import { Carousel } from "react-responsive-carousel";

const ProductDetail = (props) => {
	const {
		getProducts,
		productState: { products, productsLoading },
	} = useContext(ProductContext);
	const { id } = useParams();
	const { addItem } = useContext(CartItems);

	const { authState: isAuthennicated } = useContext(CustomerAuthLogin);

	// Get this product
	const product = products.find((item) => {
		return item.productId === parseInt(id);
	});

	const sizeBtn = ["S", "M", "L", "XL"];
	const colorBtn = ["RED", "YELLOW", "BLUE", "BLACK"];
	const [activeBtnSize, setActiveBtnSize] = useState(null);
	const [activeBtnColor, setActiveBtnColor] = useState(null);

	// Get size and color
	const sizeOfProduct = product?.sizeOfProductHadColors.map((item) => {
		return item.sizeId;
	});
	const uniqueSize = [...new Set(sizeOfProduct)];
	const stateSize = {
		S: false,
		M: false,
		L: false,
		XL: false,
	};

	uniqueSize.forEach((size) => {
		if (size === "S") {
			stateSize.S = true;
		}
		if (size === "M") {
			stateSize.M = true;
		}
		if (size === "L") {
			stateSize.L = true;
		}
		if (size === "XL") {
			stateSize.XL = true;
		}
	});

	const colorOfProduct = product?.sizeOfProductHadColors.map((item) => {
		return item.colorId;
	});
	const uniqueColor = [...new Set(colorOfProduct)];
	const stateColor = {
		BLACK: false,
		BLUE: false,
		RED: false,
		YELLOW: false,
	};

	uniqueColor.forEach((color) => {
		if (color === "BLACK") {
			stateColor.BLACK = true;
		}
		if (color === "BLUE") {
			stateColor.BLUE = true;
		}
		if (color === "RED") {
			stateColor.RED = true;
		}
		if (color === "YELLOW") {
			stateColor.YELLOW = true;
		}
	});

	const [disableBtn, setDisableBtn] = useState({
		RED: true,
		BLUE: true,
		YELLOW: true,
		BLACK: true,
	});

	const [stateQuantity, setStateQuantity] = useState({
		size: null,
		color: null,
	});

	// Get color from size
	const getColorFromSize = (e, size) => {
		setActiveBtnColor(null);
		setStateQuantity({
			...stateQuantity,
			size: size,
			color: null,
		});

		let colors = [];
		product.sizeOfProductHadColors.forEach((item) => {
			if (item.sizeId === size) {
				colors.push(item.colorId);
			}
		});
		let colorSet = {
			RED: true,
			BLUE: true,
			YELLOW: true,
			BLACK: true,
		};
		colors.map((color) => {
			colorSet[color] = false;
		});
		setDisableBtn(colorSet);
	};

	// Quantity
	const [maxQuantity, setMaxQuantity] = useState(1);
	const [defaultQuantity, setDefaultQuantity] = useState(1);

	const increaseQuantity = () => {
		if (defaultQuantity >= maxQuantity) {
			return;
		} else {
			setDefaultQuantity(defaultQuantity + 1);
		}
	};
	const decreaseQuantity = () => {
		if (defaultQuantity <= 1) {
			return;
		} else {
			setDefaultQuantity(defaultQuantity - 1);
		}
	};

	const getColor = (color) => {
		const quantity = product?.sizeOfProductHadColors.find((item) => {
			return item.sizeId === stateQuantity.size && item.colorId === color;
		});
		setStateQuantity({
			...stateQuantity,
			color: color,
		});
		setMaxQuantity(quantity?.quantityInSizeOfColor);
	};

	const [messageAddToCart, setMessageAddToCart] = useState(null);

	const add = async (product) => {
		if (isAuthennicated.isAuthennicated === false) {
			setMessageAddToCart("You are not logged in");
			setTimeout(() => {
				setMessageAddToCart(null);
			}, 2000);
			return;
		} else {
			const user = localStorage.getItem("user_login");
			const token = localStorage.getItem("user_token");
			const { userName } = JSON.parse(user);

			const a = {
				username: userName,
				quantityInCart: defaultQuantity,
				sizeId: stateQuantity.size,
				colorId: stateQuantity.color,
				productId: product.productId,
			};

			if (
				a.username === "" ||
				a.quantityInCart === 0 ||
				a.sizeId === null ||
				a.colorId === null ||
				a.productId === ""
			) {
				setMessageAddToCart("Missing product information");
				setTimeout(() => {
					setMessageAddToCart(null);
				}, 2000);
				return;
			} else {
				const b = addItem(a, token);
				if (b) {
					setMessageAddToCart("Add product to cart successfully");
					setTimeout(() => {
						setMessageAddToCart(null);
					}, 2000);
				}
			}
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<Header />
			<div className="product__detail pt-5 pb-5" key={product?.productId}>
				<div className="container">
					<div className="row ">
						<div className="col-lg-4 pr-0 mr-4">
							<Carousel swipeScrollTolerance={3}>
								{product?.images &&
									product?.images.map((image) => {
										return (
											<div>
												<img
													src={
														require(`./../assets/img/products/${image.link.slice(
															8
														)}`).default
													}
													alt="product"
												/>
											</div>
										);
									})}
							</Carousel>
						</div>
						<div className="col-lg-6">
							<div className="product__detail-info">
								<h3 className="product__detail-info--name">
									{product?.productName}
								</h3>
								<p className="product__detail-info--price">{`$${product?.price}`}</p>
								<p className="product__detail-info--des">
									{product?.productDescription}
								</p>
								<div className="product__detail-info--size">
									<div className="row">
										<div className="col-lg-3">
											<p>Size</p>
										</div>
										<div className="col-lg-8 d-flex pr-5 ml-4">
											{sizeBtn.map((size, index) => {
												return (
													<button
														onClick={(e) => {
															getColorFromSize(e, size);
															setActiveBtnSize(index);
														}}
														className={
															index === activeBtnSize
																? "product-size-active product__detail-info--color"
																: "product__detail-info--color"
														}

														// "product__detail-info--color"
													>
														{size}
													</button>
												);
											})}
										</div>
									</div>
								</div>
								<div className="product__detail-info--color">
									<div className="row">
										<div className="col-lg-3">
											<p>Color</p>
										</div>
										<div className="col-lg-8 d-flex m-0">
											{colorBtn.map((color, index) => {
												return (
													<button
														onClick={() => {
															getColor(color);
															setActiveBtnColor(index);
														}}
														className={
															index === activeBtnColor
																? "product-size-active product__detail-info--color"
																: "product__detail-info--color"
														}
														disabled={disableBtn[color]}
													>
														{color}
													</button>
												);
											})}
										</div>
									</div>
								</div>
								<div className="d-flex">
									<div className="modal__quantity pt-2 pb-2">
										<div onClick={decreaseQuantity}>
											<GrSubtract />
										</div>
										<span>{defaultQuantity}</span>
										<div onClick={increaseQuantity}>
											<GrAdd />
										</div>
									</div>
									<button
										type="button"
										className="product__detail-action"
										onClick={() => {
											add(product);
											setDisableBtn({
												...disableBtn,
												first: !disableBtn.first,
												second: !disableBtn.second,
											});
										}}
									>
										Add to cart
									</button>
								</div>
								{messageAddToCart === "Add product to cart successfully" ? (
									<p className="mt-2 text-success message-add">
										{messageAddToCart}
									</p>
								) : (
									<p className="mt-2 text-danger message-add">
										{messageAddToCart}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductDetail;
