import React, { useContext, useEffect } from "react";
import women_large from "../assets/img/products/women-large.jpg";
import MultiCarousel from "./MultiCarousel";
import { ProductContext } from "../contexts/ProductContext/ProductContext";

const WomenBanner = () => {
	const {
		productState: { products, productsLoading, womenProduct },
		getWomenProducts,
	} = useContext(ProductContext);

	useEffect(() => {
		getWomenProducts();
	}, []);

	const productsProps = womenProduct.slice(4, 8);

	return (
		<section className="women-banner spad">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3">
						<div
							className="product-large set-bg bg-women"
							data-setbg="img/products/women-large.jpg"
						>
							<h2>Women’s</h2>
						</div>
					</div>
					<div className="col-lg-8 offset-lg-1">
						<div className="filter-control">
							<ul>
								<li className="active">Clothings</li>
								<li>HandBag</li>
								<li>Shoes</li>
								<li>Accessories</li>
							</ul>
						</div>
						<MultiCarousel products={productsProps} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default WomenBanner;
