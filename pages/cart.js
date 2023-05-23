import React, { useEffect, useState } from 'react';
import styles from '../styles/cart.module.scss';
import HeaderCart from '../components/cart/header/HeaderCart';
import CartHeader from '../components/cart/cartHeader/CartHeader';
import CartProduct from '../components/cart/product/CartProduct';
import CartCheckout from '../components/cart/checkout/CartCheckout';
import CartPayment from '../components/cart/payment/CartPayment';
import CartEmpty from '../components/cart/cartEmpty/CartEmpty';
import { saveCart } from '../libs/user';

import { useSelector } from 'react-redux';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";


const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const [selected, setSelected] = useState([]);
  const { data: session } = useSession();
  const Router = useRouter();

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );

    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));

    setTotal((
      selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
    ).toFixed(2));

  }, [selected, shippingFee]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  }

  return (
    <>
      <div className={styles.cart}>

        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <HeaderCart
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />

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

            <CartCheckout
              total={total}
              subtotal={subtotal}
              selected={selected}
              shippingFee={shippingFee}
              saveCartToDbHandler={saveCartToDbHandler}
            />

            <CartPayment />

          </div>
        ) : (
          <CartEmpty />
        )}
      </div>
    </>
  )
}

export default Cart;