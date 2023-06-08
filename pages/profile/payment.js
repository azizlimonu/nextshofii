import React from 'react';
import ProfileLayout from '../../components/profile/profileLayout';
import Head from 'next/head';
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from '../../styles/profile.module.scss';
import CheckoutPayment from '../../components/checkoutPage/payment';
import User from '../../models/UserModel';
import { useState } from "react";
import axios from 'axios';

const ProfilePayment = ({ user, tab, defaultPaymentMethod }) => {
  const router = useRouter();
  const [defaultPayment, setDefaultPayment] = useState(defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
  const [error, setError] = useState("");

  console.log(user, defaultPaymentMethod);

  const handlePayment = async () => {
    try {
      const { data } = await axios.put("/api/user/changePayment", {
        paymentMethod,
      });
      setError("");
      setDefaultPayment(data.paymentMethod);
      window.location.reload(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <ProfileLayout session={user.user} tab={tab}>
      <Head>
        <title>Profile - Payment</title>
      </Head>

      <div className={styles.header}>
        <h1>MY PAYMENT METHODS</h1>
      </div>

      <CheckoutPayment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        profile
      />

      <button
        disabled={!paymentMethod || paymentMethod == defaultPayment}
        className={`${styles.button} 
        ${!paymentMethod || paymentMethod == defaultPayment
            ? styles.disabled
            : ""
          }`}
        onClick={() => handlePayment()}
      >
        Save
      </button>

      {/* {error && <span className={styles.error}>{error}</span>} */}
    </ProfileLayout>
  )
}

export default ProfilePayment;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const user = await User.findById(session.user.id).select(
    "defaultPaymentMethod"
  );
  return {
    props: {
      user: session,
      tab,
      defaultPaymentMethod: user.defaultPaymentMethod,
    },
  };
}