import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const MainSwiper = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(10).keys()].map((_, i) => (
          <SwiperSlide key={i}>
            <Image
              width={880}
              height={300}
              src={`/images/swiper/${i+1}.jpg`}
              alt={i}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default MainSwiper;