import React from 'react';
import styles from './style.module.scss';
import FormStripe from './FormStripe';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const StripePayment = ({ total, order_id, stripe_public_key }) => {
  const stripePromise = loadStripe(stripe_public_key);

  return (
    <Elements stripe={stripePromise}>
      <FormStripe total={total} order_id={order_id} />
    </Elements>
  )
}

export default StripePayment;