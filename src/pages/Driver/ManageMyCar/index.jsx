import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateSeatForCar,
  GetOneCarDetailAction,
  UpdateOneCarAction,
  UpdateStatusSeatAction,
} from "../../../redux/reducers/admin/manageCarReducer";
import { Button, Input, Modal, Select, Typography } from "antd";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import "./style.scss";

const ManageMyCar = () => {
  // const param = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [carDetail, setCarDetail] = useState({});
  const [listCar, setListCar] = useState([]);
  const [carId, setCarId] = useState(null);
  const [typeCar, setTypeCar] = useState("");
  const [stateActive, setStateActive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({
    id: 0,
    name: "",
    status: "",
  });

  const userLogin = useSelector((state) => state.UserReducer.userLogin);

  // const listCar = useSelector((state) => state.ManageCarReducer.listCar);
  useEffect(() => {
    const getListCar = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/car");
        setListCar(result.data);
        setCarId(result.data.find((item) => userLogin.id === item.user.id));
      } catch (error) {
        console.log(error);
      }
    };
    getListCar();
  }, []);
  // console.log(listCar);
  // const getIdCar = () => {
  //   const car = listCar?;
  //   return car?.id;
  // };
  // console.log(getIdCar());
  useEffect(() => {
    const getCarDetail = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + `/car/${carId.id}`);
        setCarDetail(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCarDetail();
  }, [isModalOpen, listCar]);
  // const [userId, setUserId] = useState(null);

  const [carDetailClone, setCarDetailClone] = useState({
    name: carDetail?.name,
    totalRow: carDetail?.totalRow,
    totalColumn: carDetail?.totalColumn,
    numberOfFloor: carDetail?.numberOfFloor,
    phoneNumber: carDetail?.phoneNumber,
    seats: carDetail?.seats,
  });

  const showModal = (value) => {
    setSelectedTicket({
      id: value.id,
      name: value.name,
      status: value.status,
    });
    setIsModalOpen(true);
  };

  const updateStatusSeat = async (idSeat, status) => {
    try {
      await BaseApi.patch(API_URL_DOMAIN + `/seat/${idSeat}`, status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    if (selectedTicket.status === "available") {
      updateStatusSeat(selectedTicket.id, { status: "unavailable" });
      // dispatch(
      //   UpdateStatusSeatAction(selectedTicket.id, { status: "unavailable" })
      // );
    } else {
      updateStatusSeat(selectedTicket.id, { status: "available" });

      // dispatch(
      //   UpdateStatusSeatAction(selectedTicket.id, { status: "available" })
      // );
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  }, [carDetail]);

  // useEffect(() => {
  //   let newArr = [];

  //   listUser.filter((item) => {
  //     if (item.role.code === "driver") {
  //       const newDataUser = { label: item.name, value: item.id };
  //       newArr.push(newDataUser);
  //     }
  //   });
  //   const idDriver = [];
  //   listCar.forEach((item) => idDriver.push(item.user?.id));
  //   const diffDriver = newArr.filter((item) => !idDriver.includes(item.value));
  //   setUserData(diffDriver);
  // }, [listUser]);
  const handleChangeValue = (event) => {
    const name = event.target.name;
    setCarDetailClone((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  // const handleUpdateCar = () => {
  //   const newData = {
  //     name: carDetailClone.name,
  //     type: typeCar,
  //     // totalRow: Number(carDetailClone.totalRow),
  //     // totalColumn: Number(carDetailClone.totalColumn),
  //     // numberOfFloor: Number(carDetailClone.numberOfFloor),
  //     isActive: Boolean(stateActive),
  //     phoneNumber: carDetailClone.phoneNumber,
  //     user: userId || carDetail.user.id,
  //   };
  //   console.log(newData);
  //   dispatch(UpdateOneCarAction(carDetail.id, newData));
  // };

  // const handleDisabledCar = () => {
  //   const newData = { isActive: !stateActive };
  //   dispatch(UpdateOneCarAction(carDetail.id, newData));
  // };

  // const handleCreateNewSeatForCar = () => {
  //   if (carDetailClone.seats.length === 0) {
  //     dispatch(CreateSeatForCar(carDetail.id));
  //     dispatch(GetOneCarDetailAction(carDetail.id));
  //   }
  //   navigate(`/driver/manage-seat-of-car/${carDetail.id}`);
  // };

  return (
    <div className="car-detail">
      {carDetailClone.name ? (
        <>
          <Typography.Title level={5} className="car-detail__title">
            Xe Của Tôi
          </Typography.Title>
          <div className="car-detail__data">
            <div className="car-detail__data__row">
              <div className="car-detail__data__item">
                <p>Tên xe:</p>
                <Input
                  disabled
                  name="name"
                  value={carDetailClone.name}
                  onChange={handleChangeValue}
                  style={{ color: "black" }}
                />
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
                  style={{ width: "100%", color: "black" }}
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
                  style={{ color: "black" }}
                />
              </div>
              <div className="car-detail__data__item">
                <p>Số điện thoại:</p>
                <Input
                  disabled
                  name="phoneNumber"
                  value={carDetailClone.phoneNumber}
                  onChange={handleChangeValue}
                  style={{ color: "black" }}
                />
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
                  style={{ color: "black" }}
                />
              </div>
              <div className="car-detail__data__item">
                <p>Trạng thái:</p>
                <Select
                  disabled
                  value={stateActive ? "Đang hoạt động" : "Hư hỏng"}
                  className="router-confirm__top--selected"
                  onChange={(value) => setStateActive(value)}
                  options={[
                    { value: true, label: "Đang hoạt động" },
                    { value: false, label: "Hư hỏng" },
                  ]}
                  style={{ width: "100%", color: "black" }}
                />
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
                  style={{ color: "black" }}
                />
              </div>
              {/* <div className="car-detail__data__item"> */}
              {/* <p>Tài xế:</p> */}
              {/* <Input name="nameDiver" value={carDetail.user.name} /> */}
              {/* <Select
              value={userId || carDetail.user?.name}
              className="router-confirm__top--selected"
              onChange={(value) => setUserId(value)}
              // options={userData}
              style={{ width: "100%" }}
            /> */}
              {/* </div> */}
            </div>
            <div className="car-detail__data__row">
              <div className="car-detail__data__item">
                <p>Ngày tạo:</p>
                <Input
                  disabled
                  name="created_at"
                  value={Date(carDetailClone.created_at).slice(0, 15)}
                  style={{ color: "black" }}
                />
              </div>
              <div className="car-detail__data__item">
                <p>Ngày cập nhật:</p>
                <Input
                  disabled
                  name="updated_at"
                  value={Date(carDetailClone.updated_at).slice(0, 15)}
                  style={{ color: "black" }}
                />
              </div>
            </div>
          </div>
          <div
            className="car-detail__function"
            // style={{ justifyContent: "end" }}
          >
            {/* <Button
          className="car-detail__function--back"
          onClick={() => navigate("/admin/manage-car")}
        >
          Quay lại
        </Button> */}
            <div
              className="car-detail__group"
              // style={{ gridTemplateColumns: "none" }}
            >
              {/* <Button
            className="car-detail__group--disabled"
            onClick={handleDisabledCar}
          >
            Vô hiệu hóa
          </Button> */}
              {/* <Button
            className="manage-car__top--chair"
            onClick={handleCreateNewSeatForCar}
          >
            Quản lý ghế <i className="fas fa-chair"></i>
          </Button> */}

              {/* <Button
            className="car-detail__group--update"
            onClick={handleUpdateCar}
          >
            Cập nhật
          </Button> */}
            </div>
          </div>
          <div className="view-list-seat">
            <Typography.Title level={2}>Danh sách ghế</Typography.Title>

            <div>
              {carDetailClone.numberOfFloor === 1 ? (
                <div
                  className="seat-car__single__list"
                  style={{
                    gridTemplateColumns: `repeat(${carDetailClone.totalColumn},1fr)`,
                  }}
                >
                  {carDetailClone.seats.length > 0 &&
                    carDetailClone.seats.map((item) => {
                      return (
                        <Button
                          key={item.id}
                          className={
                            item.status === "available"
                              ? "seat-car__single--available"
                              : "seat-car__single--unavailable"
                          }
                          onClick={() => showModal(item)}
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                  <div className="seat-car__single__bottom"></div>
                </div>
              ) : (
                <div className="seat-car__double">
                  <div className="route-chair__group" style={{}}>
                    <div className="route-chair__bottom">
                      <p>Tầng dưới</p>
                      <div className="route-chair__list">
                        {carDetailClone.seats?.length > 0 &&
                          carDetailClone.seats
                            ?.slice(0, carDetailClone.seats.length / 2)
                            .map((item) => {
                              return (
                                <Button
                                  key={item.id}
                                  // disabled={chairExist.includes(seat.id)}
                                  onClick={() => showModal(item)}
                                  className={
                                    item.status === "available"
                                      ? "seat-car__single--available"
                                      : "seat-car__single--unavailable"
                                  }
                                >
                                  {item.name}
                                </Button>
                              );
                            })}
                      </div>
                    </div>
                    <div className="route-chair__bottom">
                      <p>Tầng trên</p>
                      <div className="route-chair__list">
                        {carDetailClone.seats?.length > 0 &&
                          carDetailClone.seats
                            ?.slice(carDetailClone.seats.length / 2)
                            .map((item) => {
                              return (
                                <Button
                                  key={item.id}
                                  // disabled={chairExist.includes(seat.id)}
                                  onClick={() => showModal(item)}
                                  className={
                                    item.status === "available"
                                      ? "seat-car__single--available"
                                      : "seat-car__single--unavailable"
                                  }
                                >
                                  {item.name}
                                </Button>
                              );
                            })}
                      </div>
                    </div>
                  </div>
                  {/* <div>
              <Typography.Title level={5}>Tầng dưới</Typography.Title>
              <Typography.Title level={5}>Tần trên</Typography.Title>
            </div> */}
                  {/* {carDetailClone.seats.length > 0 && carDetailClone.seats.map(item => {
              return <Button key={item.id}>
                {item.name}
              </Button>
            })} */}
                </div>
              )}
              <div className="route-chair__note1">
                <div className="route-chair__note1__item">
                  <span className="route-chair__note1__item--ready"></span>
                  <p>Sẵn sàng</p>
                </div>
                <div className="route-chair__note1__item">
                  <span className="route-chair__note1__item--break"></span>
                  <p>Bị hỏng</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="title-empty">Bạn chưa sở hữu xe nào</p>
      )}
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedTicket.status === "available" ? (
          <p>
            Bạn có muốn ẩn ghế <b> {selectedTicket.name}</b> của xe{" "}
            <b>{carDetailClone.name} </b>
            không ?
          </p>
        ) : (
          <p>
            Bạn có muốn hiện ghế <b> {selectedTicket.name}</b> của xe{" "}
            <b>{carDetailClone.name} </b>
            không ?
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ManageMyCar;
