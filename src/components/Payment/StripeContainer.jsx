import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
	"pk_test_51ImDXxJ5iTgVXDI3NqgNE0IS0iFT98thIR121BCl2fitTb0H5mlLafV8g08h0PKAWdFtfGG6JuyR8BOmoKmYNMJZ00LNVCXUiM";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	);
}
