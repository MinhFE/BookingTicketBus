import React from "react";
import { Typography, Image } from "antd";
import DaThongBao from "../../assets/images/DaThongBao.png";
import iconFb from "../../assets/images/facebook.png";
import iconYoutube from "../../assets/images/youtube.png";
import { Link } from "react-router-dom";
import "./style.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__top__contact">
            <Typography.Title level={5}>
              {t("header.TỔNG ĐÀI ĐẶT VÉ VÀ CSKH")}
              <p>19001080</p>
            </Typography.Title>
            <Image preview={false} src={DaThongBao} alt="da-thong-bao" />
          </div>
          <div className="footer__top__desc">
            <p>{t("header.CÔNG TY CỔ PHẦN XE KHÁCH MIKA BUS LINES")}</p>
            <p>{t("header.Địa chỉ")}</p>
            <p>
              Email: <Link to="/">hotro@mika.vn</Link>
            </p>
            <p>
              {t(`header.Điện thoại`)}: 098765431 &nbsp;&nbsp;&nbsp; Fax:
              013546789
            </p>
          </div>
        </div>
        <div className="footer__center">
          <Typography.Title level={5}>
            {t("header.KẾT NỐI VỚI CHÚNG TÔI")}
          </Typography.Title>
          <div>
            <Image preview={false} src={iconFb} alt="" />
            <Image preview={false} src={iconYoutube} alt="" />
          </div>
        </div>
        <div className="footer__bottom">
          <Typography.Title level={5}>MIKA BUS LINES</Typography.Title>
          <div className="footer__bottom__list">
            <ul>
              <li>
                <i
                  class="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Về chúng tôi")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Lịch trình")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Tin tức")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Tuyển dụng")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Tra cứu thông tin đặt vé")}
              </li>
            </ul>
            <ul>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Điều khoản sử dụng")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Hỏi đáp")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Hướng dẫn đặt vé trên Web")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Hướng dẫn đặt vé trên Web")}
              </li>
              <li>
                <i
                  className="fas fa-angle-double-right"
                  style={{ color: "#637280" }}
                ></i>{" "}
                {t("header.Mạng lưới văn phòng")}
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__intro">
          {t(
            "header.© 2023 | Bản quyền thuộc về Công ty Cổ Phần Xe Khách Mika Bus Lines |www.mikabus.vn"
          )}
        </p>
      </div>
    </div>
  );
};

export default Footer;
