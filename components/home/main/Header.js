import React from 'react';
import styles from './main.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Trending</Link>
        </li>
        <li>
          <Link href="/">Electronics</Link>
        </li>
        <li>
          <Link href="/">Watches</Link>
        </li>
        <li>
          <Link href="/">Fashion</Link>
        </li>
        <li>
          <Link href="/">Shoes</Link>
        </li>
        <li>
          <Link href="/">Smarthphone</Link>
        </li>
        <li>
          <Link href="/">Furniture</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header;