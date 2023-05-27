import React from "react";
import SlickSwiper from "./../../components/slickSwiper/index";
import { Typography, Image } from "antd";
import futaVnPay from "../../assets/images/futa-vnpay.png";
import square from "../../assets/images/square.png";
import NewsOne from "../../assets/images/news-1.png";
import NewsTwo from "../../assets/images/news-2.jpg";
import NewsThree from "../../assets/images/news-3.png";
import NewsFour from "../../assets/images/news-4.png";
import UpdateOne from "../../assets/images/update-1.png";
import UpdateTwo from "../../assets/images/update-2.png";
import UpdateThree from "../../assets/images/update-3.png";
import UpdateFour from "../../assets/images/update-4.png";
import "./style.scss";
import { useTranslation } from "react-i18next";

const News = () => {
  const { t } = useTranslation("news");
  return (
    <div>
      <SlickSwiper />
      {/* start tin nổi bật */}
      <div className="hot-news">
        <Typography.Title className="hot-news__title" level={5}>
          <img src={square} alt="" />
          {t("news.Tin nổi bật")}
        </Typography.Title>
        <div className="hot-news__list">
          <div className="hot-news__list__left">
            <Image preview={false} src={futaVnPay} alt="" />
            <Typography.Title className="" level={5}>
              {t(
                "news.TẶNG MÃ KHUYẾN MÃI TRỰC TIẾP KHI THANH TOÁN MUA VÉ MIKA BUS LINES BẰNG VNPAY QR"
              )}
            </Typography.Title>
            <p>
              {t(
                "news.Tháng 4 được xem là thời gian tuyệt đẹp dành cho du khách tham quan và trải nghiệm những điều mới mẻ từ các địa điểm du lịch. Những ngày đầu tháng tư, khi cơn mưa rào đã dần ẩn mình để trả lại bầu không khí trong trẻo, đầy cảnh sắc của trời về với thiên nhiên. Cả miền Bắc, miền Trung, miền Nam đều ngập tràn những tia nắng ấm áp đầu hè."
              )}
            </p>
          </div>
          <div className="hot-news__list__right">
            <div className="hot-news__list__item">
              <Image preview={false} src={NewsOne} alt="" />
              <div className="hot-news__list__item--group">
                <p>{t("news.MIKA CHÍNH THỨC MỞ CỔNG GIỮ CHỖ...")}</p>
                <span>31/10/2022</span>
              </div>
            </div>
            <div className="hot-news__list__item">
              <Image preview={false} src={NewsTwo} alt="" />
              <div className="hot-news__list__item--group">
                <p>{t("news.MỞ VÍ MOMO - MUA VÉ MIKA LIỀN TAY")}</p>
                <span>04/06/2022</span>
              </div>
            </div>
            <div className="hot-news__list__item">
              <Image preview={false} src={NewsThree} alt="" />
              <div className="hot-news__list__item--group">
                <p>{t("news.MIKA THỰC HIỆN “CHUYẾN XE NGHĨA TÌNH, KẾT...")}</p>
                <span>23/10/2021</span>
              </div>
            </div>
            <div className="hot-news__list__item">
              <Image preview={false} src={NewsFour} alt="" />
              <div className="hot-news__list__item--group">
                <p>
                  {t("news.MIKA PHÁT HÀNH THẺ XE BUÝT - TIỆN LỢI VÀ TIẾT KIỆM")}
                </p>
                <span>30/04/2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start update */}
      <div className="update">
        <Typography.Title className="hot-news__title" level={5}>
          <img src={square} alt="" />
          {t("news.Mới cập nhật")}
        </Typography.Title>
        <div className="update__list">
          <div className="update__item">
            <Image preview={false} src={UpdateOne} alt="" />
            <p>{t("news.TẬP ĐOÀN MIKA - MIKA GROUP KHẲNG ĐỊNH GIÁ TRỊ...")}</p>
            <span>19/04/2023</span>
          </div>
          <div className="update__item">
            <Image preview={false} src={UpdateTwo} alt="" />
            <p>
              {t(
                "news.ƯU ĐÃI ĐẶC BIỆT CỦA VNPAY - MUA VÉ QUA MIKA GIẢM NGAY..."
              )}
            </p>
            <span>19/04/2023</span>
          </div>
          <div className="update__item">
            <Image preview={false} src={UpdateThree} alt="" />
            <p>
              {t(
                "news.NHẬP MÃ MOMOPT - GIẢM 20K CHO ĐƠN TỪ 200K VỚI LẦN ĐẦU..."
              )}
            </p>
            <span>14/04/2023</span>
          </div>
          <div className="update__item">
            <Image preview={false} src={UpdateFour} alt="" />
            <p>
              {t(
                "news.LỄ KHÔNG TĂNG GIÁ CÒN GIẢM NGAY 10K KHI MUA VÉ PHƯƠNG..."
              )}
            </p>
            <span>10/04/2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
