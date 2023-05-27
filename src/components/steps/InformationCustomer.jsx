/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Typography, Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { regVietNameseNotNumber } from "../../utils/regExp";
import { useTranslation } from "react-i18next";

const InformationCustomer = (props) => {
  const {
    activeClass,
    handleContinueStepInfo,
    setCurrent,
    setCustomerInfo,
    totalPrice,
  } = props;
  const { t } = useTranslation(["home", "validate", "schedule"]);
  const [cusInfo, setCusInfo] = useState({
    totalMoney: totalPrice,
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    seats: activeClass,
  });

  // console.log(cusInfo);
  useEffect(() => {
    setCustomerInfo(cusInfo);
  }, [cusInfo]);

  return (
    <div className="info-customer">
      <Typography.Title level={4} className="info-customer__title">
        {t("pay.THÔNG TIN KHÁCH HÀNG", { ns: "schedule" })}
      </Typography.Title>
      <Form onFinish={handleContinueStepInfo}>
        <div className="info-customer__list">
          <div className="info-customer__item">
            <p>{t("pay.Họ tên khách hàng", { ns: "schedule" })} *</p>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your name!", {
                    ns: "validate",
                  }),
                },
                {
                  pattern: new RegExp(regVietNameseNotNumber),
                  message: t(
                    "validate.Không được chứa chữ số và ký tự đặc biệt",
                    { ns: "validate" }
                  ),
                },
              ]}
            >
              <Input
                name="fullName"
                value={cusInfo.fullName}
                onChange={(event) =>
                  setCusInfo((prev) => ({
                    ...prev,
                    fullName: event.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
          <div className="info-customer__item">
            <p>{t("pay.Số điện thoại", { ns: "schedule" })} *</p>
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your phone number!", {
                    ns: "validate",
                  }),
                },
                {
                  pattern: new RegExp(/^0\d{9}$/),
                  message: t("validate.Số điện thoại phải có 10 số!", {
                    ns: "validate",
                  }),
                },
              ]}
            >
              <Input
                name="phoneNumber"
                value={cusInfo.phoneNumber}
                onChange={(event) =>
                  setCusInfo((prev) => ({
                    ...prev,
                    phoneNumber: event.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
          <div className="info-customer__item">
            <p>Email *</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your email!", {
                    ns: "validate",
                  }),
                },
                {
                  type: "email",
                  message: t("validate.Sai định dạng email", {
                    ns: "validate",
                  }),
                },
              ]}
            >
              <Input
                name="email"
                value={cusInfo.email}
                onChange={(event) =>
                  setCusInfo((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
          <div className="info-customer__item">
            <p>{t("pay.Tỉnh/TP", { ns: "schedule" })} *</p>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your city!", {
                    ns: "validate",
                  }),
                },
                {
                  pattern: new RegExp(regVietNameseNotNumber),
                  message: t(
                    "validate.Không được chứa chữ số và ký tự đặc biệt!",
                    {
                      ns: "validate",
                    }
                  ),
                },
              ]}
            >
              <Input
                name="city"
                value={cusInfo.city}
                onChange={(event) =>
                  setCusInfo((prev) => ({
                    ...prev,
                    city: event.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
          <div className="info-customer__item">
            <p>{t("pay.Quận/Huyện", { ns: "schedule" })} *</p>
            <Form.Item
              name="district"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your district!", {
                    ns: "validate",
                  }),
                },
              ]}
            >
              <Input
                name="district"
                value={cusInfo.district}
                onChange={(event) =>
                  setCusInfo((prev) => ({
                    ...prev,
                    district: event.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
          <div className="info-customer__group">
            <Button
              className="info-customer__back"
              onClick={() => {
                setCurrent(1);
              }}
            >
              {t("pay.Quay lại", { ns: "schedule" })}
            </Button>
            <Button
              htmlType="submit"
              className="info-customer__continue"
              // onClick={handleContinueStepInfo}
            >
              {t("pay.Tiếp tục", { ns: "schedule" })}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InformationCustomer;
