import React from "react";
import { Typography, Image } from "antd";
import "./style.scss";
import { useTranslation } from "react-i18next";
import CanTho from "../../assets/images/popularRoute/slide-location-can-tho.png";
import DaNang from "../../assets/images/popularRoute/slide-location-da-nang.png";
import HaNoi from "../../assets/images/popularRoute/slide-location-ha-noi.png";
import SaiGon from "../../assets/images/popularRoute/slide-location-sai-gon.png";
import CaMau from "../../assets/images/popularRoute/slide-location-ca-mau.png";
import NhaTrang from "../../assets/images/popularRoute/slide-location-khanh-hoa.png";

const PopularRoute = () => {
  const { t } = useTranslation();

  return (
    <div className="popular-route">
      <Typography.Title level={5} className="popular-route__title">
        {t("header.TUYẾN PHỔ BIẾN")}
      </Typography.Title>
      <div className="popular-route__list">
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={SaiGon}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Sài Gòn")} ⇒ {t("header.Đà Lạt")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 310km
              </p>
              <p>
                <i className="far fa-clock"></i> 8h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 300.000đ
              </p>
            </div>
          </div>
        </div>
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={DaNang}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Sài Gòn")} ⇒ {t("header.Đà Nẵng")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 980km
              </p>
              <p>
                <i className="far fa-clock"></i> 20h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 400.000đ
              </p>
            </div>
          </div>
        </div>
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={HaNoi}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Đà Nẵng")} ⇒ {t("header.Hà Nội")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 745km
              </p>
              <p>
                <i className="far fa-clock"></i> 18h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 360.000đ
              </p>
            </div>
          </div>
        </div>
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={NhaTrang}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Sài Gòn")} ⇒ {t("header.Nha Trang")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 450km
              </p>
              <p>
                <i className="far fa-clock"></i> 9h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 280.000đ
              </p>
            </div>
          </div>
        </div>
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={CanTho}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Sài Gòn")} ⇒ {t("header.Cần Thơ")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 190km
              </p>
              <p>
                <i className="far fa-clock"></i> 4h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 165.000đ
              </p>
            </div>
          </div>
        </div>
        <div className="popular-route__item">
          <Image
            className="popular-route__item--img"
            preview={false}
            src={CaMau}
            alt=""
          />
          <div className="popular-route__group">
            <Typography.Title level={5} className="popular-route__group--title">
              {t("header.Sài Gòn")} ⇒ {t("header.Cà Mau")}
            </Typography.Title>
            <div className="popular-route__content">
              <p>
                <i className="fas fa-map-marker-alt"></i> 375km
              </p>
              <p>
                <i className="far fa-clock"></i> 8h
              </p>
              <p>
                <i className="fas fa-money-bill-wave-alt"></i> 250.000đ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoute;
