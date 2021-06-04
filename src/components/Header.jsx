import React, { useEffect, useContext, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaUserAlt } from "react-icons/fa";
import { FaSearch, FaBars, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../assets/img/logo-header.png";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { CartItems } from "../contexts/CartItems/CartItems";
import { ProductContext } from "../contexts/ProductContext/ProductContext";

const Header = () => {
	const { authState, logoutUser, loadUser } = useContext(CustomerAuthLogin);
	const { isAuthenticated } = authState;
	const { getCartItems, cartItemsState, totalPrice } = useContext(CartItems);
	const {
		cartItems: { cartItems },
	} = cartItemsState;
	const {
		searchProduct,
		productState: { products, productsLoading },
	} = useContext(ProductContext);

	const [user, setUser] = useState(null);

	const history = useHistory();

	const logout = () => {
		logoutUser();
		history.push("/login");
	};

	useEffect(() => {
		const token = localStorage.getItem("user_token");
		const user = loadUser();
		setUser(user);
		if (user) {
			getCartItems(user.userName, token);
		}
		totalPrice();
	}, [cartItems]);

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

	const [searchTerm, setSearchTerm] = useState("");

	const onChangeSearchTerm = (e) => {
		setSearchTerm(e.target.value);
	};

	const search = (e) => {
		e.preventDefault();
		history.push("/shop");
		searchProduct(searchTerm);
	};

	return (
		<>
			<header className="header-section">
				<div className="header-top">
					<div className="container">
						<div className="row align-items-center justify-content-between">
							<div className="ht-left col-lg-4 d-flex align-items-center  ">
								<div className="mail-service">
									<i className="fa fa-envelope"></i>
									benri@gmail.com
								</div>
								<div className="phone-service">
									<i className="fa fa-phone"></i>
									+84 11.188.888
								</div>
							</div>
							<div className="ht-right col-lg-4 d-flex align-items-center justify-content-end">
								<div className="top-social">
									<Link to="/">
										<FaFacebookF />
									</Link>
									<Link to="/">
										<FaInstagram />
									</Link>
								</div>
								{user ? (
									<div className="d-flex align-items-center ml-3 logout">
										<Link
											to={`/user/purchase/${user.userName}`}
											className="login-panel"
										>
											<FaUserAlt />
											<span>{`${user.userName}`}</span>
										</Link>
										<div className="user-dropdown d-flex flex-column align-items-center ">
											<Link
												to={`/user/profile/${user.userName}`}
												className="pt-2 pb-2"
											>
												My profile
											</Link>
											<Link to={`/my-order`} className="pt-2 pb-2">
												My order
											</Link>
											<button
												type="button"
												className="pt-2 pb-2 pl-0 pr-0"
												onClick={logout}
											>
												Logout
											</button>
											<div className="user-dropdown-arrow"></div>
										</div>
									</div>
								) : (
									<Link to="/login" className="login-panel ml-3">
										<FaUserAlt />

										<span>Login</span>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="inner-header">
						<div className="row">
							<div className="col-lg-2 col-md-2">
								<div className="logo p-0">
									<Link to="/">
										<img src={logo} alt="" />
									</Link>
								</div>
							</div>
							<div className="col-lg-9 col-md-7">
								<form className="advanced-search" onSubmit={search}>
									<div className="input-group">
										<input
											type="text"
											placeholder="What do you need?"
											value={searchTerm}
											onChange={onChangeSearchTerm}
										/>
										<button type="submit" className="btn">
											{/* <i className="ti-search"></i> */}
											<FaSearch />
										</button>
									</div>
								</form>
							</div>
							<div className="col-lg-1 text-right col-md-3">
								<ul className="nav-right">
									<li className="cart-icon">
										<Link to="/cart">
											<FaShoppingCart className="cart" />
											{cartItemsState?.cartItems?.cartItems &&
											isAuthenticated ? (
												<span>
													{cartItemsState?.cartItems?.cartItems.length}
												</span>
											) : (
												<span>0</span>
											)}
										</Link>
										<div className="cart-hover">
											<div className="cart-icon-arrow"></div>
											<div className="select-items">
												<table>
													<tbody>
														{cartItemsState?.cartItems?.cartItems &&
														isAuthenticated
															? cartItemsState?.cartItems?.cartItems?.map(
																	(item) => {
																		return (
																			<tr key={item.cartItemId}>
																				<td className="si-pic">
																					<img
																						src={
																							require(`./../assets/img/products/${item.productView.images[0].link.slice(
																								8
																							)}`).default
																						}
																						alt="product"
																					/>
																				</td>
																				<td className="si-text">
																					<div className="product-selected">
																						<p>{`${truncateStringMoney(
																							item.productView.price
																						)} VND x ${
																							item.quantityInCart
																						}`}</p>
																						<h6>
																							{item.productView.productName}
																						</h6>
																					</div>
																				</td>
																				<td className="si-close">
																					<i className="ti-close"></i>
																				</td>
																			</tr>
																		);
																	}
															  )
															: null}
													</tbody>
												</table>
											</div>
											<div className="select-total">
												<span>total:</span>

												{cartItemsState?.cartItems?.cartItems &&
												isAuthenticated &&
												total ? (
													<h5>{`${total} VND`}</h5>
												) : (
													<h5>0</h5>
												)}
											</div>
											<div className="select-button">
												<Link to="/cart" className="primary-btn view-card">
													VIEW CARD
												</Link>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="nav-item">
					<div className="container">
						<div className="nav-depart">
							<div className="depart-btn">
								<FaBars />
								<span>All departments</span>
								<ul className="depart-hover">
									<li>
										<Link to="/">Women’s Clothing</Link>
									</li>
									<li>
										<Link to="/">Men’s Clothing</Link>
									</li>
									<li>
										<Link to="/">Underwear</Link>
									</li>
									<li>
										<Link to="/">Kid's Clothing</Link>
									</li>
									<li>
										<Link to="/">Brand Fashion</Link>
									</li>
									<li>
										<Link to="/">Accessories/Shoes</Link>
									</li>
									<li>
										<Link to="/">Luxury Brands</Link>
									</li>
									<li>
										<Link to="/">Brand Outdoor Apparel</Link>
									</li>
								</ul>
								<FaCaretDown className="arrow" />
							</div>
						</div>
						<nav className="nav-menu mobile-menu">
							<ul>
								<li>
									<NavLink to="/" activeClassName="active" exact>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink to="/shop" activeClassName="active" exact>
										Shop
									</NavLink>
								</li>

								<li>
									<NavLink to="/contact" activeClassName="active" exact>
										Contact
									</NavLink>
								</li>
								<li>
									<Link to="/">Pages</Link>
									<ul className="dropdown">
										<li>
											<NavLink to="/cart" activeClassName="active">
												Shopping Cart
											</NavLink>
										</li>

										<li>
											<NavLink to="/register" activeClassName="active">
												Register
											</NavLink>
										</li>
										<li>
											<NavLink to="/login" activeClassName="active">
												Login
											</NavLink>
										</li>
									</ul>
								</li>
							</ul>
						</nav>
						<div id="mobile-menu-wrap"></div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
