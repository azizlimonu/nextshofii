import React from 'react';
import { paymentMethods } from '../../../data/paymentMethod';
import styles from "./styles.module.scss";

const CheckoutPayment = ({ paymentMethod, setPaymentMethod, profile }) => {
  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      )}

      {paymentMethods.map((item, i) => (
        <label
          key={i}
          htmlFor={item.id}
          className={styles.payment__item}
          onClick={() => setPaymentMethod(item.id)}
          style={{
            background: `
            ${paymentMethod == item.id
                ? "#f5f5f5"
                : ""
              }`
          }}
        >
          <input
            type="radio"
            name="payment"
            id={item.id}
            checked={paymentMethod == item.id}
          />

          <img
            src={`/images/checkout/${item.id}.webp`}
            alt={item.name}
          />

          <div className={styles.payment__item_col}>
            <span>Pay with {item.name}</span>
            <p>
              {item.images.length > 0
                ? item.images.map((img, i) => (
                  <img
                    key={i}
                    src={`/images/payment/${img}.webp`}
                    alt=""
                  />
                ))
                : item.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  )
}

export default CheckoutPayment;