import styles from './cartproduct.module.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { updateCart } from '../../../store/cartSlice';

const CartProduct = ({ product, selected, setSelected }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [active, setActive] = useState();

  useEffect(() => {

  }, []);

  const updateQty = (type) => {
    let newCart = cart.cartItems.map((item) => {
      if (item._uid === product._uid) {
        return {
          ...item,
          qty: type == "plus"
            ? product.qty + 1
            : product.qty - 1
        }
      }
      return item;
    });
    dispatch(updateCart(newCart));
  }

  const removeProduct = (id) => {

  }

  const handleSelect = () => { }

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}

      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        Shofii Official Store
      </div>

      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelect()}
        ></div>

        <img src={product.images[0].url} alt="" />

        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>

            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>

            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product._uid)}
            >
              <AiOutlineDelete />
            </div>
          </div>

          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />

            {product.size && <span>{product.size}</span>}

            {product.price && <span>{product.price.toFixed(2)}$</span>}

            <MdOutlineKeyboardArrowRight />
          </div>

          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{(product.price * product.qty).toFixed(2)}$
              </span>

              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD{product.priceBefore}$
                </span>
              )}

              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>

            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping}$ Shipping fee`
              : "Free Shipping"}
          </div>

          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your whishlist it may get
              restocked.
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default CartProduct;