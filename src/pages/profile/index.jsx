import React, { useState, useEffect } from "react";
import "./style.scss";
import { Typography, Input, Button, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiUserProfileReducer,
  UpdateUserProfileAction,
} from "./../../redux/reducers/userReducer";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/es/form/Form";
import { regVietNameseNotNumber } from "../../utils/regExp";
import bcrypt from "bcryptjs";
import { openNotificationWithIcon } from "../../components/notification";

const Profile = () => {
  const { t } = useTranslation(["home", "validate"]);
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const userProfile = useSelector((state) => state.UserReducer.userProfile);
  const [profile, setProfile] = useState(userProfile);
  useEffect(() => {
    setProfile(userProfile);
    form.setFieldsValue(userProfile);
  }, [userProfile]);

  const handleChangeProfile = (event) => {
    const name = event.target.name;
    setProfile((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleUpdateProfile = async () => {
    const newProfile = {
      name: profile.name,
      idCard: profile.idCard,
      // password: profile.password,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      city: profile.city,
      district: profile.district,
    };
    // console.log(newProfile);
    await dispatch(UpdateUserProfileAction(profile.id, newProfile));
    await dispatch(CallApiUserProfileReducer(profile.id));
  };
  const handleChangePassword = (value) => {
    bcrypt.compare(value.password, profile.password, async (err, res) => {
      if (res) {
        try {
          await dispatch(
            UpdateUserProfileAction(profile.id, { password: value.newPassword })
          );
          setIsShow(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsShow(false);
        openNotificationWithIcon(
          "error",
          "Mật khẩu cũ không chính xác. Vui lòng nhập lại!"
        );
      }
    });
  };
  return (
    <div className="profile">
      <Typography.Title level={4} className="profile__title">
        {t("profile.title")}
      </Typography.Title>
      <Form name="formUpdateProfile" form={form} onFinish={handleUpdateProfile}>
        <div className="profile__form">
          <div className="profile__form__item">
            <p>{t("profile.name")}:</p>
            <Form.Item
              name="name"
              style={{ width: "100%" }}
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
              <Input
                // placeholder={profile.name}
                name="name"
                // value={profile.name}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          {/* <div className="profile__form__item">
            <p>{t("profile.password")}:</p>
            <Form.Item
              name="password"
              style={{ width: "100%" }}

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
              <Input
                name="password"
                type="password"
                // value={profile.password}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div> */}
          <div className="profile__form__item">
            <p>{t("profile.idCard")}:</p>
            <Form.Item
              name="idCard"
              style={{ width: "100%" }}
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
              <Input
                placeholder={profile.name}
                name="idCard"
                // value={profile.idCard}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          <div className="profile__form__item">
            <p>Email:</p>
            <Form.Item
              name="email"
              style={{ width: "100%" }}
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
                placeholder={profile.email}
                name="email"
                // value={profile.email}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          <div className="profile__form__item">
            <p>{t("profile.phone")}:</p>
            <Form.Item
              name="phoneNumber"
              style={{ width: "100%" }}
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
                placeholder={profile.phoneNumber}
                name="phoneNumber"
                // value={profile.phoneNumber}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          <div className="profile__form__item">
            <p>{t("profile.district")}:</p>
            <Form.Item
              name="district"
              style={{ width: "100%" }}
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
                placeholder={profile.district}
                name="district"
                // value={profile.district}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          <div className="profile__form__item">
            <p>{t("profile.city")}:</p>
            <Form.Item
              name="city"
              style={{ width: "100%" }}
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
              <Input
                placeholder={profile.city}
                name="city"
                // value={profile.city}
                onChange={handleChangeProfile}
              />
            </Form.Item>
          </div>
          <div className="profile__form__item">
            <Button
              className="profile__form__btn-changepw"
              // onClick={handleUpdateProfile}
              onClick={() => setIsShow(true)}
            >
              {t("validate.Thay đổi mật khẩu", { ns: "validate" })}
            </Button>
            <Button
              htmlType="submit"
              className="profile__form__btn-update"
              // onClick={handleUpdateProfile}
            >
              {t("profile.update")}
            </Button>
          </div>
        </div>
      </Form>
      <Modal
        title={t("profile.titleChangePW")}
        open={isShow}
        onCancel={() => setIsShow(false)}
        footer={null}
      >
        <Form name="formChangePassword" onFinish={handleChangePassword}>
          <p>{t("profile.oldPassword")}</p>

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
            <Input.Password name="password" />
          </Form.Item>
          <p>{t("profile.newPassword")}</p>

          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: t("validate.Please input your password!", {
                  ns: "validate",
                }),
              },
              // {
              //   min: 6,
              //   max: 20,
              //   message: t("validate.Mật khẩu phải từ 6 đến 20 ký tự!", {
              //     ns: "validate",
              //   }),
              // },
            ]}
          >
            <Input.Password name="newPassword" />
          </Form.Item>
          <p>{t("profile.confirmPW")}</p>

          <Form.Item
            name="comfirmPassword"
            rules={[
              {
                required: true,
                message: t("validate.Vui lòng nhập lại mật khẩu", {
                  ns: "validate",
                }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t("fgPw.mesgCP"));
                },
              }),
            ]}
          >
            <Input.Password name="comfirmPassword" />
          </Form.Item>
          <div className="change-pw-btn">
            <Button onClick={() => setIsShow(false)}>
              {t("validate.Huỷ", { ns: "validate" })}
            </Button>
            <Button htmlType="submit" type="primary">
              OK
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
