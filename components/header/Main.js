import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RiSearch2Fill, RiShoppingCartLine } from 'react-icons/ri';

const Main = () => {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href='/' className={styles.logo}>
          <Image
            src='/logo.png'
            alt='logo'
            width={170}
            height={100}
          />
        </Link>

        <form className={styles.search}>
          <input
            type='text'
            placeholder='Search...'
            value={query}
          />
          <button type='submit' className={styles.search__icon}>
            <RiSearch2Fill />
          </button>
        </form>

        <Link href='/' className={styles.cart}>
          <RiShoppingCartLine />
          <span>0</span>
        </Link>
      </div>
    </div>
  )
}

export default Main