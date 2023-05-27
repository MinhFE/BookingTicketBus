import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { CallApiForgotPasswordUser } from "./../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeLocal } from "../../utils/config";

const ForgotPassword = () => {
  const { t } = useTranslation(["home", "validate"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [dataUserInfo, setDataUserInfo] = useState({
  //   email: "",
  //   password: "",
  // });

  const email = sessionStorage.getItem("emailForgotPassword");

  const handleResetPassword = async (value) => {
    await dispatch(CallApiForgotPasswordUser({ email: email, ...value }));
    removeLocal("emailForgotPassword");
    navigate("/login");
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <Typography.Title level={4}>
          {t("fgPw.Reset your password")}
        </Typography.Title>
        <div className="forgot-password__form">
          {/* <div className="forgot-password__item">
            <p>Email:</p>
            <Input
              name="email"
              size="large"
              value={dataUserInfo.email}
              placeholder="Vui lòng nhập email"
              onChange={(event) => setDataUserInfo((prev) => ({
                ...prev,
                email: event.target.value
              }))}
            />
          </div>
          <div className="forgot-password__item">
            <p>Mật khẩu:</p>
            <Input.Password
              name="password"
              size="large"
              value={dataUserInfo.password}
              placeholder="Vui lòng nhập mật khẩu"
              onChange={(event) =>
                setDataUserInfo((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
          </div> */}
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={(value) => handleResetPassword(value)}
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: t("validate.Please input your password!", {
                    ns: "validate",
                  }),
                },
                {
                  min: 6,
                  max: 20,
                  message: t("validate.Mật khẩu phải từ 6 đến 20 ký tự!", {
                    ns: "validate",
                  }),
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder={t("fgPw.Password")} />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: t("validate.Vui lòng nhập lại mật khẩu", {
                    ns: "validate",
                  }),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t("fgPw.mesgCP"));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password placeholder={t("fgPw.ConfirmPassword")} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                htmlType="submit"
                block
                style={{ background: "orange", color: "white" }}
              >
                {t("fgPw.ResetPassword")}
              </Button>
            </Form.Item>
          </Form>
          {/* <Button
            className="forgot-password__submit"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
