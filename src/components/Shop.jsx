import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../../node_modules/rc-slider/assets/index.css";
// import img1 from "../assets/img/products/product-1.jpg";
import { FaShoppingBag, FaRandom } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import QuickView from "./QuickView";
import { ProductContext } from "../contexts/ProductContext/ProductContext";
import { Helmet } from "react-helmet";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Shop = () => {
	const [show, setShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState(false);

	const customStyles = {
		content: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "900px",
			height: "500px",
			display: "flex",
			alignItem: "center",
			border: "none",
		},
	};
	const {
		addProduct,
		getProducts,
		searchProduct,
		filterCategoryProduct,
		filterColorProduct,
		filterSizeProduct,
		filterTagProduct,
		sortPrice,
		productState: { products, productsLoading },
	} = useContext(ProductContext);

	useEffect(() => {
		window.scrollTo(0, 0);
		getProducts();
	}, []);

	console.log(products);

	const filterProduct = (filterTerm) => {
		filterCategoryProduct(filterTerm);
	};

	const filterColor = (color) => {
		filterColorProduct(color);
	};

	const filterSize = (size) => {
		filterSizeProduct(size);
	};

	const filterTag = (tag) => {
		filterTagProduct(tag);
	};

	const onChangeOption = (e) => {
		console.log(e.target.value);
		sortPrice(e.target.value);
	};

	function openModal() {
		setIsOpen(!isOpen);
	}
	function closeModal() {
		setIsOpen(!isOpen);
	}

	const [quantity, setQuantity] = useState(1);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};
	const decreaseQuantity = () => {
		if (quantity <= 1) {
			return;
		} else {
			setQuantity(quantity - 1);
		}
	};

	return (
		<>
			<Helmet>
				<title>Benri | Shop</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<section className="product-shop spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
							<div className="filter-widget">
								<h4 className="fw-title">Categories</h4>
								<ul className="filter-catagories">
									<li>
										<button
											className="border-0 bg-white mb-4"
											onClick={() => {
												filterProduct("MEN");
											}}
										>
											Men
										</button>
									</li>
									<li>
										<button
											className="border-0 bg-white mb-4"
											onClick={() => {
												filterProduct("WOMEN");
											}}
										>
											Women
										</button>
									</li>
									<li>
										<button
											className="border-0 bg-white mb-4"
											onClick={() => {
												filterProduct("KID");
											}}
										>
											Kids
										</button>
									</li>
								</ul>
							</div>

							<div className="filter-widget">
								<h4 className="fw-title">Color</h4>
								<div className="fw-color-choose">
									<div className="cs-item">
										<input type="radio" id="cs-red" />
										<label
											className="cs-red"
											htmlFor="cs-red"
											onClick={() => {
												filterColor("RED");
											}}
										>
											Red
										</label>
									</div>

									<div className="cs-item">
										<input type="radio" id="cs-blue" />
										<label
											className="cs-blue"
											htmlFor="cs-blue"
											onClick={() => {
												filterColor("BLUE");
											}}
										>
											Blue
										</label>
									</div>
									<div className="cs-item">
										<input type="radio" id="cs-green" />
										<label
											className="cs-yellow"
											htmlFor="cs-green"
											onClick={() => {
												filterColor("YELLOW");
											}}
										>
											Yellow
										</label>
									</div>
									<div className="cs-item">
										<input type="radio" id="cs-green" />
										<label
											className="cs-black"
											htmlFor="cs-green"
											onClick={() => {
												filterColor("BLACK");
											}}
										>
											Black
										</label>
									</div>
									<br />
								</div>
							</div>
							<div className="filter-widget">
								<h4 className="fw-title">Size</h4>
								<div className="fw-size-choose">
									<div className="sc-item">
										<input type="radio" id="s-size" />
										<label
											htmlFor="s-size"
											onClick={() => {
												filterSize("S");
											}}
										>
											s
										</label>
									</div>
									<div className="sc-item">
										<input type="radio" id="m-size" />
										<label
											htmlFor="m-size"
											onClick={() => {
												filterSize("M");
											}}
										>
											m
										</label>
									</div>
									<div className="sc-item">
										<input type="radio" id="l-size" />
										<label
											htmlFor="l-size"
											onClick={() => {
												filterSize("L");
											}}
										>
											l
										</label>
									</div>
									<div className="sc-item">
										<input type="radio" id="xs-size" />
										<label
											htmlFor="xs-size"
											onClick={() => {
												filterSize("XL");
											}}
										>
											xl
										</label>
									</div>
								</div>
							</div>
							<div className="filter-widget">
								<h4 className="fw-title">Tags</h4>
								<div className="fw-tags">
									<button
										type="button"
										onClick={() => {
											filterTagProduct("cotton");
										}}
									>
										cotton
									</button>
									<button
										type="button"
										onClick={() => {
											filterTagProduct("hiphop");
										}}
									>
										hiphop
									</button>
									<button
										type="button"
										onClick={() => {
											filterTagProduct("luxury");
										}}
									>
										luxury
									</button>
									<button
										type="button"
										onClick={() => {
											filterTagProduct("short");
										}}
									>
										short
									</button>
									<button
										type="button"
										onClick={() => {
											filterTagProduct("street");
										}}
									>
										street
									</button>
									<button
										type="button"
										onClick={() => {
											filterTagProduct("wool");
										}}
									>
										wool
									</button>
								</div>
							</div>
						</div>
						<div className="col-lg-9 order-1 order-lg-2">
							<div className="product-show-option">
								<div className="row">
									<div className="col-lg-7 col-md-7">
										<div className="select-option">
											<p className="mr-4">Sort by: </p>
											<select className="sorting" onChange={onChangeOption}>
												<option>Price</option>

												<option value="lowToHigh">Price: Low to High</option>
												<option value="highToLow">Price: High to Low</option>
											</select>
											<RiArrowDownSLine className="select-option-icon" />
											<button type="button">Newest Arrivals</button>
										</div>
									</div>
								</div>
							</div>
							<div className="product-list">
								<div className="row">
									{products &&
										products.map((product) => {
											return !product.isDisable ? (
												<div
													className="col-lg-4 col-sm-6"
													key={product.productId}
												>
													<div className="product-item">
														<div className="pi-pic">
															{product?.images[0] && (
																<img
																	src={
																		require(`./../assets/img/products/${product.images[0].link.slice(
																			8
																		)}`).default
																	}
																	alt="product"
																/>
															)}
															<div className="sale">Sale</div>
															<div className="icon">
																<i className="icon_heart_alt"></i>
															</div>
															<ul
																className={
																	active
																		? "quick-view inactive-pi-pic-ul"
																		: "quick-view"
																}
															>
																<li className="w-icon active d-flex align-items-center justify-content-center">
																	<div
																		style={{
																			backgroundColor: "#e7ab3c",
																			color: "#fff",
																			height: "100%",
																			padding: "5px 8px",
																			fontSize: "18px",
																		}}
																	>
																		<FaShoppingBag />
																	</div>
																</li>
																<li>
																	{product && (
																		<Link
																			className="btn btn-primary"
																			className="cd-trigger"
																			to={`/product-detail/${product.productId}`}
																			img={product.images}
																			name={product.productName}
																			price={product.price}
																			des={product.productDescription}
																			quantity={product.storageQuantity}
																		>
																			View Detail
																		</Link>
																	)}
																</li>
																<li className="w-icon">
																	<a href="/">
																		<FaRandom />
																	</a>
																</li>
															</ul>
														</div>
														<div className="pi-text">
															<div className="catagory-name">Towel</div>
															<h5>{product.productName}</h5>
															<div className="product-price">{`$${product.price}`}</div>
														</div>
													</div>
												</div>
											) : null;
										})}
								</div>
							</div>
							<div className="loading-more">
								<i className="icon_loading"></i>
								<a href="#"> Loading More </a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Shop;
