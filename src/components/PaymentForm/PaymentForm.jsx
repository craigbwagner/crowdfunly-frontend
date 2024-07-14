import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await fetch('http://localhost:3000/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 500 }),
        });
        const data = await response.json();
        const { clientSecret } = data;
        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
          payment_method: id,
        });
        if (confirmPayment.error) {
          console.log(confirmPayment.error.message);
        } else {
          setSuccess(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label>
              <input
                  type="text"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  required
                />
              </label>
              </div>
              <div>
              <label>
                Amount (USD)
                <input
                  type="number"
                  value={amount}
                  onChange={(evt) => setAmount(evt.target.value)}
                  required
                />
              </label>
              <CardElement
              />
            </div>
          </fieldset>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>Payment Successful!</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;