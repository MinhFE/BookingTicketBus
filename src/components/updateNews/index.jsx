import React from "react";
import { Typography, Image, Button } from "antd";
import "./style.scss";
import { useTranslation } from "react-i18next";

const UpdateNews = () => {
  const { t } = useTranslation("home");
  return (
    <div className="update-news">
      <Typography.Title level={5} className="update-news__title">
        {t("header.TIN TỨC CẬP NHẬT")}
      </Typography.Title>
      <div className="update-news__list">
        <div className="update-news__item">
          <Image
            className="update-news__item--img"
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/761094a3-f0c8-4f94-9ef1-10e05dc8cb64-1681893338738.png"
            alt=""
          />
          <p>{t("header.TẬP ĐOÀN MIKA – MIKA GROUP KHẲNG ĐỊNH GIÁC THƯƠNG")}</p>
        </div>
        <div className="update-news__item">
          <Image
            className="update-news__item--img"
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/12befd47-eadf-4a4d-b706-cd0d6c230f33-1681893912481.png"
            alt=""
          />
          <p>
            {t(
              "header.ƯU ĐÃI ĐẶC BIỆT CỦA VNPAY – MUA VÉ QUA APP MIKA GIẢM NGAY 10K"
            )}
          </p>
        </div>
        <div className="update-news__item">
          <Image
            className="update-news__item--img"
            preview={false}
            src="https://cdn.vato.vn/google-storage/facecar-29ae7.appspot.com/images/13b24454-9a1a-4826-bea9-2a984dfd02b6-1681437080748.png"
            alt=""
          />
          <p>
            {t(
              "header.NHẬP MÃ MOMOPT - GIẢM 20K CHO ĐƠN TỪ 200K VỚI LẦN ĐẦU MUA VÉ"
            )}
          </p>
        </div>
      </div>
      <Button className="update-news__show">{t("header.Xem thêm")}</Button>
      <div className="update-news__list-icon">
        <div className="update-news__list-icon__item">
          <div className="update-news__list-icon__item--icon">
            {/* <i className="fas fa-wreath"></i> */}
            <i className="fas fa-user-shield"></i>
          </div>
          <div className="update-news__list-icon__item--group">
            <Typography.Title level={5} className="">
              {t("header.NHỮNG QUY ĐỊNH CHUNG")}
            </Typography.Title>
            <p>{t("header.Quy định về việc đặt mua vé và quy định chung")}</p>
          </div>
        </div>
        <div className="update-news__list-icon__item">
          <div className="update-news__list-icon__item--icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="update-news__list-icon__item--group">
            <Typography.Title level={5} className="">
              {t("header.VẬN CHUYỂN HÀNG HÓA")}
            </Typography.Title>
            <p>{t("header.Quy định về hàng hóa và an toàn vận chuyển")}</p>
          </div>
        </div>
        <div className="update-news__list-icon__item">
          <div className="update-news__list-icon__item--icon">
            <i className="fas fa-suitcase-rolling"></i>
          </div>
          <div className="update-news__list-icon__item--group">
            <Typography.Title level={5} className="">
              {t("header.THÔNG TIN HÀNH LÝ")}
            </Typography.Title>
            <p>{t("header.Quy định về hành lý xách tay và ký gửi")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNews;
