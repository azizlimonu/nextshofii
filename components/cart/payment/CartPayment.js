import React from 'react';
import styles from './CartPayment.module.scss';

const CartPayment = () => {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment Methods</h2>
      
      <div className={styles.images}>
        <img src="./images/payment/visa.webp" alt="" />
        <img src="./images/payment/mastercard.webp" alt="" />
        <img src="./images/payment/paypal.webp" alt="" />
      </div>

      <h2 className={styles.header}>Buyer Protection</h2>

      <div className={styles.protection}>
        <img src="./images/protection.png" alt="" />
        Get full refund if the item is not as described or if its not
        delievered.
      </div>
    </div>
  )
}

export default CartPayment