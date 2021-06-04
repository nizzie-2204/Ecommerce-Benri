import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/Order/OrderContext";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import Footer from "./Footer";
import Header from "./Header";
import img from "../../src/assets/img/products/10_men-10-black.jpg";
import img2 from "../../src/assets/img/products/10_men-10-red.jpg";

const MyOrder = () => {
	const {
		orderState: { orders },
		getAllOrders,
		denyOrder,
	} = useContext(OrderContext);
	const { loadUser, authState } = useContext(CustomerAuthLogin);
	const [tokenUser, setTokenUser] = useState(null);
	const [user, setUser] = useState(null);
	const [disabledCancel, setDisabledCancel] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("user_token");
		setTokenUser(token);

		const userLoad = loadUser();
		setUser(userLoad?.userName);
		getAllOrders(token, userLoad?.userName);
	}, [orders]);

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

	const deny = (order) => {
		const token = localStorage.getItem("user_token");
		const { orderId, orderItems, payment, shipping, userName } = order;
		const orderData = {
			orderId: order.orderId,

			userName: order.userName,
			status: -3,
		};
		setDisabledCancel(true);
		denyOrder(token, orderData);
	};

	const handleStatusOrder = (status) => {
		if (status === 0) {
			return "Not confirm";
		}

		if (status === 1) {
			return "Confirmed";
		}

		if (status === 2) {
			return "Delivering";
		}

		if (status === 3) {
			return "Delivered";
		}

		if (status === -1) {
			return "Delivery failed";
		}

		if (status === -3) {
			return "Canceled";
		}
	};

	return (
		<>
			<Header />
			<div className="my-order mt-5 mb-5">
				<div className="container">
					<div className="row justify-content-end">
						{orders?.map((order) => {
							return (
								<>
									<div className="col-lg-12">
										<div className="cart-table mb-0">
											<table>
												<thead>
													<tr>
														<th></th>
														<th></th>
														<th></th>
														<th>Status</th>
														<th>{handleStatusOrder(order.status)}</th>
													</tr>
													<tr className="border-0">
														<th>PRODUCT NAME</th>
														<th>COLOR</th>
														<th>SIZE</th>
														<th>QUANTITY</th>
														<th>PRICE</th>
													</tr>
												</thead>

												{order.orderItems.map((item) => {
													return (
														<tbody>
															<tr>
																<td>
																	<h5>{item.productName}</h5>
																</td>
																<td>
																	<span>{item.colorId}</span>
																</td>
																<td>
																	<span>{item.sizeId}</span>
																</td>
																<td>
																	<span>{item.quantityInOrder}</span>
																</td>
																<td>
																	<span>{truncateStringMoney(item.price)}</span>
																</td>
																{/* <td className="qua-col">
																	<div className="quantity">
																		<div className="cart__quantity border-0">
																			<span>123</span>
																		</div>
																	</div>
																</td> */}
															</tr>
														</tbody>
													);
												})}
											</table>
										</div>
									</div>
									<div className="col-lg-4 offset-lg-4 mb-5 d-flex flex-column justify-content-end">
										<div className="proceed-checkout">
											<ul className="mb-0">
												<li className="cart-total">
													Total{" "}
													<span>
														{truncateStringMoney(order.shipping.shippingCost)}
													</span>
												</li>
											</ul>
										</div>
										<button
											className="my-order-cancel btn-danger font-weight-bold"
											onClick={() => {
												deny(order);
											}}
											disabled={disabledCancel}
										>
											CANCEL
										</button>
									</div>
								</>
							);
						})}
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default MyOrder;
