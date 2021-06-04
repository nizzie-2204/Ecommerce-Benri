import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { GrSubtract, GrAdd } from "react-icons/gr";
import { BsCheck } from "react-icons/bs";
// import img1 from "../assets/img/products/man-1.jpg";

const QuickView = ({ isOpen, closeModal, product }) => {
	const customStyles = {
		content: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: "900px",
			height: "500px",
			display: "flex",
			alignItem: "center",
			border: "none",
		},
	};

	const onBlurCloseModal = () => {
		closeModal();
	};

	const [quantity, setQuantity] = useState(1);

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};
	const decreaseQuantity = () => {
		if (quantity <= 1) {
			return;
		} else {
			setQuantity(quantity - 1);
		}
	};

	return (
		<Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
			{/* {product.images[0] && (
				<img
					src={
						require(`./../assets/img/products/${product.images[0].link.slice(
							13
						)}`).default
					}
					alt="product"
					className="modal__img"
				/>
			)} */}
			{/* <img src={img1} alt="" className="modal__img" /> */}
			<div className="modal__content">
				<h4>Áo thun nam TEST_01</h4>
				<div className="modal__price">$10000</div>
				<div className="modal__desc">
					Đây là một cái áo thun nam dùng để kiểm thử
				</div>
				<div className="modal__size">
					<p>Size</p>
					<span className="modal__size-active">
						S
						<div className="modal__size-icon-active">
							<BsCheck />
						</div>
					</span>
					<span>M</span>
					<span>L</span>
					<span>XL</span>
				</div>
				<div className="modal__color">
					<p>Color</p>
					<span className="modal__color-active">
						Đỏ
						<div className="modal__color-icon-active">
							<BsCheck />
						</div>
					</span>
					<span>Xanh</span>
					<span>Vàng</span>
				</div>
				<div className="modal__flex">
					<div className="modal__quantity">
						<div onClick={decreaseQuantity}>
							<GrSubtract />
						</div>
						<span>{quantity}</span>
						<div onClick={increaseQuantity}>
							<GrAdd />
						</div>
					</div>
					<a href="/" className="modal__add">
						Add to cart
					</a>
				</div>
			</div>
			<button onClick={closeModal} className="modal__close">
				<AiOutlineClose />
			</button>
		</Modal>
	);
};

export default QuickView;
