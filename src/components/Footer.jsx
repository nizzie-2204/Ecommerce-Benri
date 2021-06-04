import React from "react";
import { FaFacebookF, FaInstagram, FaUserAlt } from "react-icons/fa";
import logo from "../assets/img/logo-footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-3">
						<div className="footer-left">
							<div className="footer-logo">
								<Link to="/">
									<img src={logo} alt="" />
								</Link>
							</div>
							<ul>
								<li>Address: 60-49 Road 11378 New York</li>
								<li>Phone: +84 11.188.888</li>
								<li>Email: benri@gmail.com</li>
							</ul>
							<div className="footer-social">
								<a href="/">
									<FaFacebookF />
								</a>
								<a href="/">
									<FaInstagram />
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-2 offset-lg-1">
						<div className="footer-widget">
							<h5>Information</h5>
							<ul>
								<li>
									<a href="/">About Us</a>
								</li>
								<li>
									<a href="/">Checkout</a>
								</li>
								<li>
									<a href="/">Contact</a>
								</li>
								<li>
									<a href="/">Serivius</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2">
						<div className="footer-widget">
							<h5>My Account</h5>
							<ul>
								<li>
									<a href="/">My Account</a>
								</li>
								<li>
									<a href="/">Contact</a>
								</li>
								<li>
									<a href="/">Shopping Cart</a>
								</li>
								<li>
									<a href="/">Shop</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="newslatter-item">
							<h5>Join Our Newsletter Now</h5>
							<p>
								Get E-mail updates about our latest shop and special offers.
							</p>
							<form action="/" className="subscribe-form">
								<input type="text" placeholder="Enter Your Mail" />
								<button type="button">Subscribe</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="copyright-reserved">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright-text">
								Copyright &copy;
								<script>document.write(new Date().getFullYear());</script>
								All rights reserved
							</div>
							<div className="payment-pic">
								<img src="img/payment-method.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
