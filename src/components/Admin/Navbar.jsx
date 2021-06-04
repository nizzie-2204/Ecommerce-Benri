import React, { useContext, useEffect } from "react";
import logo from "../../assets/img/logo-header.png";
import { Link, useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { AdminAuthLogin } from "../../contexts/Admin/AdminAuthLogin";

const Navbar = () => {
	const history = useHistory();
	const { authState, loadAdmin, logoutAdmin } = useContext(AdminAuthLogin);
	const { isAuthennicated } = authState;
	const { user } = authState;

	const logout = () => {
		logoutAdmin();
		history.push("/admin/login");
	};

	return (
		<div className="navbar-admin pt-3 pb-3">
			<div className="container-fluid">
				<div className="row align-items-center">
					<div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center">
						<div className="logo p-0 logo-admin">
							<Link to="/">
								<img src={logo} alt="" />
							</Link>
						</div>
					</div>
					<div className="col-lg-7 col-md-7 ">
						<div className="advanced-search d-flex align-items-center justify-content-center">
							<div className="input-group">
								<input type="text" placeholder="What you looking for..." />
								<button type="button" className="btn">
									{/* <i className="ti-search"></i> */}
									<FaSearch />
								</button>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3">
						<div className="navbar-admin-icon d-flex align-items-center justify-content-end mr-5 ">
							<BsMoon />
							<div className="d-flex align-items-center justify-content-center navbar-notification">
								<IoNotificationsSharp />
								<span>2</span>
							</div>
							<div className="admin-username">
								<Link to="/admin/login">
									<FaUserAlt className="admin-username-icon" />
									<span>{user ? user.userName : "Login"}</span>
								</Link>

								{user && (
									<div className="admin-username-dropdown" onClick={logout}>
										<p>Logout</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
