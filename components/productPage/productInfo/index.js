import styles from './productInfo.module.scss';
import Share from './share';
import Accordian from './Accordian';
import RelatedProduct from './RelatedProduct';

import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart } from '../../../store/cartSlice';
import { signIn, useSession } from 'next-auth/react';
import { showDialog } from '../../../store/dialogSlice';
import { toast } from 'react-toastify';
import DialogModal from '../../dialogmodal';
import DotLoaders from '../../loaders/DotLoaders';

const ProductInfo = ({ product, setActiveImage }) => {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // change style reset the qty
  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);

  // change size if the qty is over than product qty
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [product.quantity, qty, router.query.size]);

  // console.log("product detail : ", product);

  // ========================== >
  const addToCartHandler = async () => {
    setLoading(true);
    try {
      if (!router.query.size) {
        setError("Please Select a size");
        return;
      }
      const { data } = await axios.get(
        `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
      );
      // console.log("data =>", data);
      if (qty > data.quantity) {
        setError(
          "The Quantity you have choosed is more than in stock. Try and lower the Qty"
        );
      } else if (data.quantity < 1) {
        setError("This Product is out of stock.");
        return;
      } else {
        // create some unique id for the product with the same style and size to prevent duplicate
        let _uid = `${data._id}_${product.style}_${router.query.size}`;
        let exist = cart.cartItems.find((p) => p._uid === _uid);
        if (exist) {
          let newCart = cart.cartItems.map((product) => {
            if (product._uid == exist._uid) {
              return {
                ...product, qty: qty
              };
            }
            return product;
          });
          dispatch(updateCart(newCart));
        } else {
          dispatch(addToCart({
            ...data,
            qty,
            size: data.size,
            _uid
          }))
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };
  // ========================== >

  const wishlistHandler = async () => {
    setLoading(true);
    try {
      if (!session) {
        return signIn();
      }
      if (!router.query.size || !router.query.style) {
        setError("Please Select a size and style");
        dispatch(
          showDialog({
            header: "Please select size and style",
            messages: [
              {
                msg: "Choose your size and your style",
                type: "error",
              },
            ],
          })
        );
        setLoading(false);
        return;
      }

      const { data } = await axios.put('/api/user/wishlist', {
        product_id: product._id,
        style: product.style,
        size: router.query.size
      });

      dispatch(
        showDialog({
          header: "Product Added to Whishlist Successfully",
          messages: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );

    } catch (error) {
      console.log(error);
      toast.error(error.message);

      dispatch(
        showDialog({
          header: "Wishlist Error",
          messages: [
            {
              msg: error.message,
              type: "error",
            },
          ],
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className={styles.infos}>
      <DialogModal />
      {loading && <DotLoaders loading={loading} />}

      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>

        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={1}
            readOnly
            style={{ color: "#FACF19" }}
          />
          (
          {product.numReviews}
          {product.numReviews == 1 ? " review" : " reviews"}
          )
        </div>

        <div className={styles.infos__price}>
          {
            size
              ? <h1> ${" "}{product.price} </h1>
              : <h2>{product.priceRange}</h2>

          }

          {product.discount > 0 ? (
            <h3>
              {size && <span>{product.priceBefore}$</span>}
              <span>(- {product.discount}% off)</span>
            </h3>
          ) : ("")}
        </div>

        <span className={styles.infos__shipping}>
          {
            product.shipping
              ? `+${product.shipping} $ shipping fee`
              : "Free Shipping  "
          }
        </span>

        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)
          } {" "}
          Quantity Available
        </span>

        <div className={styles.infos__sizes}>
          <h4>Select a Size : </h4>

          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                key={i}
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
              >
                <div
                  className={`
                  ${styles.infos__sizes_size} 
                  ${i == router.query.size && styles.active_size
                    }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.infos__colors}>
          {product.colors && product.colors.map((color, i) => (
            <span
              key={i}
              className={
                i == router.query.style
                  ? styles.active_color
                  : ""
              }
              onMouseOver={() =>
                setActiveImage(product.subProducts[i].images[0].url)
              }
              onMouseLeave={() => setActiveImage("")}
            >
              <Link href={`/product/${product.slug}?style=${i}`}>
                <img src={color.image} alt="" />
              </Link>
            </span>
          ))}
        </div>

        <div className={styles.infos__qty}>
          <button
            onClick={() => qty > 1 && setQty((prev) => prev - 1)}
          >
            <TbMinus />
          </button>

          <span>{qty}</span>

          <button
            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>

        <div className={styles.infos__actions}>
          <button
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill />
            <b>ADD TO CART</b>
          </button>

          <button onClick={() => wishlistHandler()}>
            <BsHeart />
            ADD TO WISHLIST
          </button>
        </div>

        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}

        <Share />
        <Accordian
          details={[product.description, ...product.details]}
        />
        <RelatedProduct />
      </div>
    </div>
  )
}

export default ProductInfo;