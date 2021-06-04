import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import { FaShoppingBag, FaRandom } from "react-icons/fa";
import QuickView from "./QuickView";
import { Link } from "react-router-dom";

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};
const MultiCarousel = ({ products, productsLoading }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState(false);

	function openModal() {
		setIsOpen(!isOpen);
	}
	function closeModal() {
		setIsOpen(!isOpen);
	}

	return (
		<Carousel responsive={responsive} className="product-slider">
			{products &&
				products.map((product) => {
					return (
						<div className="product-item" key={product.productId}>
							<div className="pi-pic">
								<img
									src={
										require(`./../assets/img/products/${product?.images[0]?.link?.slice(
											8
										)}`).default
									}
									alt="product"
								/>
								<div className="sale">Sale</div>
								<div className="icon">
									<i className="icon_heart_alt"></i>
								</div>
								<ul
									className={
										active ? "quick-view inactive-pi-pic-ul" : "quick-view"
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
								<div className="catagory-name">Coat</div>
								<a href="#">
									<h5>Pure Pineapple</h5>
								</a>
								<div className="product-price">$14.00</div>
							</div>
						</div>
					);
				})}
		</Carousel>
	);
};

export default MultiCarousel;
