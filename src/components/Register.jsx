import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthRegister";
var md5 = require("md5");

const Register = () => {
	const history = useHistory();
	const { checkUsername, registerUser } = useContext(CustomerAuthLogin);
	const [registerForm, setRegisterForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		address: "",
		fullname: "",
	});
	const [checkPassword, setCheckPassword] = useState("");
	const typingTimeoutConfirmPw = useRef(null);
	const typingTimoutUsername = useRef(null);
	const [messageUsername, setMessageUsername] = useState("");
	const [messagePhone, setMessagePhone] = useState("");
	const {
		username,
		password,
		confirmPassword,
		phoneNumber,
		address,
		fullname,
	} = registerForm;

	const onChangeRegisterForm = async (e) => {
		setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
		console.log(e.target.name);
		// Check username is existed or not
		if (typingTimoutUsername.current) {
			clearTimeout(typingTimoutUsername.current);
		}
		typingTimoutUsername.current = setTimeout(async () => {
			if (e.target.name === "username") {
				const value = e.target.value;
				setMessageUsername(await checkUsername({ username: `${value}` }));
			}
		}, 1000);

		// Check confirm password
		if (typingTimeoutConfirmPw.current) {
			clearTimeout(typingTimeoutConfirmPw.current);
		}
		typingTimeoutConfirmPw.current = setTimeout(() => {
			if (e.target.name === "confirmPassword") {
				if (e.target.value !== password) {
					// console.log("Not match");
					setCheckPassword("Password and password confirm is not match");
				} else {
					setCheckPassword("");
				}
			}
		}, 1000);

		// Check phone is number or not
		if (e.target.name === "phoneNumber") {
			if (isNaN(e.target.value)) {
				setMessagePhone("Phone is not a number");
			} else {
				setMessagePhone("");
			}
		}
	};

	const register = async (e) => {
		try {
			e.preventDefault();
			if (messagePhone !== "") {
				return;
			} else {
				const data = {
					...registerForm,
					password: md5(registerForm.password),
				};

				const registerrr = await registerUser(data);

				if (registerrr !== "This user name is existed") {
					history.push("/login");
				}
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
				<title>Benri | Register</title>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
			</Helmet>
			<Header />
			<div className="register-login-section spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 offset-lg-3">
							<div className="register-form">
								<h2>Register</h2>
								<form onSubmit={register}>
									<div className="group-input">
										<label htmlFor="username">Username</label>
										<input
											type="text"
											id="username"
											minLength="6"
											maxLength="15"
											value={username}
											name="username"
											onChange={onChangeRegisterForm}
											autoComplete="off"
											required
										/>
										<p
											className={
												messageUsername === "This user name is existed"
													? `text-danger d-block messageUsername`
													: `d-none messageUsername`
											}
										>
											{messageUsername}
										</p>
									</div>
									<div className="group-input">
										<label htmlFor="pass">Password</label>
										<input
											type="password"
											id="pass"
											minLength="6"
											maxLength="40"
											value="password"
											value={password}
											onChange={onChangeRegisterForm}
											name="password"
											required
											autoComplete="off"
										/>
									</div>
									<div className="group-input">
										<label htmlFor="con-pass">Confirm Password</label>
										<input
											type="password"
											id="con-pass"
											value={confirmPassword}
											onChange={onChangeRegisterForm}
											required
											name="confirmPassword"
											autoComplete="off"
										/>
										<p className="text-danger messageUsername">
											{checkPassword}
										</p>
									</div>
									<div className="group-input">
										<label htmlFor="con-pass">Phone Number</label>
										<input
											type="text"
											id="con-pass"
											minLength="0"
											maxLength="12"
											value={phoneNumber}
											onChange={onChangeRegisterForm}
											name="phoneNumber"
											autoComplete="off"
											required
										/>
										{messagePhone && (
											<p className="text-danger">{messagePhone}</p>
										)}
									</div>
									<div className="group-input">
										<label htmlFor="con-pass">Address</label>
										<input
											type="text"
											id="con-pass"
											value={address}
											onChange={onChangeRegisterForm}
											name="address"
											autoComplete="off"
											required
										/>
									</div>
									<div className="group-input">
										<label htmlFor="con-pass">Fullname</label>
										<input
											type="text"
											id="con-pass"
											value={fullname}
											onChange={onChangeRegisterForm}
											name="fullname"
											autoComplete="off"
											required
										/>
									</div>
									<button type="submit" className="site-btn register-btn">
										REGISTER
									</button>
								</form>
								<div className="switch-login">
									<Link to="./login" className="or-login">
										Or Login
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Register;
