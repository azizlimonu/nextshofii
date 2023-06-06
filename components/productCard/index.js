import React from 'react';
import styles from './productcard.module.scss';
import Link from 'next/link';
import ProductSwiper from './ProductSwiper';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductCard = ({ product }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((item) => {
        return item.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  const [productVariant, setProductVariant] = useState(
    product.subProducts?.map((item) => {
      return item.color;
    })
  );

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((item) => {
          return item.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    )
  }, [active, product]);
  // console.log(prices);


  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <ProductSwiper images={images} />
        </Link>

        {product.subProducts[active].discount > 1 && (
          <div className={styles.product__discount}>
            -{product.subProducts[active].discount}%
          </div>
        )}

        <div className={styles.product__infos}>
          <h1>
            {product.name.length > 45
              ? `${product.name.substring(0, 45)}...`
              : product.name
            }
          </h1>

          <span>
            {prices.length === 1
              ? `USD${" "}${prices[0]}$`
              : `USD${" "}${prices[0]}-${prices[prices.length - 1]}$`}
          </span>

          <div className={styles.product__colors}>
            {productVariant && productVariant?.map((item, i) => item.image ? (
              <img
                key={i}
                src={item.image}
                className={i == active && styles.active}
                onMouseOver={() => {
                  setImages(product.subProducts[i].images);
                  setActive(i);
                }}
                alt=""
              />
            ) : (
              <span
                key={i}
                style={{ backgroundColor: `${item.color}` }}
                onMouseOver={() => {
                  setImages(product.subProducts[i].images);
                  setActive(i);
                }}
              >
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;