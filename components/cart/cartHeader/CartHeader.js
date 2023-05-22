import React from 'react';
import Link from "next/link";
import { GrFormPreviousLink } from "react-icons/gr";
import styles from './cartheader.module.scss';

const CartHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link href='/browse'>
          <GrFormPreviousLink />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default CartHeader