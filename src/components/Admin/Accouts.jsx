import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AccountAdminContext } from "../../contexts/Admin/AccountAdminContext";

const Accouts = () => {
	const {
		getAccountsAdmin,
		accountsAdminState: { accounts },
	} = useContext(AccountAdminContext);
	useEffect(() => {
		const token = localStorage.getItem("admin_token");
		getAccountsAdmin(token);
	}, []);
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="admin-accounts">
				<div className="container pt-4">
					<div className="accounts-top">
						<h3>Accounts</h3>
						<div className="accounts-action">
							<button className="btn">Add</button>
							<button className="btn disabled">Edit</button>
							<button className="btn disabled">Remove</button>
						</div>
					</div>
				</div>
				<div className="container ">
					<div className="accounts-title">
						<div>Username</div>
						<div>Password</div>
						<div>Phone</div>
						<div>Address</div>
						<div>Fullname</div>
						<div>Role</div>
					</div>
					{accounts?.map((acc) => {
						return (
							<div className="accounts-info">
								<div>{acc.userName}</div>
								<div className="text-truncate">{acc.password}</div>

								<div>{acc.phoneNumber}</div>
								<div>{acc.address}</div>
								<div>{acc.fullName}</div>
								<div>{acc.role}</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Accouts;
