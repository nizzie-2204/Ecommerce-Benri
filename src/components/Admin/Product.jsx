import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import img from "../../assets/img/products/product-1.jpg";
import { BsMoon } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import ModalPopup from "./ModalPopup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ProductAdminContext } from "../../contexts/Admin/ProductAdminContext";

const Product = () => {
	const [isDisable, setIsDisable] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const {
		getProductsAdmin,
		productsAdminState: { products },
		removeProductAdmin,
	} = useContext(ProductAdminContext);

	function getProDuct(e) {
		console.log(e.currentTarget);
		if (!isDisable) {
			setIsDisable(true);
		} else {
			return;
		}
	}

	const disableAction = (e) => {
		setIsDisable(false);
		console.log(1);
	};

	const addProduct = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const remove = (productId) => {
		const token = localStorage.getItem("admin_token");
		removeProductAdmin(token, productId);
	};

	useEffect(() => {
		getProductsAdmin();
	}, []);

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="admin-product">
				<div className="container pt-4">
					<div className="product-top">
						<h3>Products</h3>
						<div className="product-action">
							<button className="btn" onClick={addProduct}>
								Add
							</button>
							<ModalPopup
								showAddPostModal={showModal}
								closeAddPostModal={handleClose}
							/>
						</div>
					</div>
				</div>
				<div className="container ">
					<div className="product-title">
						<div>Image</div>
						<div>Product Id</div>
						<div>Name</div>
						<div>Category</div>
						<div>Price</div>
						<div>Quantity</div>
						<div>Tags</div>
						<div>Edit</div>
						<div>Remove</div>
						{/* <div>Quantity</div>
						<div>Color</div>
						<div>Tag</div>
						<div>Size</div>
						<div>Image</div> */}
					</div>

					{products
						? products?.map((product) => {
								return !product.isDisable ? (
									<div className="product-info">
										<div>
											<img
												src={
													require(`./../../assets/img/products/${product.images[0].link.slice(
														8
													)}`).default
												}
												alt="product"
											/>
										</div>
										<div>{product.productId}</div>
										<div>{product.productName}</div>
										<div>{product.categoryId}</div>
										<div>{product.price}</div>
										<div>{product.storageQuantity}</div>
										<div>
											{product.haveTags.map((tag) => {
												return <p>{tag.tagId}</p>;
											})}
										</div>
										<div>
											<button className="btn btn-primary">Edit</button>
										</div>

										<div>
											<button
												className="btn btn-danger"
												onClick={() => {
													remove(product.productId);
												}}
											>
												Remove
											</button>
										</div>
									</div>
								) : null;
						  })
						: null}
				</div>
			</div>
		</>
	);
};

export default Product;
