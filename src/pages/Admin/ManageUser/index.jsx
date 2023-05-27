/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Pagination, Form } from "antd";
import { useDispatch } from "react-redux";
import {
  GetListUserAction,
  GetDetailUserAction,
  // CreateNewUserAction,
} from "./../../../redux/reducers/admin/manageUserReducer";
import "./style.scss";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import {
  notSpecialCharacter,
  regVietNameseNotNumber,
} from "../../../utils/regExp";
import { openNotificationWithIcon } from "../../../components/notification";
// import { type } from "@testing-library/user-event/dist/type";

const ManageUser = () => {
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [listUsersFilter, setListUsersFilter] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [userRegister, setUserRegister] = useState({
    name: "",
    username: "",
    password: "",
    idCard: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
  });
  const [current, setCurrent] = useState(1);
  const [roleRegister, setRoleRegister] = useState(3);
  // const [listUserClone, setListUserClone] = useState([]);
  useEffect(() => {
    dispatch(GetListUserAction());
  }, []);

  const handleChange = (value) => {
    if (value === "All") {
      setListUsersFilter(listUser.slice(0, 10));
      setFiltered(listUser);
    } else {
      const listFilter = [...listUser];
      const filteredd = listFilter.filter((item) => item.role.code === value);
      setListUsersFilter(filteredd.slice(0, 10));
      setFiltered(filteredd);
    }
  };
  useEffect(() => {
    const getListUser = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/user");
        setListUser(result.data);
        setFiltered(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListUser();
  }, [loading]);
  // const listUser = useSelector((state) => state.ManageUserReducer.listUser);
  // console.log(listUser);
  useEffect(() => {
    setListUsersFilter(listUser.slice(0, 10));
    // setFiltered(listUser.slice(0, 10));
  }, [listUser]);
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setUserRegister((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const createNewUserByAdmin = async (newData) => {
    try {
      await BaseApi.post(API_URL_DOMAIN + "/user/create", newData);
      openNotificationWithIcon("success", "Tạo tài khoản thành công!");
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.error);

      console.log(error);
    }
  };

  const handleOk = () => {
    const newData = {
      name: userRegister.name,
      username: userRegister.username,
      password: userRegister.password,
      idCard: userRegister.idCard,
      phoneNumber: userRegister.phoneNumber,
      email: userRegister.email,
      city: userRegister.city,
      district: userRegister.district,
      role: roleRegister,
    };
    // dispatch(CreateNewUserAction(newData));
    createNewUserByAdmin(newData);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleViewDetailUser = (userId) => {
    dispatch(GetDetailUserAction(userId));
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListUsersFilter(filtered.slice(10 * (e - 1), e * 10));
  };

  const handleFilterUserName = (value) => {
    if (value) {
      const filteredTmp = [...listUsersFilter];
      const listFilterTmp = filteredTmp.filter((item) => {
        const data = item.username.toLowerCase();
        const valueFilter = value.toLowerCase();
        return data.includes(valueFilter);
        // return item.username === value;
      });
      setListUsersFilter(listFilterTmp);
      setFiltered(listFilterTmp);
    } else {
      // if (filtered.length > 0) {
      //   setListUsersFilter(filtered);
      // } else {
      setListUsersFilter(listUsersFilter.slice(0, 10));
      setFiltered(listUsersFilter);
      // }
    }
  };
  // console.log(filtered);

  return (
    <div className="manage-user">
      <div className="manage-user__top">
        <Button className="manage-user__top--add" onClick={showModal}>
          Tạo tài khoản mới <i className="fas fa-plus"></i>
        </Button>
        <div className="manage-user__top__item">
          {/* <Input.Search
            placeholder="Nhập username"
            // enterButton="Search"
            size="large"
            style={{ width: "50%" }}
            onChange={(e) => handleFilterUserName(e.target.value)}
            // onSearch={handleFilterUserName}
          /> */}
          <p>Lọc theo:</p>
          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              { value: "All", label: "All" },
              { value: "admin", label: "Admin" },
              { value: "driver", label: "Driver" },
              { value: "member", label: "Member" },
            ]}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tên tài khoản</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUsersFilter.length > 0 &&
            listUsersFilter.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={
                    item.isActive
                      ? { background: "#22cc22", color: "white" }
                      : { background: "red", color: "white" }
                  }
                >
                  <td>{item.username}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.role.code}</td>
                  <td>{item.isActive ? "Đang hoạt động" : "Tạm ngừng"}</td>
                  <td>
                    <Button onClick={() => handleViewDetailUser(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="bus-info__pagination">
        {filtered.length > 0 ? (
          <Pagination
            current={current}
            total={filtered.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>

      <Modal
        open={open}
        title="Thêm tài khoản mới"
        // onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Hủy
        //   </Button>,
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Thêm tài khoản
        //   </Button>,
        // ]}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <div className="manage-user__modal">
            <div className="manage-user__modal__row">
              <div className="manage-user__modal__item">
                <p>Họ tên:</p>
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
                    placeholder=""
                    name="name"
                    value={userRegister.name}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-user__modal__item">
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
                    placeholder=""
                    name="email"
                    value={userRegister.email}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-user__modal__row">
              <div className="manage-user__modal__item">
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
                    placeholder=""
                    name="username"
                    value={userRegister.username}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-user__modal__item">
                <p>Thẻ CMND/ CCCD:</p>
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
                    placeholder=""
                    name="idCard"
                    value={userRegister.idCard}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-user__modal__row">
              <div className="manage-user__modal__item">
                <p>Mật khẩu:</p>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    { min: 6, max: 20, message: "Mật khẩu từ 6 đến 20 ký tự!" },
                  ]}
                >
                  <Input.Password
                    placeholder=""
                    name="password"
                    value={userRegister.password}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-user__modal__item">
                <p>Số điện thoại:</p>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: new RegExp(/^0\d{9}$/),
                      message: "SĐT bắt đầu là 0 và đủ 10 số!",
                    },
                  ]}
                >
                  <Input
                    placeholder=""
                    name="phoneNumber"
                    value={userRegister.phoneNumber}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-user__modal__row">
              <div className="manage-user__modal__item">
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
                    placeholder="Nhập Quận/Huyện"
                    name="district"
                    value={userRegister.district}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-user__modal__item">
                <p>Tỉnh/ TP:</p>
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
                    placeholder="Nhập Tỉnh/TP"
                    name="city"
                    value={userRegister.city}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-user__modal__row">
              <div className="manage-user__modal__item">
                <p>Phân quyền:</p>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quyền!",
                    },
                  ]}
                >
                  <Select
                    defaultValue="-- Phân quyền --"
                    className="router-confirm__top--selected"
                    onChange={(value) => setRoleRegister(value)}
                    options={[
                      { label: "Admin", value: 1 },
                      { label: "Tài xế", value: 2 },
                      { label: "Người dùng", value: 3 },
                    ]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-user__modal__btn">
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>

              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Thêm tài khoản
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
