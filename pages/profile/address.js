import React, { useState } from 'react';
import Head from 'next/head';
import { getSession } from "next-auth/react";
import ProfileLayout from '../../components/profile/profileLayout';
import CheckoutShipping from '../../components/checkoutPage/shipping';
import User from '../../models/UserModel';
import styles from '../../styles/profile.module.scss';

const ProfileAddress = ({ user, tab }) => {
  const [addresses, setAddresses] = useState(user.address.address);

  return (
    <ProfileLayout session={user.user} tab={tab}>
      <Head>
        <title>Profile - Address</title>
      </Head>

      <div className={styles.header}>
        <h1>MY ADDRESSES</h1>
      </div>

      <CheckoutShipping
        user={user}
        addresses={addresses}
        setAddresses={setAddresses}
        profile
      />
    </ProfileLayout>
  )
}

export default ProfileAddress;

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

  const address = await User.findById(session.user.id)
    .select("address")
    .lean();

  return {
    props: {
      user: {
        user: session.user,
        address: JSON.parse(JSON.stringify(address)),
      },
      tab,
    },
  };
}
