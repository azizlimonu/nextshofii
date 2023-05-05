import React from 'react';
import styles from './footer.module.scss';
import Image from 'next/image';

const Payment = () => {
  return (
    <div className={styles.footer__payment}>
      <h3>We Accept</h3>
      <div className={styles.footer__flexwrap}>
        <Image
          src='/images/payment/visa.webp'
          alt='visa'
          width={140}
          height={40}
        />
        <Image
          src='/images/payment/mastercard.webp'
          alt='mastercard'
          width={140}
          height={40}
        />
        <Image
          src='/images/payment/paypal.webp'
          alt='paypal'
          width={140}
          height={40}
        />
      </div>
    </div>
  )
}

export default Payment