import React, { useContext, useEffect } from "react";
import men_large from "../assets/img/products/man-large.jpg";
import MultiCarousel from "./MultiCarousel";
import { ProductContext } from "../contexts/ProductContext/ProductContext";

const MenBanner = () => {
	const {
		productState: { products, productsLoading, menProduct },
		getMenProducts,
	} = useContext(ProductContext);

	useEffect(() => {
		getMenProducts();
	}, []);

	const productsProps = menProduct.slice(0, 4);

	return (
		<section className="man-banner ">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-8">
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
					<div className="col-lg-3 offset-lg-1">
						<div
							className="product-large set-bg bg-men"
							data-setbg="img/products/man-large.jpg"
						>
							<h2>Men’s</h2>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MenBanner;
