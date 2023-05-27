import React from "react";
import { Form, Button, Input } from "antd";
import "./style.scss";
import { useDispatch } from "react-redux";
import { CallApiRegisterUser } from "./../../redux/reducers/userReducer";
import { useTranslation } from "react-i18next";
import { regVietNameseNotNumber } from "../../utils/regExp";

// const { Option } = Select;

const Register = () => {
  const { t } = useTranslation(["home", "validate"]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(CallApiRegisterUser(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register">
      <div className="register__container">
        <Form
          name="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="register__title">{t("header.Đăng ký")}</p>

          <Form.Item
            name="name"
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
                  "validate.Không được chứa chữ số và ký tự đặc biệt!",
                  { ns: "validate" }
                ),
              },
            ]}
          >
            <Input placeholder={t("register.Fullname")} />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: t("validate.Please input your username!", {
                  ns: "validate",
                }),
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9 ]+$/),
                message: t("validate.Không được chứa ký tự đặc biệt!", {
                  ns: "validate",
                }),
              },
            ]}
          >
            <Input placeholder={t("register.Username")} />
          </Form.Item>
          <Form.Item
            name="password"
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
          >
            <Input.Password placeholder={t("register.Password")} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            // label="Confirm Password"
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
          <Form.Item
            name="idCard"
            rules={[
              {
                required: true,
                message: t("validate.Please input your Id Card!", {
                  ns: "validate",
                }),
              },

              {
                pattern: new RegExp(/^\d+$/),
                message: t("validate.Chỉ chứa chữ số!", { ns: "validate" }),
              },
              // {
              //   len: 12,
              //   message: "Không đúng định dạng!",
              // },
            ]}
          >
            <Input placeholder={t("register.IdCard")} />
          </Form.Item>
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
            <Input placeholder={t("register.PhoneNumber")} />
          </Form.Item>
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
                message: t("validate.Sai định dạng email", { ns: "validate" }),
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
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
                message: t("validate.Không được là chữ số!", {
                  ns: "validate",
                }),
              },
            ]}
          >
            <Input placeholder={t("register.City")} />
          </Form.Item>
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
            <Input placeholder={t("register.District")} />
          </Form.Item>
          {/* <Form.Item name="role"> */}
          {/* <Typography.Title
              level={5}
            >
              Điểm đi
            </Typography.Title> */}
          {/* <Select>
              <Option value={2}>Tài xế</Option>
              <Option value={3}>Thành viên</Option>
            </Select> */}
          {/* </Form.Item> */}

          <Form.Item>
            <div className="register__button-submit">
              <Button type="primary" htmlType="submit">
                {t("header.Đăng ký")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
