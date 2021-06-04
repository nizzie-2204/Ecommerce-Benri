import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ModalPopup = ({ showAddPostModal, closeAddPostModal }) => {
	const [redState, setRedState] = useState(true);
	const handleRedState = () => {
		setRedState(!redState);
	};

	const [category, setCategory] = useState(null);
	const handleOnChangeCategory = (e) => {
		setCategory(e.target.value);
	};

	const [name, setName] = useState(null);
	const handleOnChangeName = (e) => {
		setName(e.target.value);
	};

	const [desc, setDesc] = useState(null);
	const handleOnChangeDesc = (e) => {
		setDesc(e.target.value);
	};

	const [price, setPrice] = useState(null);
	const handleOnChangePrice = (e) => {
		setPrice(e.target.value);
	};

	const [tags, setTags] = useState([]);
	const handleAddTags = () => {
		let tags = [];
	};

	const [formAddProduct, setFormAddProduct] = useState({
		Product: {
			CategoryId: category,
			ProductName: name,
			ProductDescription: desc,
			Price: price,
			StorageQuantity: 0,
		},
		HaveTags: [
			{
				TagId: "luxury",
			},
			{
				TagId: "wool",
			},
		],
		SizeOfProductHadColors: [
			{
				SizeId: "XL",
				ColorId: "BLACK",
				QuantityInSizeOfColor: 50,
			},
		],
	});

	const [redColor, setRedColor] = useState({
		RED: {
			S: true,
			M: true,
			L: true,
			XL: true,
		},
	});

	const handleSetColor = (size) => {
		if (size === "S") {
			setRedColor({
				RED: {
					...redColor.RED,
					S: !redColor.RED.S,
				},
			});
		}
		if (size === "M") {
			setRedColor({
				RED: {
					...redColor.RED,
					M: !redColor.RED.M,
				},
			});
		}
		if (size === "L") {
			setRedColor({
				RED: {
					...redColor.RED,

					L: !redColor.RED.L,
				},
			});
		}
		if (size === "XL") {
			setRedColor({
				RED: {
					...redColor.RED,
					XL: !redColor.RED.XL,
				},
			});
		}
	};

	return (
		<Modal show={showAddPostModal} onHide={closeAddPostModal}>
			{/* <Modal.Header closeButton>
				<Modal.Title>What do you want to add?</Modal.Title>
			</Modal.Header> */}
			<Form>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control as="select" onChange={handleOnChangeCategory}>
							<option onChange={handleOnChangeCategory} value="WOMEN">
								WOMEN
							</option>
							<option onChange={handleOnChangeCategory} value="MEN">
								MEN
							</option>
							<option onChange={handleOnChangeCategory} value="KID">
								KID
							</option>
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Name"
							name="title"
							required
							aria-describedby="title-help"
							value="Nunc pretium odio id vestibulum sodales"
							// value={title}
							// onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Description"
							name="title"
							required
							aria-describedby="title-help"
							value="Nunc pretium odio id vestibulum sodales. Aenean ullamcorper volutpat dui ut tristique. Nam dolor diam, accumsan vitae turpis vitae, sagittis viverra odio. Vestibulum ullam"
							// value={title}
							// onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Price"
							name="title"
							required
							aria-describedby="title-help"
							value="510000"
							// value={title}
							// onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check inline aria-label="option 1" label="Cotton" />
						<Form.Check inline aria-label="option 1" label="Hiphop" checked />
						<Form.Check inline aria-label="option 1" label="Luxury" />
						<Form.Check inline aria-label="option 1" label="Short" />
						<Form.Check inline aria-label="option 1" label="Street" />
						<Form.Check inline aria-label="option 1" label="Wool" checked />
					</Form.Group>

					{/* <Form.Group>
						<Form.File
							type="file"
							placeholder="Quantity"
							name="title"
							required
							aria-describedby="title-help"
							multiple
						/>
					</Form.Group> */}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeAddPostModal}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Edit
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default ModalPopup;
