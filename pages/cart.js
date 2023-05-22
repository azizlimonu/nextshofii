import React, { useState } from 'react';
import styles from '../styles/cart.module.scss';
import HeaderCart from '../components/cart/header/HeaderCart';
import CartHeader from '../components/cart/cartHeader/CartHeader';
import CartProduct from '../components/cart/product/CartProduct';
import CartCheckout from '../components/cart/checkout/CartCheckout';
import CartPayment from '../components/cart/payment/CartPayment';
import CartEmpty from '../components/cart/cartEmpty/CartEmpty';

import { useSelector } from 'react-redux';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const [selected, setSelected] = useState([]);
  const { data: session } = useSession();

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
              {cart.cartItems.map((product) => (
                <CartProduct
                  key={product._uid}
                  product={product}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
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

export default Cart;