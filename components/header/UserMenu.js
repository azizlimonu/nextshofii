import React from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const UserMenu = () => {
  return (
    <div className={styles.menu}>
      {/* <h4>Welcome To ShopAy</h4> */}
      {/* User Exists */}
      <div className={styles.flex}>
        <Image
          src='/images/profile.png'
          alt='profile pict'
          width={70}
          height={70}
          className={styles.menu__img}
        />
        <div className={styles.col}>
          <span>Welcome Back</span>
          <h3>Aziz Limonu</h3>
          <span>Sign Out</span>
        </div>
      </div>
      {/* User Not Exists */}
      {/* <div className={styles.flex}>
        <button>Register</button>
        <button>Login</button>
      </div> */}

      {/* Menu Profile */}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Whishlist</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu