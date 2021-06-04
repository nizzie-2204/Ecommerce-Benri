import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Caterogy = () => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="admin-category">
				<div className="container pt-4">
					<div className="accounts-top">
						<h3>Category</h3>
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
					<div className="accounts-info">
						<div>anhtuan</div>
						<div>123456</div>

						<div>0909999000</div>
						<div>Cần Thơ</div>
						<div>Nguyễn Anh Tuấn</div>
						<div>user</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Caterogy;
