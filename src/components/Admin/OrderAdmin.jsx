import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import img from "../../assets/img/products/10_men-10-black.jpg";
import img2 from "../../assets/img/products/10_men-10-red.jpg";
import { OrderAdminContext } from "../../contexts/Admin/OrderAdminContext";
import { useContext, useEffect, useState } from "react";

const OrderAdmin = () => {
	const {
		getOrdersAdmin,
		ordersAdminState: { orders },
		approveOrder,
	} = useContext(OrderAdminContext);

	const [disabledBtn, setDisabledBtn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("admin_token");
		getOrdersAdmin(token);
	}, [orders]);

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
			// setDisabledBtn(true);
			return "Canceled";
		}
	};

	const handlePayment = (payment) => {
		if (payment) {
			return "Paid";
		} else {
			return "Payment on delivery";
		}
	};

	const approve = (order) => {
		const token = localStorage.getItem("admin_token");
		const { orderId, orderItems, payment, shipping, userName } = order;
		const orderData = {
			orderId: order.orderId,

			userName: order.userName,
			status: 1,
		};
		setDisabledBtn(true);
		approveOrder(token, orderData);
	};

	const deny = (order) => {
		const token = localStorage.getItem("admin_token");
		const { orderId, orderItems, payment, shipping, userName } = order;
		const orderData = {
			orderId: order.orderId,

			userName: order.userName,
			status: -1,
		};
		setDisabledBtn(true);
		approveOrder(token, orderData);
	};

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="my-order-admin">
				<div className="container">
					<div className="row justify-content-end">
						<div className="col-lg-12 p-0">
							<div className="cart-table mb-0">
								<table className="">
									<tr>
										<th>Payment method</th>
										<th>Account</th>
										<th>Status</th>
										<th>Total</th>
										<th>Approve</th>
										<th>Deny</th>
									</tr>
									<tbody>
										{orders?.map((order) => {
											return (
												<tr>
													<td className="cart-pic">
														<span>{handlePayment(order.payment)}</span>
													</td>
													<td className="cart-title text-center">
														<span>{order.userName}</span>
													</td>
													<td className="">
														<span>{handleStatusOrder(order.status)}</span>
													</td>
													<td className="cart-color">
														<span>{order.shipping.shippingCost}</span>
													</td>
													<td className="p-price">
														<button
															className="btn btn-primary"
															onClick={() => [approve(order)]}
															disabled={disabledBtn}
														>
															Approve
														</button>
													</td>
													<td className="qua-col">
														<div className="quantity">
															<div className="cart__quantity border-0">
																<button
																	className="btn btn-danger"
																	onClick={() => {
																		deny(order);
																	}}
																	disabled={disabledBtn}
																>
																	Deny
																</button>
															</div>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderAdmin;
