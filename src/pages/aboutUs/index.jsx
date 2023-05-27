import React from "react";
import "./style.scss";
import { Typography, Image } from "antd";
import Quantity from "./../../components/quantity/index";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation("aboutUs");
  return (
    <div className="about-us">
      <Typography.Title level={2} className="about-us__title">
        {t("aboutUs.MIKA")}
      </Typography.Title>
      <p className="about-us__intro">{t("aboutUs.Chất lượng là danh dự")}</p>
      <div className="about-us__introduce">
        <Typography.Title level={4} className="about-us__title-section">
          {t("aboutUs.GIỚI THIỆU")}
        </Typography.Title>
        <Image
          preview={false}
          src="https://futabus.vn/_nuxt/img/aboutus-01.86f1c35.jpg"
          alt=""
        />
        <p>
          {t(
            "aboutUs.Công ty MIKA được thành lập năm 2022. Trải qua 1 năm phát triển đặt khách hàng làm trọng tâm, chúng tôi tự hào trở thành doanh nghiệp vận tải nòng cốt đóng góp tích cực vào sự phát triển chung của ngành vận tải nói riêng và nền kinh tế đất nước nói chung. Luôn cải tiến mang đến chất lượng dịch vụ tối ưu nhất dành cho khách hàng."
          )}
        </p>

        <Image
          preview={false}
          src="https://futabus.vn/_nuxt/img/aboutus-02.dabdcab.png"
          alt=""
        />
        <p>
          {t(
            "aboutUs.Tuân thủ phương châm Chất lượng là danh dự, Công ty Cổ phần Xe Khách MIKA Bus Lines hiện đang khai thác hơn 60 tuyến vận tải hành khách liên tỉnh cố định trải dài từ Nam ra Bắc với hơn 250 phòng vé và trạm trung chuyển, hơn 2,000 đầu xe các loại, phục vụ hơn 20 triệu lượt khách mỗi năm."
          )}
        </p>

        <Image
          preview={false}
          src="https://futabus.vn/_nuxt/img/aboutus-04.54f0854.jpg"
          alt=""
        />
        <p>
          {t(
            "aboutUs.Song hành cùng sự phát triển của xe khách MIKA, chúng tôi nhận thấy một nhu cầu tất yếu là vận chuyển hàng hóa đi kèm với hành khách và hàng hóa không đi kèm với hành khách. Đáp ứng nhu cầu cũng như sự tin tưởng của khách hàng dành cho MIKA, Công ty Cổ phần Dịch vụ chuyển phát nhanh MIKA Express đang trong quá trình sắp sửa đưa vào hoạt động trong thời gian không xa."
          )}
        </p>

        <Image
          preview={false}
          src="https://futabus.vn/_nuxt/img/aboutus-08.7cbf1e8.png"
          alt=""
        />
        <p>
          {t(
            "aboutUs.Lĩnh vực xe khách là mảnh ghép quan trọng trong chuỗi hoạt động chính mà công ty MIKA hướng đến. Đầu tư vào những dòng xe đời mới chất lượng cao, xe khách MIKA mang đến cho hành khách đầy đủ tiện nghi như máy lạnh, wifi cùng đội ngũ tài xế, nhân viên chuyên nghiệp. Xe khách MIKA cam kết mang đến cho khách hàng một chuyến đi an toàn, thoải mái với mức giá phù hợp."
          )}
        </p>
      </div>
      <Quantity />
      <div className="about-us__service">
        <Typography.Title level={4} className="about-us__title-section">
          {t("aboutUs.Các dịch vụ của MIKA")}
        </Typography.Title>
        <div className="about-us__service__list">
          <div className="about-us__service__item">
            <p>{t("aboutUs.Xe khách liên tỉnh")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/buslines.d9bb215.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>{t("aboutUs.Chuyển phát nhanh")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/express.04ed28d.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>{t("aboutUs.Xe nội thành")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/citybus.9ec40fa.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>taxi</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/taxi.6e1775c.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>trạm dừng chân</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/reststop.7e2e4fc.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>{t("aboutUs.Bất động sản")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/realestate.d6ec426.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>{t("aboutUs.Dịch vụ quảng cáo")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/advertising.9aaf119.jpg"
              alt=""
            />
          </div>
          <div className="about-us__service__item">
            <p>{t("aboutUs.TẬP ĐOÀN MIKA")}</p>
            <Image
              preview={false}
              src="https://futabus.vn/_nuxt/img/futagroup.f102cd2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
