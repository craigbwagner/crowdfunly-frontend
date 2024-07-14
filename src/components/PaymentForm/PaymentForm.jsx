import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
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
                console.log(error)
            } else {
                console.log(error.message)
            }
        }




}