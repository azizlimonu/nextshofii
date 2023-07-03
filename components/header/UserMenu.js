import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn } from "next-auth/react";

const UserMenu = ({ session }) => {
  console.log(session);

  return (
    <div className={styles.menu}>
      {session ? (
        <div className={styles.flex}>
          <img src={session?.user?.image} alt="" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session?.user?.name}</h3>
            <span onClick={() => signOut()} >Sign Out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={() => (signIn())}>
            Login
          </button>
        </div>
      )}

      {/* Menu Profile */}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders?tab=1&q=all-orders__">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address?tab=0&q=addresses">Address</Link>
        </li>
        <li>
          <Link href="/whishlist">Whishlist</Link>
        </li>
        {session.user.role === "admin" && (
          <li>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default UserMenu