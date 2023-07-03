import React from 'react';
import styles from './style.module.scss';
import Head from "next/head";
import ProfileSidebar from '../profileSidebar';
import Header from '../../header';
import Footer from '../../footer';

const ProfileLayout = ({ session, tab, children }) => {
  console.log("SESSION IN PROFILE LAYOUT=", session);

  const country = {
    name: "Indonesia",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/id.svg"
  };

  return (
    <>
      <Header country={country} />
      <div className={styles.layout}>
        <Head>
          <title>Profile - {session?.name}</title>
        </Head>

        <div className={styles.layout__container}>
          <ProfileSidebar
            data={{
              ...session,
              tab,
            }}
          />

          <div className={styles.layout__content}>
            {children}
          </div>
        </div>
      </div>
      {/* <Footer country={country} /> */}
    </>
  )
}

export default ProfileLayout;
