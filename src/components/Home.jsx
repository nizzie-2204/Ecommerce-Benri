import React, { useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Banner from "./Banner";
import WomenBanner from "./WomenBanner";
import MenBanner from "./MenBanner";
import InstagramPhotos from "./InstagramPhotos";
import Footer from "./Footer";
import Admin from "./Admin/Admin";
import { Helmet } from "react-helmet";
import AdminLogin from "./Admin/AdminLogin";
import Navbar from "./Admin/Navbar";

const Home = () => {
	useEffect(() => {
		if (
			localStorage.getItem("admin_login") &&
			localStorage.getItem("admin_token")
		) {
			localStorage.removeItem("admin_login");
			localStorage.removeItem("admin_token");
		}
	});
	return (
		<>
			<Helmet>
				<title>Benri | Home</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<Hero />
			<Banner />
			<WomenBanner />
			<MenBanner />
			<InstagramPhotos />
			<Footer />
		</>
	);
};

export default Home;
