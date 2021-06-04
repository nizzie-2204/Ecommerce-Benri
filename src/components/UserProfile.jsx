import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { RiUser3Fill, RiPencilFill, RiLockPasswordFill } from "react-icons/ri";
import { CustomerAuthLogin } from "../contexts/Customer/CustomerAuthLogin";
import { CustomerEditProfileContext } from "../contexts/Customer/CustomerEditProfile";
import { useHistory } from "react-router";
var md5 = require("md5");

const UserProfile = () => {
	const [active, setActive] = useState(false);
	const history = useHistory();
	const { loadUser } = useContext(CustomerAuthLogin);
	const [messageEditInfo, setMessageEditInfo] = useState("");
	const [messageCurrPassword, setMessageCurrPassword] = useState(null);
	const [messagePhone, setMessagePhone] = useState("");
	const [messageConfirmNewPassword, setMessageConfirmNewPassword] =
		useState("");
	const [disableInput, setDisableInput] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [user, setUser] = useState({});
	const [info, setInfo] = useState({
		phoneNumber: "",
		userName: "",
		fullName: "",
		address: "",
		password: "",
	});
	const [changePassword, setChangePassword] = useState({
		currPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const typingTimeoutPassword = useRef(null);
	const typingTimeoutNewPsw = useRef(null);
	const { editProfile, changePassword: changePasswordContext } = useContext(
		CustomerEditProfileContext
	);

	// Load user
	useEffect(() => {
		const user = loadUser();
		setUser(user);
		setInfo({
			phoneNumber: user ? user.phoneNumber : "",
			userName: user ? user.userName : "",
			fullName: user ? user.fullName : "",
			address: user ? user.address : "",
			password: user ? user.password : "",
		});
	}, []);

	const { phoneNumber, fullName, address, userName, password } = info;

	const activeEditInfo = () => {
		setActive(!active);
	};

	const editInfo = () => {
		setDisableInput(!disableInput);
	};

	const saveInfo = async (e) => {
		try {
			e.preventDefault();
			const messageSaveInfo = await editProfile(info);
			setMessageEditInfo(messageSaveInfo);
			// setDisableInput(true);
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const saveChangePassword = async (e) => {
		e.preventDefault();
		if (messageCurrPassword !== null) {
			return;
		} else {
			const messageSaveInfo = await changePasswordContext(
				md5(changePassword.newPassword)
			);
			if (messageSaveInfo) {
				console.log("Changed Password");
				setMessageEditInfo("Change password successfully");
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 2000);
			}
		}
	};

	const activeChangePassword = async () => {
		setActive(!active);
	};

	const onChangeInfo = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });

		if (e.target.name === "phoneNumber") {
			if (isNaN(e.target.value)) {
				setMessagePhone("Phone is not a number");
			} else {
				setMessagePhone("");
			}
		}
	};

	const onChangePassword = (e) => {
		setChangePassword({ ...changePassword, [e.target.name]: e.target.value });

		if (e.target.name === "currPassword") {
			if (typingTimeoutPassword.current) {
				clearTimeout(typingTimeoutPassword);
			}

			typingTimeoutPassword.current = setTimeout(() => {
				const value = e.target.value;
				if (md5(value) !== password) {
					console.log(messageCurrPassword);
					setMessageCurrPassword("Current password is incorrect");
				} else {
					setMessageCurrPassword(null);
				}
			}, 2000);
		}

		if (e.target.name === "confirmNewPassword") {
			if (typingTimeoutNewPsw.current) {
				clearTimeout(typingTimeoutNewPsw);
			}

			typingTimeoutNewPsw.current = setTimeout(() => {
				const value = e.target.value;

				if (value !== changePassword.newPassword) {
					setMessageConfirmNewPassword("Confirm password is incorrect");
				} else {
					setMessageConfirmNewPassword("");
				}
			}, 2000);
		}
	};

	return (
		<div className="user-profile">
			<Header />
			<div className="user-profile mt-5 mb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-md-2  ">
							<div className="user-page-info d-flex flex-column  justify-content-center">
								<div className="user-page-avt  d-flex align-items-center align-self-center justify-content-center mb-2">
									<RiUser3Fill />
								</div>
								<p className="mb-4 align-self-center">{userName}</p>
								<div
									className="user-page-adjust d-flex align-items-center mb-2"
									onClick={activeEditInfo}
								>
									<RiPencilFill className="user-page-adjust-icon mr-2" />
									<span>Edit profile</span>
								</div>
								<div
									className="user-page-adjust d-flex align-items-center "
									onClick={activeChangePassword}
								>
									<RiLockPasswordFill className="user-page-adjust-icon mr-2" />
									<span>Change password</span>
								</div>
							</div>
						</div>
						<form
							className={
								!active ? "col-lg-10 col-md-10" : "col-lg-10 col-md-10 d-none"
							}
							onSubmit={saveInfo}
						>
							<div className="card-block">
								<h2 className="m-b-4 pb-3 t f-w-600 border-bottom">
									Information
								</h2>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0">Phone</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={phoneNumber}
										name="phoneNumber"
										onChange={onChangeInfo}
										maxLength="12"
										autoComplete="off"
									/>
									{messagePhone && (
										<p className="text-danger message-phone-edit">
											{messagePhone}
										</p>
									)}
								</div>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0">Username</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={userName}
										disabled
									/>
								</div>
								{/* <div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4 ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0 d-none">
										Password
									</p>
									<input
										className="pb-0 col-lg-5 mb-0 text-muted f-w-400 pt-2 pb-2 border  border-secondary"
										value={password}
										type="password"
										disabled
									/>
								</div> */}
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0">Fullname</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={fullName}
										name="fullName"
										onChange={onChangeInfo}
										autoComplete="off"
									/>
								</div>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0">Address</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={address}
										name="address"
										onChange={onChangeInfo}
										autoComplete="off"
									/>
								</div>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4 ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0"></p>
									<div className="d-flex col-lg-5 justify-content-between p-0 use-profile-action">
										<button className="mb-2 pt-2 pb-2" type="submit">
											Save
										</button>
									</div>
									{showMessage ? (
										<span
											className={
												disableInput
													? "text-success user-profile-message"
													: "user-profile-message"
											}
										>
											{messageEditInfo}
										</span>
									) : null}
								</div>
							</div>
						</form>
						<form
							className={
								active ? "col-lg-10 col-md-10" : "col-lg-10 col-md-10 d-none"
							}
							onSubmit={saveChangePassword}
							// onSubmit={saveInfo}
						>
							<div className="card-block">
								<h2 className="m-b-4 pb-3 t f-w-600 border-bottom">
									Change password
								</h2>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-3 ml-0 mr-0 pl-0 pr-0">
										Current password
									</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										// className={
										// 	disableInput
										// 		? "pb-0 col-lg-5 mb-0 text-muted f-w-400 pt-2 pb-2 border  border-secondary"
										// 		: "pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border  border-danger"
										// }
										type="password"
										value={changePassword.currPassword}
										name="currPassword"
										onChange={onChangePassword}
										autoComplete="off"

										// disabled={disableInput}
										// // readOnly={disableInput}
										// maxLength="12"
									/>
									<p className="change-password-message">
										{messageCurrPassword}
									</p>
								</div>
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-3 ml-0 mr-0 pl-0 pr-0">
										New Password
									</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={changePassword.newPassword}
										name="newPassword"
										onChange={onChangePassword}
										autoComplete="off"
										type="password"
										required
										// className="pb-0 col-lg-5 mb-0 text-muted f-w-400 pt-2 pb-2 border  border-secondary"
										// value={userName}
										// disabled
									/>
								</div>
								{/* <div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4 ">
									<p className="mb-0 col-lg-2 ml-0 mr-0 pl-0 pr-0 d-none">
										Password
									</p>
									<input
										className="pb-0 col-lg-5 mb-0 text-muted f-w-400 pt-2 pb-2 border  border-secondary"
										value={password}
										type="password"
										disabled
									/>
								</div> */}
								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4  ">
									<p className="mb-0 col-lg-3 ml-0 mr-0 pl-0 pr-0">
										Confirm New Password
									</p>
									<input
										className={"pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border"}
										value={changePassword.confirmNewPassword}
										name="confirmNewPassword"
										onChange={onChangePassword}
										autoComplete="off"
										type="password"
										required
										// className={
										// 	disableInput
										// 		? "pb-0 col-lg-5 mb-0 text-muted f-w-400 pt-2 pb-2 border  border-secondary"
										// 		: "pb-0 col-lg-5 mb-0  f-w-400 pt-2 pb-2 border  border-danger"
										// }
										// value={fullName}
										// name="fullName"
										// onChange={onChangeInfo}
										// disabled={disableInput}
									/>
									<p className="change-password-message">
										{messageConfirmNewPassword}
									</p>
								</div>

								<div className="col-sm-12 mr-0 d-flex align-items-center pr-0 pl-0 pb-2 mb-4 ">
									<p className="mb-0 col-lg-3 ml-0 mr-0 pl-0 pr-0"></p>
									<div className="d-flex col-lg-5 justify-content-between p-0 use-profile-action">
										{/* <button
											className="mb-2 pt-2 pb-2"
											type="button"
											onClick={editInfo}
										>
											Edit
										</button> */}
										<button
											className="m-0 pt-2 pb-2"
											type="submit"
											disabled={messageConfirmNewPassword === null}
										>
											Save
										</button>
									</div>
									{showMessage ? (
										<span
											className={
												disableInput
													? "text-success user-profile-message"
													: "user-profile-message"
											}
										>
											{messageEditInfo}
										</span>
									) : null}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default UserProfile;
