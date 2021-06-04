import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AdminAuthLogin } from "../../contexts/Admin/AdminAuthLogin";
import { Redirect, useHistory } from "react-router";

const Admin = () => {
	// const history = useHistory();
	const { authState, loadAdmin, user } = useContext(AdminAuthLogin);
	const { isAuthenticated } = authState;
	console.log(isAuthenticated);

	return (
		<>
			<Navbar />
			{isAuthenticated && <Sidebar />}
			<div className="admin-home d-flex align-items-center justify-content-center">
				<div className="container-fluid pt-4">
					<h1 className="text-center">Admin homepage</h1>
				</div>
			</div>
		</>
	);
};

export default Admin;
