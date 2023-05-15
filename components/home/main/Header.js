import React from 'react';
import styles from './main.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Store</Link>
        </li>
        <li>
          <Link href="/">Electronics</Link>
        </li>
        <li>
          <Link href="/">Watches</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header;