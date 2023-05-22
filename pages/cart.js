import React from 'react';
import styles from '../styles/cart.module.scss';
import HeaderCart from '../components/cart/header/HeaderCart';
import CartHeader from '../components/cart/cartHeader/CartHeader';
import CartProduct from '../components/cart/product/CartProduct';
import CartCheckout from '../components/cart/checkout/CartCheckout';
import CartPayment from '../components/cart/payment/CartPayment';
import CartEmpty from '../components/cart/cartEmpty/CartEmpty';

const cart = () => {
  const cart = {
    cartItems: [
      { name: "", image: "", product: "" },
      { name: "", image: "", product: "" },
      { name: "", image: "", product: "" },
    ]
  };

  return (
    <>
      <CartHeader />

      <div className={styles.cart}>

        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            {/* Cart Header */}
            <HeaderCart />

            {/* List Cart Product */}
            <div className={styles.cart__products}>
              <CartProduct />
            </div>

            {/* Checkout Section */}
            <CartCheckout />

            {/* Payment Section */}
            <CartPayment />

          </div>
        ) : (
          <CartEmpty />
        )}

        {/* Product Swiper to other product */}
      </div>
    </>
  )
}

export default cart;