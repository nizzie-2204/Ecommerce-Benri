import React, { useContext, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { BiCurrentLocation, BiPhoneCall, BiMailSend } from "react-icons/bi";
import { TiLocationArrowOutline } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { Helmet } from "react-helmet";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";

const Contact = () => {
	const { authState } = useContext(CustomerAuthLogin);
	console.log(authState.isAuthenticated);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Helmet>
				<title>Benri | Contact</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<div className="map ">
				<div className="container">
					<div className="map-inner">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15715.366073286777!2d105.7706153!3d10.0299337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1617934464472!5m2!1svi!2s"
							height="610"
						></iframe>
					</div>
				</div>
			</div>

			<section className="contact-section ">
				<div className="container">
					<div className="row justify-content-center ">
						<div className="col-lg-6 offset-lg-1">
							<div className="contact-title">
								<h4 className="text-center">Contacts Us</h4>
								<p>
									Contrary to popular belief, Lorem Ipsum is simply random text.
									It has roots in a piece of classNameical Latin literature from
									45 BC, maki years old.
								</p>
							</div>
							<div className="contact-widget">
								<div className="cw-item">
									<div className="ci-icon">
										<TiLocationArrowOutline />
									</div>
									<div className="ci-text">
										<span>Address:</span>
										<p>60-49 Road 11378 New York</p>
									</div>
								</div>
								<div className="cw-item">
									<div className="ci-icon">
										<BiPhoneCall />
									</div>
									<div className="ci-text">
										<span>Phone:</span>
										<p>+84 11.188.888</p>
									</div>
								</div>
								<div className="cw-item">
									<div className="ci-icon">
										<HiOutlineMail />
									</div>
									<div className="ci-text">
										<span>Email:</span>
										<p>benri@gmail.com</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Contact;
