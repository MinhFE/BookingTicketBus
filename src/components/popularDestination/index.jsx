import React from "react";
import { Typography } from "antd";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import NamCan from "../../assets/images/popularRoute/slide-location-1.png";
import CaMau from "../../assets/images/popularRoute/slide-location-ca-mau.png";
import CanTho from "../../assets/images/popularRoute/slide-location-can-tho.png";
import DaNang from "../../assets/images/popularRoute/slide-location-da-nang.png";
import HaNoi from "../../assets/images/popularRoute/slide-location-ha-noi.png";
import KhanhHoa from "../../assets/images/popularRoute/slide-location-khanh-hoa.png";
import SaiGon from "../../assets/images/popularRoute/slide-location-sai-gon.png";
import Hue from "../../assets/images/popularRoute/slide-location-hue.png";
import LamDong from "../../assets/images/popularRoute/slide-location-lam-dong.png";
import LongXuyen from "../../assets/images/popularRoute/slide-location-long-xuyen.png";
import RachGia from "../../assets/images/popularRoute/slide-location-rach-gia.png";
import { useTranslation } from "react-i18next";

const PopularDestination = () => {
  const { t } = useTranslation();
  return (
    <div className="pop-des">
      <Typography.Title level={5} className="pop-des__title">
        {t("header.ĐIỂM ĐẾN PHỔ BIẾN")}
      </Typography.Title>
      <p className="pop-des__intro">
        {t("header.Gợi ý những điểm du lịch được ưa thích trong năm")}
      </p>

      <div className="pop-des__list">
        <Swiper
          navigation={true}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={60}
          slidesPerView="auto"
          centeredSlides={true}
          loopedSlides={4}
          loop={true}
        >
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${SaiGon})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.TP. Hồ Chí Minh")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Sài Gòn")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${KhanhHoa})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Nha Trang")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Khánh Hoà")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${CaMau})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Cà Mau")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Năm Căn")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${CanTho})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Cần Thơ")}
              </p>
              <Typography.Title level={5} className="">
                {/* {t("header.Cần Thơ")} */}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${DaNang})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Đà Nẵng")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Cầu Rồng")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${HaNoi})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Hà Nội")}
              </p>
              <Typography.Title level={5} className="">
                {/* {t("header.Hà Nội")} */}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${NamCan})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Cà Mau")}
              </p>
              <Typography.Title level={5} className="">
                {/* {t("header.Sài Gòn")} */}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${Hue})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Huế")}
              </p>
              <Typography.Title level={5} className="">
                {/* {t("header.Sài Gòn")} */}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${LamDong})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Đà Lạt")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Lâm Đồng")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${LongXuyen})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Châu Đốc")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Long Xuyên")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage: `url(${RachGia})`,
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.Hà Tiên")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Rạch Giá")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage:
                'url("https://futabus.vn/_nuxt/img/commonDest_item11.7baf682.png")',
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.TP. Hồ Chí Minh")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Sài Gòn")}
              </Typography.Title>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="pop-des__item"
            style={{
              backgroundImage:
                'url("https://futabus.vn/_nuxt/img/commonDest_item11.7baf682.png")',
            }}
          >
            <div className="pop-des__item__content">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {t("header.TP. Hồ Chí Minh")}
              </p>
              <Typography.Title level={5} className="">
                {t("header.Sài Gòn")}
              </Typography.Title>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularDestination;
