import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
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
        const clientSecret = await simulateCreatePaymentIntent();
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
    }

    const simulateCreatePaymentIntent = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("simulated_client_secret");
        }, 1000);
      });
    };
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <CardElement />
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
