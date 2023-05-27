/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Typography, Select, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOneCarAction,
  CreateSeatForCar,
  GetOneCarDetailAction,
} from "../../../redux/reducers/admin/manageCarReducer";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

const ViewDetailCar = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  useEffect(() => {
    dispatch(GetOneCarDetailAction(param.id));
  }, []);
  const carDetail = useSelector((state) => state.ManageCarReducer.carDetail);
  const listCar = useSelector((state) => state.ManageCarReducer.listCar);

  const listUser = useSelector((state) => state.ManageUserReducer.listUser);

  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(null);

  const [carDetailClone, setCarDetailClone] = useState({
    name: carDetail?.name,
    totalRow: carDetail?.totalRow,
    totalColumn: carDetail?.totalColumn,
    numberOfFloor: carDetail?.numberOfFloor,
    phoneNumber: carDetail?.phoneNumber,
    seats: carDetail?.seats,
  });
  const [typeCar, setTypeCar] = useState(carDetail?.type);
  const [stateActive, setStateActive] = useState(carDetail?.isActive);

  useEffect(() => {
    setCarDetailClone({
      name: carDetail?.name,
      totalRow: carDetail?.totalRow,
      totalColumn: carDetail?.totalColumn,
      numberOfFloor: carDetail?.numberOfFloor,
      phoneNumber: carDetail?.phoneNumber,
      seats: carDetail?.seats,
    });
    setTypeCar(carDetail?.type);
    setStateActive(carDetail?.isActive);
    form.setFieldsValue(carDetail);
  }, [carDetail]);

  useEffect(() => {
    let newArr = [];

    listUser.filter((item) => {
      if (item.role.code === "driver" && item.isActive === true) {
        const newDataUser = { label: item.username, value: item.id };
        newArr.push(newDataUser);
      }
    });
    const idDriver = [];
    listCar.forEach((item) => idDriver.push(item.user?.id));
    const diffDriver = newArr.filter((item) => !idDriver.includes(item.value));
    setUserData(diffDriver);
  }, [listUser]);
  const handleChangeValue = (event) => {
    const name = event.target.name;
    setCarDetailClone((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleUpdateCar = () => {
    const newData = {
      name: carDetailClone.name,
      type: typeCar,
      // totalRow: Number(carDetailClone.totalRow),
      // totalColumn: Number(carDetailClone.totalColumn),
      // numberOfFloor: Number(carDetailClone.numberOfFloor),
      isActive: Boolean(stateActive),
      phoneNumber: carDetailClone.phoneNumber,
      user: userId || carDetail.user.id,
    };
    // console.log(newData);
    dispatch(UpdateOneCarAction(carDetail.id, newData));
  };

  const handleDisabledCar = () => {
    const newData = { isActive: !stateActive };
    dispatch(UpdateOneCarAction(carDetail.id, newData));
  };

  const handleCreateNewSeatForCar = async () => {
    if (carDetailClone.seats.length === 0) {
      await dispatch(CreateSeatForCar(carDetail.id));
      await dispatch(GetOneCarDetailAction(carDetail.id));
    }
    navigate(`/admin/manage-seat-of-car/${carDetail.id}`);
  };

  return (
    <div className="car-detail">
      <Typography.Title level={5} className="car-detail__title">
        Xem Chi Tiết Xe
      </Typography.Title>
      <Form form={form} onFinish={handleUpdateCar}>
        <div className="car-detail__data">
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
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
                  name="name"
                  // value={carDetailClone.name}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Loại xe:</p>
              <Select
                disabled
                value={typeCar}
                className="router-confirm__top--selected"
                onChange={(value) => setTypeCar(value)}
                options={[
                  { value: "bed", label: "Giường" },
                  { value: "chair", label: "Ghế" },
                  { value: "limousine", label: "Limousine" },
                ]}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Tổng số hàng:</p>
              <Input
                name="totalRow"
                disabled
                value={carDetailClone.totalRow}
                onChange={handleChangeValue}
              />
            </div>
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
                    message: "SĐT bắt đầu là 0 và đủ 10 số!",
                  },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={carDetailClone.phoneNumber}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Tổng số cột:</p>
              <Input
                disabled
                name="totalColumn"
                value={carDetailClone.totalColumn}
                onChange={handleChangeValue}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Trạng thái:</p>
              <Form.Item>
                <Select
                  value={stateActive ? "Đang hoạt động" : "Hư hỏng"}
                  className="router-confirm__top--selected"
                  onChange={(value) => setStateActive(value)}
                  options={[
                    { value: true, label: "Đang hoạt động" },
                    { value: false, label: "Hư hỏng" },
                  ]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Số tầng:</p>
              <Input
                disabled
                name="numberOfFloor"
                value={carDetailClone.numberOfFloor}
                onChange={handleChangeValue}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Tài xế:</p>
              {/* <Input name="nameDiver" value={carDetail.user.name} /> */}
              <Form.Item>
                <Select
                  value={userId || carDetail?.user.username}
                  className="router-confirm__top--selected"
                  onChange={(value) => setUserId(value)}
                  options={userData}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Ngày tạo:</p>
              <Input
                disabled
                name="created_at"
                value={moment(carDetailClone.created_at).format("DD/MM/YYYY")}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Ngày cập nhật:</p>
              <Input
                disabled
                name="updated_at"
                value={moment(carDetailClone.updated_at).format("DD/MM/YYYY")}
              />
            </div>
          </div>
        </div>
        <div className="car-detail__function">
          <Button
            className="car-detail__function--back"
            onClick={() => navigate("/admin/manage-car")}
          >
            Quay lại
          </Button>
          <div
            className="car-detail__group"
            style={{ gridTemplateColumns: "repeat(2,1fr)" }}
          >
            {/* {carDetail?.isActive && (
              <Button
                className="car-detail__group--disabled"
                onClick={handleDisabledCar}
              >
                Vô hiệu hóa
              </Button>
            )} */}
            {carDetail?.seats.length > 0 ? (
              <Button
                className="manage-car__top--chair"
                onClick={handleCreateNewSeatForCar}
              >
                Quản lý ghế <i className="fas fa-chair"></i>
              </Button>
            ) : (
              <Button
                className="manage-car__top--chair"
                onClick={handleCreateNewSeatForCar}
              >
                Tạo ghế <i className="fas fa-chair"></i>
              </Button>
            )}

            <Button
              htmlType="submit"
              className="car-detail__group--update"
              // onClick={handleUpdateCar}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ViewDetailCar;
