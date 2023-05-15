import React from 'react'
import styles from './main.module.scss';
import Link from 'next/link';
import { offersArray } from '../../../data/Home';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Image from 'next/image';

const Offers = () => {
  return (
    <div className={styles.offers}>
      <div className={styles.offers__text}>
        <p>
          use code <b>“NEWYEAR2023”</b> for 30% off all products.
        </p>
        <Link href="/browse">Shop now</Link>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersArray?.map((item, i) => (
          <SwiperSlide key={i}>
            <Link href="">
              {/* <Image
                width={150}
                height={270}
                alt={item.image}
                src={item.image}
              /> */}
              <img src={item.image} alt="" />
            </Link>
            <span>{item.price}$</span>
            <span>-{item.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
};

export default Offers;