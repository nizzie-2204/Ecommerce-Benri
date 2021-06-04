import React from "react";
import { useParams } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { RiUser3Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
// import img1 from "../assets/img/products/product-1.jpg";

const UserPurchasedOrders = () => {
	let { username } = useParams();
	return (
		<>
			<Header />
			<div className="user-page mt-5 mb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-md-2">
							<div className="user-page-info d-flex flex-column align-items-center justify-content-center">
								<div className="user-page-avt   d-flex align-items-center justify-content-center mb-3">
									<RiUser3Fill />
								</div>
								<p className="mb-0 ">{username}</p>
							</div>
						</div>
						<div className="col-lg-10 col-md-10">
							<h3 className="mb-4">Purchased orders</h3>
							<div className="user-page-purchased-order">
								<div className="purchased-order-list">
									<div className="cart-table">
										<table>
											<thead>
												<tr>
													<th>Image</th>
													<th className="p-name">Product Name</th>
													<th>Color</th>
													<th>Price</th>
													<th>Quantity</th>
													<th>Total</th>
													<th>Remove</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="cart-pic">
														{/* <img
															src={img1}
															style={{ width: "170px", height: "170px" }}
															alt=""
														/> */}
													</td>
													<td className="cart-title">
														<h5>Guangzhou sweater</h5>
													</td>
													<td className="cart-color">
														<span>Red</span>
													</td>
													<td className="p-price">$60.00</td>
													<td className="qua-col">
														<div className="quantity">1</div>
													</td>
													<td className="total-price">$60.00</td>
													<td className="close-td">
														<AiFillDelete />
													</td>
												</tr>
												<tr>
													<td className="cart-pic">
														{/* <img
															src={img1}
															style={{ width: "170px", height: "170px" }}
															alt=""
														/> */}
													</td>
													<td className="cart-title">
														<h5>Guangzhou sweater</h5>
													</td>
													<td className="cart-color">
														<span>Red</span>
													</td>
													<td className="p-price">$60.00</td>
													<td className="qua-col">
														<div className="quantity">1</div>
													</td>
													<td className="total-price">$60.00</td>
													<td className="close-td">
														<AiFillDelete />
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserPurchasedOrders;
