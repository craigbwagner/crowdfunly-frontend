import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.css";


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await createPaymentMethod();
    if (error) return console.log(error.message);

    const clientSecret = await createPaymentIntent(amount);
    const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    confirmPayment.error ? console.log(confirmPayment.error.message) : setSuccess(true);
  };

  const createPaymentMethod = async () => {
    return await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: { name },
    });
  };

  const createPaymentIntent = async (amount) => {
    const response = await fetch("http://localhost:3000/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseInt(amount) * 100 }),
    });
    const data = await response.json();
    return data.clientSecret;
  };


  return (
    <div className="payment-form">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                required
                placeholder=" "
              />
              <label>Name</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                value={amount}
                onChange={(evt) => setAmount(evt.target.value)}
                required
                placeholder=" "
              />
              <label>Amount (USD)</label>
              <CardElement className="StripeElement" />
            </div>
          </fieldset>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
