import React from 'react'
import { getSession } from "next-auth/react";
import { useState, useEffect } from 'react';

import styles from '../styles/checkout.module.scss';
import CheckoutShipping from '../components/checkoutPage/shipping';
import CheckoutProduct from '../components/checkoutPage/products';
import CheckoutPayment from '../components/checkoutPage/payment';
import CheckoutSummary from '../components/checkoutPage/summary';
import db from '../utils/db';
import User from '../models/UserModel';
import Cart from '../models/CartModel';

const Checkout = ({ cart, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");

  return (
    <div className={`${styles.container} ${styles.checkout}`}>
      <div className={styles.checkout__side}>

        <CheckoutShipping
          user={user}
          addresses={addresses}
          setAddresses={setAddresses}
        />

        <CheckoutProduct cart={cart} />
      </div>

      <div className={styles.checkout__side}>
        <CheckoutPayment
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
        <CheckoutSummary
          totalAfterDiscount={totalAfterDiscount}
          setTotalAfterDiscount={setTotalAfterDiscount}
          user={user}
          cart={cart}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  )
}

export default Checkout;

export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session.user.id).select("-password");
  const cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }

  db.disconnectDb();

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    }
  }
}