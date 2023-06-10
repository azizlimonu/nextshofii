import React from 'react';
import { getSession } from "next-auth/react";
import ProfileLayout from '../../components/profile/profileLayout';
import Layout from '../../components/layout/Layout';

const ProfilePage = ({ user, tab }) => {

  return (
    <Layout>
      <ProfileLayout session={user.user} tab={tab} />
    </Layout>
  )
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const tab = query.tab || 0;
  return {
    props: { user: session, tab },
  };
}
