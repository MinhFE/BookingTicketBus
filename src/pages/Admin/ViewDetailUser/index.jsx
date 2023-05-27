import React, { useEffect, useState } from "react";
import { Typography, Input, Button, Select, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserAction } from "../../../redux/reducers/admin/manageUserReducer";
import { useForm } from "antd/es/form/Form";
import { regVietNameseNotNumber } from "../../../utils/regExp";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import { openNotificationWithIcon } from "../../../components/notification";

const ViewDetailUser = () => {
  const userDetail = useSelector((state) => state.ManageUserReducer.userDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: userDetail.name,
    username: userDetail.username,
    // password: "",
    idCard: userDetail.idCard,
    isActive: userDetail.isActive,
    phoneNumber: userDetail.phoneNumber,
    email: userDetail.email,
    city: userDetail.city,
    district: userDetail.district,
    role: {
      id: userDetail.role.id,
      code: userDetail.role.code,
    },
  });
  const [userActive, setUserActive] = useState(userDetail.isActive);
  const [userRole, setUserRole] = useState(userDetail.role.id);
  const [form] = useForm();
  useEffect(() => {
    if (userRole === 1) {
      setUserInfo((prev) => ({
        ...prev,
        role: { id: 1, code: "admin" },
      }));
    } else if (userRole === 2) {
      setUserInfo((prev) => ({
        ...prev,
        role: { id: 2, code: "driver" },
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        role: { id: 3, code: "member" },
      }));
    }
  }, [userRole]);
  useEffect(() => {
    form.setFieldsValue(userDetail);
  }, [userDetail]);
  const handleChangeValue = (event) => {
    const name = event.target.name;
    setUserInfo((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleDisabledUser = () => {
    const newData = {
      isActive: false,
    };
    dispatch(UpdateUserAction(userDetail.id, newData));
  };

  const handleUpdateUser = () => {
    const newData = {
      name: userInfo.name,
      username: userInfo.username,
      // password: userInfo.password,
      idCard: userInfo.idCard,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
      isActive: userActive,
      city: userInfo.city,
      district: userInfo.district,
      role: userInfo.role,
    };
    dispatch(UpdateUserAction(userDetail.id, newData));
  };
  const handleRestPassword = async () => {
    try {
      await BaseApi.patch(API_URL_DOMAIN + "/user/forgot-password", {
        email: userInfo.email,
        password: "123456",
      });
      openNotificationWithIcon("success", "Rest mật khẩu thành công!");
    } catch (error) {
      openNotificationWithIcon("error", "Rest mật khẩu thất bại!");
    }
  };
  return (
    <div className="user-detail">
      <Typography.Title level={5} className="user-detail__title">
        Xem Chi Tiết Người Dùng
      </Typography.Title>
      <Form form={form} onFinish={handleUpdateUser}>
        <div className="user-detail__data">
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Tên tài khoản:</p>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                  {
                    pattern: new RegExp(/^[A-Za-z0-9 ]+$/),
                    message: "Không được chứa ký tự đặc biệt!",
                  },
                ]}
              >
                <Input
                  name="username"
                  // value={userInfo.username}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Vai trò:</p>
              <Form.Item>
                <Select
                  defaultValue={
                    userRole === 1
                      ? "Admin"
                      : userRole === 2
                      ? "Tài xế"
                      : "Khách hàng"
                  }
                  className="router-confirm__top--selected"
                  onChange={(value) => setUserRole(value)}
                  options={[
                    { value: 1, label: "Admin" },
                    { value: 2, label: "Tài xế" },
                    { value: 3, label: "Khách hàng" },
                  ]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Mật khẩu:</p>
              <Form.Item
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, max: 20, message: "Mật khẩu từ 6 đến 20 ký tự!" },
                ]}
              >
                <Input
                  name="password"
                  disabled
                  // maxLength={20}
                  type="password"
                  value="*******"
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Trạng thái:</p>
              <Select
                defaultValue={userActive ? "Đang hoạt động" : "Tạm ngưng"}
                className="router-confirm__top--selected"
                onChange={(value) => setUserActive(value)}
                options={[
                  { value: true, label: "Đang hoạt động" },
                  { value: false, label: "Tạm ngừng" },
                ]}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Họ và tên:</p>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                  {
                    pattern: new RegExp(regVietNameseNotNumber),
                    message: "Không được chứa chữ số",
                  },
                ]}
              >
                <Input
                  name="name"
                  // value={userInfo.name}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
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
                  name="idCard"
                  // value={userInfo.idCard}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
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
                  name="phoneNumber"
                  // value={userInfo.phoneNumber}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
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
                  name="email"
                  // value={userInfo.email}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Quận/Huyện:</p>
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
                  name="district"
                  // value={userInfo.district}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
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
                  name="city"
                  // value={userInfo.city}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Ngày tạo:</p>
              <Input
                disabled
                value={Date(userDetail.created_at).slice(0, 21)}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Ngày cập nhật:</p>
              <Input
                disabled
                value={Date(userDetail.updated_at).slice(0, 21)}
              />
            </div>
          </div>
        </div>
        <div className="user-detail__function">
          <Button
            className="user-detail__function--back"
            onClick={() => navigate("/admin/manage-user")}
          >
            Quay lại
          </Button>
          <div className="user-detail__group">
            <Button
              className="user-detail__group--restpw"
              onClick={handleRestPassword}
            >
              Reset Password
            </Button>
            {/* {userInfo.isActive && (
              <Button
                className="user-detail__group--disabled"
                onClick={handleDisabledUser}
              >
                Vô hiệu hóa
              </Button>
            )} */}
            <Button
              htmlType="submit"
              className="user-detail__group--update"
              // onClick={handleUpdateUser}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ViewDetailUser;
