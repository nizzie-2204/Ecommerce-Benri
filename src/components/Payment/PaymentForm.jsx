import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

export default function PaymentForm() {
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const card = elements.getElement(CardElement);
		const result = await stripe.createToken(card);

		console.log(result);
	};

	return (
		<>
			{/* {!success ? (
				
			) : (
				<div>
					<h2>
						You just bought a sweet spatula congrats this is the best decision
						of you're life
					</h2>
				</div>
			)} */}
		</>
	);
}
