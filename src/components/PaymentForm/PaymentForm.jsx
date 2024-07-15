import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import { useParams } from "react-router-dom";

const PaymentForm = ({ user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { campaignId } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    addContribution();

    const { error, paymentMethod } = await createPaymentMethod();
    if (error) return console.log(error.message);

    const clientSecret = await createPaymentIntent(amount);
    const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmPayment.error) {
      console.log(confirmPayment.error.message);
    } else {
      setSuccess(true);
    }
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

  const addContribution = async () => {
    const response = await fetch(`http://localhost:3000/contributions/${campaignId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ campaignId, amount: amount, contributedBy: user._id }),
    });
    console.log(amount);
    return response.json();
  };

  return (
    <div className="payment-form">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="form-group">
              <input type="text" value={name} onChange={(evt) => setName(evt.target.value)} required placeholder=" " />
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
          <h3>Payment Successful. Thank you for your contribution.</h3>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
