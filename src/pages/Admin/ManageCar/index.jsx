/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Modal, Select, Pagination, Tooltip, Form } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateNewCarAction,
  GetOneCarDetailAction,
} from "./../../../redux/reducers/admin/manageCarReducer";
import { GetListCarAction } from "./../../../redux/reducers/admin/manageCarReducer";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import { useForm } from "antd/es/form/Form";

const ManageCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const [listCar, setListCar] = useState([]);
  const [listUser, setListUser] = useState([]);
  // const listCar = useSelector((state) => state.ManageCarReducer.listCar);
  // const listUser = useSelector((state) => state.ManageUserReducer.listUser);
  // useEffect(() => {
  //   dispatch(GetListCarAction());
  // }, [listCar]);

  const [listCarClone, setListCarClone] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [typeChair, setTypeChair] = useState("");
  const [numberFloor, setNumberFloor] = useState("");
  const [dbNewCar, setDbNewCar] = useState({
    name: "",
    totalRow: "",
    totalColumn: "",
    numberOfFloor: "",
    phoneNumber: "",
  });
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const getListCar = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/car");
        setListCar(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListCar();
  }, [loading]);
  useEffect(() => {
    const getListUser = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/user");
        setListUser(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListUser();
  }, []);
  useEffect(() => {
    setListCarClone(listCar.slice(0, 10));
  }, [listCar]);
  const handleChange = (value) => {
    if (value === "All") {
      setListCarClone(listCar.slice(0, 10));
    } else {
      const filtered = listCar.filter((item) => item.type === value);
      setListCarClone(filtered);
    }
  };

  useEffect(() => {
    let newArr = [];
    listUser.forEach((item) => {
      if (item.role.code === "driver" && item.isActive === true) {
        const newDataUser = { label: item.username, value: item.id };
        newArr.push(newDataUser);
      }
    });
    const idDriver = [];
    // console.log("list car: ", listCar);
    listCar.forEach((item) => idDriver.push(item.user?.id));
    const diffDriver = newArr.filter((item) => !idDriver.includes(item.value));
    setUserData(diffDriver);
  }, [open]);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setDbNewCar((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleOk = () => {
    const newDataCreate = {
      name: dbNewCar.name,
      type: typeChair,
      totalRow: Number(dbNewCar.totalRow),
      totalColumn: Number(dbNewCar.totalColumn),
      numberOfFloor: Number(numberFloor),
      phoneNumber: dbNewCar.phoneNumber,
      user: userId,
    };

    if (
      newDataCreate.name &&
      newDataCreate.type &&
      newDataCreate.totalRow &&
      newDataCreate.totalColumn &&
      newDataCreate.numberOfFloor &&
      newDataCreate.phoneNumber &&
      newDataCreate.user
    ) {
      dispatch(CreateNewCarAction(newDataCreate));
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        form.resetFields();
        setOpen(false);
      }, 500);
    }
  };

  const handleViewDetailCar = async (carId) => {
    await dispatch(GetOneCarDetailAction(carId));
    navigate(`/admin/manage-car/${carId}`);
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListCarClone(listCar.slice(10 * (e - 1), e * 10));
  };

  return (
    <div className="manage-car">
      <div className="manage-car__top">
        <Button className="manage-car__top--add" onClick={showModal}>
          Tạo xe mới <i className="fas fa-plus"></i>
        </Button>
        <div className="manage-car__top__item">
          <p>Lọc theo:</p>
          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              { value: "All", label: "All" },
              { value: "chair", label: "Ghế" },
              { value: "bed", label: "Giường" },
              { value: "limousine", label: "Limousine" },
            ]}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tên xe</th>
            <th>Loại xe</th>
            <th>Trạng thái</th>
            <th>Tổng số chỗ ngồi</th>
            <th>Thông tin tài xế</th>
            <th>Số điện thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listCarClone.length > 0 &&
            listCarClone.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={
                    item.isActive
                      ? { background: "#22cc22", color: "white" }
                      : { background: "red", color: "white" }
                  }
                >
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.isActive ? "Đang hoạt động" : "Hư hỏng"}</td>
                  <td>
                    {item.totalRow * item.totalColumn * item.numberOfFloor}
                  </td>
                  <td>{item.user?.name}</td>
                  <td>{item.user?.phoneNumber}</td>
                  <td>
                    <Button onClick={() => handleViewDetailCar(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="bus-info__pagination">
        {listCar.length > 0 ? (
          <Pagination
            current={current}
            total={listCar.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>

      <Modal
        open={open}
        title="Thêm mới xe"
        // onOk={handleOk}
        onCancel={handleCancel}
        // okButtonProps={{ disabled: true }}
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
        //     Thêm mới xe
        //   </Button>,
        // ]}
        footer={null}
      >
        <Form onFinish={handleOk} form={form}>
          <div className="manage-car__modal">
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Tên xe:</p>

                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên xe!" },
                    {
                      pattern: new RegExp(/^[A-Za-z0-9 ]+$/),
                      message: "Không được chứa ký tự đặc biệt!",
                    },
                  ]}
                >
                  <Input
                    // status={dataFake?.name && "error"}
                    placeholder="Nhập tên xe"
                    name="name"
                    value={dbNewCar.name}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Chọn loại xe:</p>
                <Form.Item
                  name="type"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại xe!" },
                  ]}
                >
                  <Select
                    defaultValue="-- Chọn loại xe --"
                    className="router-confirm__top--selected"
                    onChange={(value) => setTypeChair(value)}
                    options={[
                      { value: "bed", label: "Giường" },
                      { value: "chair", label: "Ghế" },
                      { value: "limousine", label: "Limousine" },
                    ]}
                    style={{ width: "100%" }}
                  />
                  {/* <p className="mesg">{!typeChair && "Vui lòng chọn loại xe!"}</p> */}
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Nhâp số hàng ghế:</p>
                <Form.Item
                  name="totalRow"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số hàng ghế!",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Phải là chữ số!",
                    },
                    {
                      pattern: new RegExp(/^(0?[1-9]|1[0-9]|20)$/),
                      message: "Số hàng từ 1 đến 20!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số hàng ghế"
                    name="totalRow"
                    value={dbNewCar.totalRow}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Nhập số cột ghế:</p>
                <Form.Item
                  name="totalColumn"
                  rules={[
                    { required: true, message: "Vui lòng nhập số cột ghế!" },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Phải là chữ số!",
                    },
                    {
                      pattern: new RegExp(/^[1-4]$/),
                      message: "Số cột từ 1 đến 4!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số cột ghế"
                    name="totalColumn"
                    value={dbNewCar.totalColumn}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Số tầng xe:</p>
                {/* <Input
                placeholder="Nhập số tầng xe"
                name="numberOfFloor"
                value={dbNewCar.numberOfFloor}
                onChange={handleChangeValueModal}
              /> */}
                <Form.Item
                  name="numberFloor"
                  rules={[
                    { required: true, message: "Vui lòng chọn số tầng xe!" },
                  ]}
                >
                  <Select
                    defaultValue="-- Chọn số tầng --"
                    className="router-confirm__top--selected"
                    onChange={(value) => setNumberFloor(value)}
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                {/* <p className="mesg">
                  {!numberFloor && "Vui lòng chọn số tầng!"}
                </p> */}
              </div>
              <div className="manage-car__modal__item">
                <p>Nhập số điện thoại:</p>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: new RegExp(/^0\d{9,10}$/),
                      message: "SĐT bắt đầu là 0 và đủ 10 số!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    value={dbNewCar.phoneNumber}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Chọn tên xài xế:</p>
                <Form.Item
                  name="user"
                  rules={[{ required: true, message: "Vui lòng chọn tài xế!" }]}
                >
                  <Select
                    defaultValue="-- Chọn tài xế --"
                    className="router-confirm__top--selected"
                    onChange={(value) => setUserId(value)}
                    options={userData}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                {/* <p className="mesg">{!userId && "Vui lòng chọn loại xe!"}</p> */}
              </div>
            </div>
            <div className="manage-car__modal--item">
              <Form.Item>
                <Button
                  // htmlType="submit"
                  style={{ marginRight: "20px" }}
                  onClick={() => setOpen(false)}
                >
                  Huỷ
                </Button>
                <Button type="primary" htmlType="submit">
                  Thêm xe mới
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCar;
