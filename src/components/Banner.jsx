import React from "react";
import banner1 from "../assets/img/banner-1.jpg";
import banner2 from "../assets/img/banner-2.jpg";
import banner3 from "../assets/img/banner-3.jpg";

const Banner = () => {
	return (
		<div className="banner-section ">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-4">
						<div className="single-banner">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<div className="single-banner-img">
								<img src={banner1} alt="a" />
							</div>
							<div className="inner-text">
								<h4>Men’s</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="single-banner">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<div className="single-banner-img">
								<img src={banner2} alt="a" />
							</div>
							<div className="inner-text">
								<h4>Women’s</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="single-banner">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<div className="single-banner-img">
								<img src={banner3} alt="a" />
							</div>
							<div className="inner-text">
								<h4>Kid’s</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
