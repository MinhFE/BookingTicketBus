import React, { useState } from "react";
import { Form, Button, Input, Modal } from "antd";
import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CallApiLoginUser } from "../../redux/reducers/userReducer";
import { CallApiSendMailForgotPassword } from "./../../redux/reducers/userReducer";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation(["home", "validate"]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState("");

  const onFinish = (values) => {
    dispatch(CallApiLoginUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    sessionStorage.setItem("emailForgotPassword", forgotPassword);
    dispatch(CallApiSendMailForgotPassword(forgotPassword));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://phongcachviettravel.vn/wp-content/uploads/2022/04/TP-HCM-PHU-QUOC-3N2D-he-2023-web.jpg"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">{t("header.Đăng nhập")}</p>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t("login.mesgUn") },
              {
                pattern: new RegExp(/^[A-Za-z0-9 ]+$/),
                message: t("validate.Không được chứa ký tự đặc biệt!", {
                  ns: "validate",
                }),
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t("login.mesgPw") }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t("header.Đăng nhập")}
            </Button>
            <div className="login-page__bottom">
              <Link onClick={showModal}>{t("header.Quên mật khẩu")}?</Link>
              <p>
                {t("header.Bạn mới biết đến Mika")}?{" "}
                <Link to="/register">{t("header.Đăng ký")}</Link>
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title={t("header.Quên mật khẩu")}
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <div className="modal-forgot">
            <div>
              <Form.Item
                name="fgUser"
                rules={[
                  {
                    required: true,
                    message: t("validate.Vui lòng nhập email!", {
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
                  placeholder={t(
                    "header.Vui lòng nhập email để khôi phục mật khẩu"
                  )}
                  value={forgotPassword}
                  onChange={(e) => setForgotPassword(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="modal-forgot__btn">
              <Button key="back" onClick={handleCancel}>
                {t("validate.Huỷ", { ns: "validate" })}
              </Button>
              <Button htmlType="submit" type="primary">
                OK
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
