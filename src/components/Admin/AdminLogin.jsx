import React, { useContext, useState, useEffect } from "react";
import { AdminAuthLogin } from "../../contexts/Admin/AdminAuthLogin";
import { Redirect, useHistory } from "react-router-dom";

const AdminLogin = () => {
	const { loginAdmin, loadAdmin, logoutAdmin, authState } = useContext(
		AdminAuthLogin
	);
	const [errorMessage, setErrorMessage] = useState("");
	const [adminForm, setAdminForm] = useState({
		username: "",
		password: "",
	});
	const { username, password } = adminForm;
	const history = useHistory();

	const onChangeLoginForm = (e) => {
		setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		try {
			e.preventDefault();
			const loginData = await loginAdmin(adminForm);
			const role = loginData;
			if (role === "Admin") {
				setAdminForm({ ...adminForm, username: "", password: "" });
				history.push("/admin");
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

	return (
		<div className="register-login-section spad">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 offset-lg-3">
						<div className="login-form">
							<h2>Admin Login</h2>
							<form onSubmit={login}>
								<div className="group-input">
									<label htmlFor="username">Username*</label>
									<input
										type="text"
										id="username"
										name="username"
										value={username}
										onChange={onChangeLoginForm}
										autoComplete="off"
									/>
								</div>
								<div className="group-input">
									<label htmlFor="pass">Password *</label>
									<input
										type="password"
										id="pass"
										name="password"
										value={password}
										autoComplete="off"
										onChange={onChangeLoginForm}
									/>
									{errorMessage ? (
										<p className="text-danger">{errorMessage}</p>
									) : null}
								</div>
								<button type="submit" className="site-btn login-btn">
									Sign In
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
