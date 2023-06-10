import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './header.module.scss';
import { RiSearch2Fill, RiShoppingCartLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";


const Main = ({ searchHandler }) => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const { cart } = useSelector((state) => ({ ...state }));

  const cartLength = cart.cartItems.length

  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href='/' className={styles.logo}>
          <Image
            src='/logo.png'
            alt='logo'
            width={300}
            height={300}
          />
        </Link>

        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type='text'
            placeholder='Search...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type='submit' className={styles.search__icon}>
            <RiSearch2Fill />
          </button>
        </form>

        <Link href='/' className={styles.cart}>
          <RiShoppingCartLine />
          <span>{cartLength}</span>
        </Link>
      </div>
    </div>
  )
}

export default Main