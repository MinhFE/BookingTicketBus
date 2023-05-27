import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "swiper/css";

import "./style.scss";
import SwiperCore, { Autoplay } from "swiper";

const SlickSwiper = () => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="slick-swiper">
      <Swiper
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        speed={5000}
        loop={true}
        // modules={[Autoplay]}
      >
        <SwiperSlide>
          <Image
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/12befd47-eadf-4a4d-b706-cd0d6c230f33-1681893912481.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/7bb539ab-99af-45c1-ba1f-7e67e9faf2de-1680316725359.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/c823c1bd-da4b-41f3-b77d-97c8814d708b-1680578668871.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SlickSwiper;
