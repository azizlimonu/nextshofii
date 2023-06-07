import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import ProfileLayout from '../../components/profile/profileLayout';
import CheckoutPayment from '../../components/checkoutPage/payment';
import User from '../../models/UserModel';
import styles from '../../styles/profile.module.scss';
import Head from 'next/head';
import DotLoaders from '../../components/loaders/DotLoaders';

const ProfilePayment = ({ user, tab, defaultPaymentMethod }) => {
  const router = useRouter();
  const [defaultPayment, setDefaultPayment] = useState(defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);

  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentMethod = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/api/user/changePayment', {
        paymentMethod
      });
      setLoading(false);
      setDefaultPayment(data.paymentMethod);
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
      seterror(error);
    }
  }

  return (
    <ProfileLayout>
      {loading && (<DotLoaders loading={loading} />)}

      <Head>
        <title>Orders</title>
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
        className={`
         ${styles.button} 
         ${!paymentMethod || paymentMethod == defaultPayment
            ? styles.disabled
            : ""
          }
        `}
        onClick={() => handlePaymentMethod()}
      >
        Save
      </button>

      {error && <span className={styles.error}>{error}</span>}
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
};