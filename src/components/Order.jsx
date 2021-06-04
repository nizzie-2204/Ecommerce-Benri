import React, { useContext, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Footer from "./Footer";
import Header from "./Header";
import { CartItems } from "../contexts/CartItems/CartItems";
import StripeContainer from "./Payment/StripeContainer";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { OrderContext } from "../contexts/Order/OrderContext";

import { GrSubtract, GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";

const Order = () => {
	const [activeStyleBtn, setActiveStyleBtn] = useState(false);

	const onActiveStyleBtn = () => {
		setActiveStyleBtn(!activeStyleBtn);
	};
	const { loadUser } = useContext(CustomerAuthLogin);

	const { getOrder, addOrderByCash, addOrderByVisa } = useContext(OrderContext);
	const { getCartItems, cartItemsState, removeItem, totalPrice } =
		useContext(CartItems);
	const {
		cartItems: { cartItems },
	} = cartItemsState;

	useEffect(() => {
		const token = localStorage.getItem("user_token");
		setTokenUser(token);
		const user = loadUser();
		setUser(user);
		if (user) {
			getCartItems(user.userName, token);
			setAddressInput(user.address);
		}
		totalPrice();
	}, []);

	const [user, setUser] = useState({});
	const [disableInput, setDisableInput] = useState(true);
	const [addressInput, setAddressInput] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("delivery");
	const [tokenUser, setTokenUser] = useState(null);
	const totalBeforeTruncate = totalPrice();

	const [visaForm, setVisaForm] = useState({
		total: totalBeforeTruncate,
		email: "",
		description: "",
		number: "",
		expMonth: "",
		expYear: "",
		cvc: "",
	});

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const shippingObject = {
			ShipPhoneNumber: user.phoneNumber,
			ShipFullName: user.fullName,
			ShipAdress: addressInput,
			ShippingCost: totalBeforeTruncate,
		};

		const visaFormData = {
			...visaForm,
			expMonth: parseInt(visaForm.expMonth),
			expYear: parseInt(visaForm.expYear),
		};

		const res = addOrderByVisa(
			user.userName,
			shippingObject,
			tokenUser,
			visaFormData
		);
		if (res) {
			console.log("Order by visa successfully");
		}
	};

	const handleOnChangeVisaForm = (e) => {
		setVisaForm({ ...visaForm, [e.target.name]: e.target.value });
	};

	const orderByCash = async () => {
		const shippingObject = {
			ShipPhoneNumber: user.phoneNumber,
			ShipFullName: user.fullName,
			ShipAdress: addressInput,
			ShippingCost: totalBeforeTruncate,
		};

		const res = addOrderByCash(user.userName, shippingObject, tokenUser);
		if (res) {
			console.log("Order by cash successfully");
		} // Order successfully => link to my orders
	};

	const onHandleEnableInput = () => {
		setDisableInput(false);
	};

	const onHandleDisableInput = () => {
		setDisableInput(true);
	};

	const onHandleChangeInput = (e) => {
		setAddressInput(e.target.value);
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

	let total;
	if (totalBeforeTruncate) {
		total = truncateStringMoney(totalBeforeTruncate);
	}

	return (
		<>
			<Header />
			<div className="order">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 mb-4  pt-3 pb-3 pl-4 pr-4 order-delivery">
							<div className="order-title d-flex align-items-center">
								<IoLocationSharp className="mr-2" />
								<span>Delivery Address</span>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<div className="order-info d-flex flex-column">
										<span>{user.fullName}</span>
										<span>{user.phoneNumber}</span>
									</div>
								</div>
								<div className="col-lg-9">
									<div className="container">
										<div className="row">
											<div className="col-lg-9 order-address">
												<input
													type="text"
													name=""
													id=""
													value={addressInput}
													disabled={disableInput}
													onChange={onHandleChangeInput}
													form="visaForm"
												/>
											</div>
											<div className="col-lg-3 justify-content-end order-address-action d-flex">
												<button
													className="mr-3"
													type="button"
													onClick={onHandleEnableInput}
												>
													Edit
												</button>
												<button type="button" onClick={onHandleDisableInput}>
													Save
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-12 p-0 mb-4 ">
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
																	<div className="cart__quantity border-0">
																		<span>{item.quantityInCart}</span>
																	</div>
																</div>
															</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td>Your order is empty</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							) : (
								<h2 className="text-center">Your cart is empty</h2>
							)}
						</div>
						<div className="col-lg-12 mb-4 p-0">
							<div className="row align-items-center mb-4">
								<div className="col-lg-2">
									<div className="payment-methods">Payment methods</div>
								</div>
								<div className="col-lg-6 payment-methods-option">
									<button
										type="button"
										className={
											activeStyleBtn
												? "mr-3 payment-methods-option-active"
												: "mr-3"
										}
										onClick={() => {
											onActiveStyleBtn();
											setPaymentMethod("visa");
										}}
									>
										Stripe
									</button>
									<button
										type="button"
										className={
											!activeStyleBtn ? "payment-methods-option-active" : null
										}
										onClick={() => {
											onActiveStyleBtn();
											setPaymentMethod("delivery");
										}}
									>
										Payment on delivery
									</button>
								</div>
							</div>
							<div className="row align-items-center">
								<div className="col-lg-12 d-flex p-0 justify-content-end">
									{activeStyleBtn ? (
										<div className="col-lg-8">
											<form
												id="visaForm"
												className="bg-light p-4"
												onSubmit={handleOnSubmit}
											>
												<div className="input-group d-flex flex-column  mb-3">
													<label htmlFor="email " className="font-weight-bold">
														EMAIL
													</label>
													<input
														type="email"
														id="email"
														placeholder="ex: myname@example.com"
														name="email"
														value={visaForm.email}
														autoComplete="off"
														class="form-control w-100"
														required
														onChange={handleOnChangeVisaForm}
													/>
												</div>
												<div className="input-group mb-3 d-flex flex-column ">
													<label htmlFor="desc" className="font-weight-bold">
														DESCRIPTION
													</label>
													<textarea
														name="description"
														value={visaForm.description}
														rows="2"
														cols="50"
														class="form-control w-100"
														placeholder="Note to Seller"
														onChange={handleOnChangeVisaForm}
													></textarea>
												</div>
												<div class="form-group mb-3">
													<label for="cardNumber" className="font-weight-bold">
														CARD NUMBER
													</label>
													<div class="input-group">
														<input
															type="text"
															class="form-control"
															id="cardNumber"
															minLength="16"
															maxLength="16"
															name="number"
															value={visaForm.number}
															placeholder="Valid Card Number"
															required
															autofocus
															onChange={handleOnChangeVisaForm}
														/>
														<span class="input-group-addon">
															<span class="glyphicon glyphicon-lock"></span>
														</span>
													</div>
												</div>
												<div class="row">
													<div class="col-xs-7 col-md-7">
														<div class="form-group mb-3">
															<label
																for="expityMonth"
																className="font-weight-bold"
															>
																EXPIRY DATE
															</label>
															<div className="d-flex">
																<input
																	type="text"
																	minLength="2"
																	maxLength="2"
																	class="form-control mr-2"
																	name="expMonth"
																	value={visaForm.expMonth}
																	id="expMth"
																	placeholder="MM"
																	required
																	onChange={handleOnChangeVisaForm}
																/>
																<input
																	type="text"
																	minLength="4"
																	maxLength="4"
																	class="form-control"
																	id="expYear"
																	name="expYear"
																	value={visaForm.expYear}
																	placeholder="YY"
																	required
																	onChange={handleOnChangeVisaForm}
																/>
															</div>
														</div>
													</div>
													<div class="col-xs-5 col-md-5 pull-right">
														<div class="form-group">
															<label for="cvCode" className="font-weight-bold">
																CV CODE
															</label>
															<input
																type="text"
																class="form-control"
																minLength="3"
																maxLength="3"
																id="cvCode"
																placeholder="CV"
																required
																name="cvc"
																value={visaForm.cvc}
																onChange={handleOnChangeVisaForm}
															/>
														</div>
													</div>
												</div>
											</form>
										</div>
									) : null}
									<div className="col-lg-4 ">
										<div className="proceed-checkout">
											<ul>
												<li className="cart-total">
													Total <span>{`${total} VND`}</span>
												</li>
											</ul>
											{activeStyleBtn ? (
												<button
													// to="/my-order"
													type="submit"
													form="visaForm"
													className="proceed-btn"
													onSubmit={handleOnSubmit}
												>
													ORDER
												</button>
											) : null}
											{!activeStyleBtn ? (
												<Link
													to="/my-order"
													className="proceed-btn"
													onClick={orderByCash}
												>
													ORDER
												</Link>
											) : null}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="container pr-0">
							<div className="row justify-content-end"></div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Order;
