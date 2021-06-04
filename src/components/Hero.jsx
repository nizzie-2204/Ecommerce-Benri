import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AwesomeSlider from "react-awesome-slider";
import "../../node_modules/react-awesome-slider/dist/styles.css";
import { Link } from "react-router-dom";

const Hero = () => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<>
			<div className="container-fluid">
				<AwesomeSlider>
					<div className="container-fluid hero-1">
						<div className="row">
							<div className="col-lg-5">
								<span>Bag,kids</span>
								<h1>Black friday</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore
								</p>
								<Link to="/shop" className="primary-btn">
									Shop Now
								</Link>
							</div>
						</div>
					</div>
					<div className="container-fluid hero-2">
						<div className="row">
							<div className="col-lg-5">
								<span>Bag,kids</span>
								<h1>Black friday</h1>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
									do eiusmod tempor incididunt ut labore et dolore
								</p>
								<Link to="/shop" className="primary-btn">
									Shop Now
								</Link>
							</div>
						</div>
					</div>
				</AwesomeSlider>
			</div>
		</>
	);
};

export default Hero;
