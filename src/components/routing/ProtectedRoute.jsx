import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import { AdminAuthLogin } from "../../contexts/Admin/AdminAuthLogin";
import Navbar from "../Admin/Navbar";
import Sidebar from "../Admin/Sidebar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { authState } = useContext(AdminAuthLogin);
	const { isAuthenticated } = authState;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<>
						<Navbar />
						<Sidebar />
						<Component {...props} {...rest} />
					</>
				) : (
					<Redirect to="/admin/login" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
