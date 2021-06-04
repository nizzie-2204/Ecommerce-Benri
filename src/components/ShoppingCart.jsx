import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { CartItems } from "../contexts/CartItems/CartItems";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
	const { loadUser } = useContext(CustomerAuthLogin);
	const { getCartItems, cartItemsState, removeItem, totalPrice, updateItem } =
		useContext(CartItems);
	const {
		cartItems: { cartItems },
	} = cartItemsState;

	const [user, setUser] = useState({});
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const token = localStorage.getItem("user_token");
		const user = loadUser();
		setUser(user);
		if (user) {
			getCartItems(user.userName, token);
		}
		totalPrice();
	}, []);

	const token = localStorage.getItem("user_token");
	const increaseQuantity = (item, size, color) => {
		console.log(item);

		const thisItem = item.productView.sizeOfProductHadColors.find((a) => {
			return a.sizeId === size && a.colorId === color;
		});

		console.log(thisItem);

		if (thisItem.quantityInSizeOfColor <= 0) {
			console.log("Không huốt số lượng trong kho");
			return;
		} else {
			const lastItem = {
				userName: item.userName,
				cartItemId: item.cartItemId,
				quantityInCart: item.quantityInCart + 1,
				sizeId: item.sizeId,
				colorId: item.colorId,
				productId: item.productId,
			};
			const update = updateItem(lastItem, token);
			if (update) {
				console.log("Increase successfully");
			}
		}
	};
	const decreaseQuantity = (item) => {
		if (item.quantityInCart <= 1) {
			console.log("Không < 0");
			return;
		} else {
			const lastItem = {
				userName: item.userName,
				cartItemId: item.cartItemId,
				quantityInCart: item.quantityInCart - 1,
				sizeId: item.sizeId,
				colorId: item.colorId,
				productId: item.productId,
			};
			updateItem(lastItem, token);
			console.log("Decrease successfully");
		}
	};

	const remove = async (cartItemId, token, size, color, item) => {
		removeItem(cartItemId, token, size, color, item);
	};

	const truncateStringMoney = (price) => {
		const a = price?.toString();
		const reverseString = a?.split("").reverse().join("");
		let newString = "";
		for (let i = 0; i < reverseString.length; i++) {
			if (i % 3 === 0 && i !== 0) {
				newString += "." + reverseString[i];
			} else {
				newString += reverseString[i];
			}
		}

		return newString.split("").reverse().join("");
	};

	const totalBeforeTruncate = totalPrice();
	let total;
	if (totalBeforeTruncate) {
		total = truncateStringMoney(totalBeforeTruncate);
	}
	return (
		<>
			<Helmet>
				<title>Benri | Cart</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<section className="shopping-cart spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							{cartItemsState?.cartItems?.cartItems?.length > 0 ? (
								<div className="cart-table">
									<table className="mb-5">
										<thead>
											<tr>
												<th>Image</th>
												<th className="p-name">Product Name</th>
												<th>Size</th>
												<th>Color</th>
												<th>Price</th>
												<th>Quantity</th>
												{/* <th>Total</th> */}
												<th>Remove</th>
											</tr>
										</thead>
										<tbody>
											{cartItemsState?.cartItems?.cartItems?.length > 0 ? (
												cartItemsState?.cartItems?.cartItems?.map((item) => {
													return (
														<tr key={item.cartItemId}>
															<td className="cart-pic">
																<img
																	style={{ width: "170px", height: "170px" }}
																	src={
																		require(`./../assets/img/products/${item.productView.images[0].link.slice(
																			8
																		)}`).default
																	}
																	alt="product"
																/>
															</td>
															<td className="cart-title">
																<h5>{item.productView.productName}</h5>
															</td>
															<td className="">
																<h5>{item.sizeId}</h5>
															</td>
															<td className="cart-color">
																<span>{item.colorId}</span>
															</td>
															<td className="p-price">{`${truncateStringMoney(
																item.productView.price
															)} VND`}</td>
															<td className="qua-col">
																<div className="quantity">
																	<div className="cart__quantity">
																		<div
																			onClick={() => {
																				decreaseQuantity(item);
																			}}
																		>
																			<GrSubtract />
																		</div>
																		<span>{item.quantityInCart}</span>
																		<div
																			onClick={() => {
																				increaseQuantity(
																					item,
																					item.sizeId,
																					item.colorId
																				);
																			}}
																		>
																			<GrAdd />
																		</div>
																	</div>
																</div>
															</td>
															{/* <td className="total-price">$60.00</td> */}
															<td className="close-td">
																<AiFillDelete
																	onClick={() => {
																		remove(
																			item.cartItemId,
																			token,
																			item.colorId,
																			item.sizeId,
																			item
																		);
																	}}
																/>
															</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td>Your cart is empty</td>
												</tr>
											)}
										</tbody>
									</table>
									<div className="row">
										<div className="col-lg-4">
											<div className="cart-buttons">
												<Link to="/shop" className="primary-btn continue-shop">
													Continue shopping
												</Link>
												{/* <button
													className="primary-btn up-cart"
													onClick={truncateStringMoney}
												>
													Update cart
												</button> */}
											</div>
										</div>
										<div className="col-lg-4 offset-lg-4">
											<div className="proceed-checkout">
												<ul>
													<li className="cart-total">
														Total <span>{`${total} VND`}</span>
													</li>
												</ul>
												<Link to="/order" className="proceed-btn">
													PURCHASE
												</Link>
											</div>
										</div>
									</div>
								</div>
							) : (
								<h2 className="text-center">Your cart is empty</h2>
							)}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default ShoppingCart;
