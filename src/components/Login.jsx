import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { Helmet } from "react-helmet";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import md5 from "md5";

const Login = () => {
	const { loginUser, authState } = useContext(CustomerAuthLogin);
	const { isAuthenticated } = authState;

	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();

	const { username, password } = loginForm;

	const onChangeLoginForm = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		try {
			e.preventDefault();
			const loginFormData = {
				...loginForm,
				password: md5(loginForm.password),
			};

			const loginData = await loginUser(loginFormData);
			const role = loginData;
			if (role === "Customer") {
				console.log("Customer");
				setLoginForm({ ...loginForm, username: "", password: "" });
				history.push("/");
			} else {
				setErrorMessage("Incorrect username or password");
				setTimeout(() => {
					setErrorMessage(null);
				}, 2000);
				localStorage.removeItem("user_login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Helmet>
				<title>Benri | Login</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<div className="register-login-section spad">
				<div className="container">
					{isAuthenticated ? (
						<h2 className="text-center">You are already login</h2>
					) : (
						<div className="row">
							<div className="col-lg-6 offset-lg-3">
								<div className="login-form">
									<h2>Login</h2>
									<form onSubmit={login}>
										<div className="group-input">
											<label htmlFor="username">Username *</label>
											<input
												type="text"
												id="username"
												name="username"
												value={username}
												onChange={onChangeLoginForm}
												autoComplete="off"
												required
											/>
										</div>
										<div className="group-input">
											<label htmlFor="pass">Password *</label>
											<input
												type="password"
												id="pass"
												name="password"
												value={password}
												onChange={onChangeLoginForm}
												required
												autoComplete="off"
											/>
											{errorMessage ? (
												<p className="text-danger">{errorMessage}</p>
											) : null}
										</div>
										<button type="submit" className="site-btn login-btn">
											Sign In
										</button>
									</form>
									<div className="switch-login">
										<Link to="./register" className="or-login">
											Or Create An Account
										</Link>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
