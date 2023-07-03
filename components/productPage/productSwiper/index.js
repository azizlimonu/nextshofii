import React from 'react';
import styles from './productSwiper.module.scss';
import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';

const ProductSwiper = ({ images, activeImage }) => {
  // console.log(images, activeImage);

  const [active, setActive] = useState(0);

  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: activeImage || images[active].url,
              sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
            },
            largeImage: {
              src: activeImage || images[active].url,
              width: 1200,
              height: 1800
            },
            enlargedImageContainerDimensions: {
              width: '200%',
              height: '100%'
            }
          }}
        />
      </div>

      <div className={styles.swiper__list}>
        {images?.map((img, i) => (
          <div
            className={
              `${styles.swiper__list_item} 
              ${i == active && styles.active}`
            }
            key={i}
            onMouseOver={() => setActive(i)}
          >
            <img src={img.url} alt="" key={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSwiper;