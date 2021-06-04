import React, { useState } from "react";
import { FaUserFriends, FaSketch } from "react-icons/fa";
import { IoIosHome, IoIosCube } from "react-icons/io";
import logo from "../../assets/img/logo-header.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	const [active, setActive] = useState(false);
	const activeLink = () => {
		setActive(!active);
		console.log(active);
	};

	return (
		<div className="admin-sidebar">
			<div className="admin-navlink">
				<NavLink
					to="/admin"
					exact
					className="admin-link "
					activeClassName="admin-link-active"
					onClick={() => {
						setActive(!active);
					}}
				>
					<IoIosHome
						size={30}
						className="sidebar-icon"
						// className="sidebar-icon"
					/>
					Home
				</NavLink>
				<NavLink
					to="/admin/products"
					exact
					className="admin-link"
					activeClassName="admin-link-active"
					onClick={() => {
						setActive(!active);
					}}
				>
					<IoIosCube size={30} className="sidebar-icon" />
					Products
				</NavLink>
				<NavLink
					to="/admin/accounts"
					exact
					className="admin-link"
					activeClassName="admin-link-active"
					onClick={() => {
						setActive(!active);
					}}
				>
					<FaUserFriends size={30} className="sidebar-icon" />
					Accounts
				</NavLink>
				<NavLink
					to="/admin/category"
					exact
					className="admin-link"
					activeClassName="admin-link-active"
					onClick={activeLink}
				>
					<FaSketch size={30} className="sidebar-icon" />
					Category
				</NavLink>
				<NavLink
					to="/admin/order"
					exact
					className="admin-link"
					activeClassName="admin-link-active"
					onClick={activeLink}
				>
					<FaSketch size={30} className="sidebar-icon" />
					Orders
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
