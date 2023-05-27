import { Button, Form, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiUserProfileReducer,
  UpdateUserProfileAction,
} from "../../../redux/reducers/userReducer";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { regVietNameseNotNumber } from "../../../utils/regExp";

const ManageUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  const [profile, setProfile] = useState({});
  const userInfo = useSelector((state) => state.UserReducer.userLogin);
  useEffect(() => {
    // dispatch(CallApiUserProfileReducer(userInfo.id));
    // setProfile(userProfile);
    const getProfile = async () => {
      try {
        const result = await BaseApi.get(
          API_URL_DOMAIN + `/user/${userInfo.id}`
        );
        setProfile(result.data);
        form.setFieldsValue(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);
  // const userProfile = useSelector((state) => state.UserReducer.userProfile);
  // console.log("profile: ", profile);
  // console.log(form.getFieldsValue);
  const handleChangeProfile = (event) => {
    const name = event.target.name;
    setProfile((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleUpdateProfile = () => {
    // dispatch(CallApiUserProfileReducer(userInfo.id))
    const newProfile = {
      name: profile.name,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      city: profile.city,
      district: profile.district,
      idCard: profile.idCard,
    };
    // console.log(newProfile);
    dispatch(UpdateUserProfileAction(profile.id, newProfile));
  };

  return (
    <div className="manage-profile">
      <Typography.Title className="manage-profile__title" level={4}>
        Quản lý thông tin cá nhân
      </Typography.Title>
      <Form form={form}>
        <div className="manage-profile__data">
          <div className="manage-profile__row">
            <div className="manage-profile__item">
              <p>Họ và tên:</p>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                  {
                    pattern: new RegExp(regVietNameseNotNumber),
                    message: "Không được chứa chữ số và ký tự đặc biệt",
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
            {/* <div className="manage-profile__item">
            <p>:</p>
            <Input 
              placeholder={profile.name}
              name="name"
              value={profile.}
              onChange={handleChangeProfile}
            />
          </div> */}
            <div className="manage-profile__item">
              <p>Số điện thoại:</p>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern: new RegExp(/^0\d{9,10}$/),
                    message: "Không đúng định dạng!",
                  },
                ]}
              >
                <Input
                  // placeholder={profile.phoneNumber}
                  name="phoneNumber"
                  // value={profile.phoneNumber}
                  onChange={handleChangeProfile}
                />
              </Form.Item>
            </div>
          </div>
          <div className="manage-profile__row">
            <div className="manage-profile__item">
              <p>Email:</p>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  {
                    type: "email",
                    message: "Sai định dạng! VD: abc@gmail.com",
                  },
                ]}
              >
                <Input
                  // placeholder={profile.email}
                  name="email"
                  // value={profile.email}
                  onChange={handleChangeProfile}
                />
              </Form.Item>
            </div>
            <div className="manage-profile__item">
              <p>Thẻ CMND/CCCD:</p>
              <Form.Item
                name="idCard"
                rules={[
                  { required: true, message: "Vui lòng nhập CCCD/CMT!" },
                  {
                    pattern: new RegExp(/^\d+$/),
                    message: "Chỉ chứa chữ số!",
                  },
                ]}
              >
                <Input
                  // placeholder={profile.idCard}
                  name="idCard"
                  // value={form.getFieldValue.idCard}
                  onChange={handleChangeProfile}
                />
              </Form.Item>
            </div>
          </div>
          {/* <div className="manage-profile__row"> */}
          {/* <div className="manage-profile__item">
            <p>Giới tính:</p>
            <Input />
          </div> */}
          {/* </div> */}
          <div className="manage-profile__row">
            <div className="manage-profile__item">
              <p>Tỉnh/Thành phố:</p>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tỉnh/TP!",
                  },
                  {
                    pattern: new RegExp(regVietNameseNotNumber),
                    message: "Không được chứ số!",
                  },
                ]}
              >
                <Input
                  // placeholder={profile.city}
                  name="city"
                  // value={profile.city}
                  onChange={handleChangeProfile}
                />
              </Form.Item>
            </div>
            <div className="manage-profile__item">
              <p>Quận/ Huyện:</p>
              <Form.Item
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Quận/Huyện!",
                  },
                ]}
              >
                <Input
                  // placeholder={profile.district}
                  name="district"
                  // value={profile.district}
                  onChange={handleChangeProfile}
                />
              </Form.Item>
            </div>
          </div>
          <div className="manage-profile__row">
            <div className="manage-profile__item">
              <p>Ngày tạo:</p>
              <Input
                disabled
                placeholder={profile.city}
                name="city"
                value={moment(profile.created_at).format("DD/MM/YYYY")}
                onChange={handleChangeProfile}
              />
            </div>
            <div className="manage-profile__item">
              <p>Ngày cập nhật</p>
              <Input
                disabled
                placeholder={profile.district}
                name="district"
                value={moment(profile.updated_at).format("DD/MM/YYYY")}
                onChange={handleChangeProfile}
              />
            </div>
          </div>
        </div>
        <div className="manage-profile__bottom">
          <Button onClick={handleUpdateProfile}>Cập nhật</Button>
        </div>
      </Form>
    </div>
  );
};

export default ManageUserProfile;
