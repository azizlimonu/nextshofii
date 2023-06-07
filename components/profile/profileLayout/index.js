import React from 'react';
import styles from './style.module.scss';
import Head from "next/head";
import ProfileSidebar from '../profileSidebar';

const ProfileLayout = ({ session, tab, children }) => {
  console.log("SESSION IN PROFILE LAYOUT=", session);

  return (
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
  )
}

export default ProfileLayout;
