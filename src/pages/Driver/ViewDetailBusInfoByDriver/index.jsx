import React, { useEffect, useState } from "react";
import { Input, Typography, Select, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import {
  GetListBusInfoAction,
  UpdateBusInfoAction,
} from "../../../redux/reducers/admin/manageBusInfoReducer";
import { openNotificationWithIcon } from "../../../components/notification";

const { Option } = Select;

const ViewDetailBusInfoByDriver = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const [chairExist, setChairExist] = useState([]);
  const [activeClass, setActiveClass] = useState([]);
  const [busInfoDetail, setBusInfoDetail] = useState({});
  // const [selectedTicket, setSelectedTicket] = useState({
  //   id: 0,
  //   name: "",
  //   status: "",
  // });
  // console.log(selectedTicket);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenFinish, setIsModalOpenFinish] = useState(false);

  const [infoSeat, setInfoSeat] = useState({
    name: "",
    phoneNumber: "",
  });

  const getInfoSeat = (id) => {
    // if (selectedTicket.id === busInfoDetail.tickets.seat.id) {
    //   setInfoSeat({
    //     name:
    //   });
    // }
    const result = busInfoDetail.tickets.find((item) => item.seat.id === id);
    if (result) {
      setInfoSeat({
        name: result.fullname,
        phoneNumber: result.phoneNumber,
      });
    } else {
      setInfoSeat({
        name: "",
        phoneNumber: "",
      });
    }
  };
  // console.log(infoSeat);
  const listAddressBus = useSelector(
    (state) => state.AddressReducer.listAddress
  );
  // const busInfoDetail = useSelector(
  //   (state) => state.ManageBusInfoReducer.busInfoDetail
  // );
  // const busInfoDetail = useSelector(
  //   (state) => state.ScheduleReducer.busInfoDetail
  // );

  const showModal = (value) => {
    // setSelectedTicket({
    //   id: value.id,
    //   name: value.name,
    //   status: value.status,
    // });
    getInfoSeat(value.id);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const getBusInfoDetail = async () => {
      try {
        const result = await BaseApi.get(
          API_URL_DOMAIN + `/schedule/ticket/${param.id}`
        );

        setBusInfoDetail(result.data);
        setChairExist([]);
        if (chairExist.length === 0) {
          result.data.tickets?.forEach((item) => {
            setChairExist((prev) => [...prev, item.seat.id]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBusInfoDetail();
  }, []);
  const [busInfoDetailClone, setBusInfoDetailClone] = useState({
    price: 0,
    startTime: "",
    endTime: "",
    distance: "",
    isActive: true,
    startDay: "",
    endDay: "",
    destinationAddress: "",
    departureAddress: "",
  });
  const [listBusGo, setListBusGo] = useState([]);
  const [listBusArrive, setListBusArrive] = useState([]);
  const [chooseBusGo, setChooseBusGo] = useState("");
  const [chooseBusArrive, setChooseBusArrive] = useState("");

  const times = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];
  useEffect(() => {
    setBusInfoDetailClone({
      price: busInfoDetail?.price,
      startTime: busInfoDetail?.startTime,
      endTime: busInfoDetail?.endTime,
      distance: busInfoDetail?.distance,
      isActive: busInfoDetail?.isActive,
      startDay: busInfoDetail?.startDay,
      endDay: busInfoDetail?.endDay,
    });
    setChooseBusGo(busInfoDetail.departureAddress?.name);
    setChooseBusArrive(busInfoDetail.destinationAddress?.name);
  }, [busInfoDetail]);

  // console.log(busInfoDetailClone);
  useEffect(() => {
    listAddressBus.forEach((item) => {
      setListBusGo((prev) => [...prev, item]);
      setListBusArrive((prev) => [...prev, item]);
    });
  }, [listAddressBus]);

  const handleChangeValue = (event) => {
    const name = event.target.name;
    setBusInfoDetailClone((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelFinish = () => {
    setIsModalOpenFinish(false);
  };
  const handleOkFinish = async () => {
    try {
      await BaseApi.patch(API_URL_DOMAIN + `/ticket/schedule/${param.id}`);
      setIsModalOpenFinish(false);
      openNotificationWithIcon(`success`, `Chuyến xe đã được hoàn thành!`);
      navigate("/driver/manage-info-bus");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail-schedule">
      <Typography.Title level={4}>Xem chi tiết chuyến xe</Typography.Title>
      <div className="detail-schedule__top">
        <div className="detail-schedule__top__row">
          <div className="detail-schedule__top__item">
            <p>Giá:</p>
            <Input
              name="price"
              value={busInfoDetailClone.price?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
              // onChange={handleChangeValue}
              disabled
              style={{ color: "black" }}
            />
          </div>
          <div className="detail-schedule__top__item">
            <p>Ngày khởi hành:</p>
            <Input
              name="startTime"
              value={moment
                .utc(busInfoDetailClone.startDay)
                .format("DD/MM/YYYY")}
              onChange={handleChangeValue}
              disabled
              style={{ color: "black" }}
            />
          </div>
        </div>
        <div className="detail-schedule__top__row">
          <div className="detail-schedule__top__item">
            <p>Điểm đi:</p>
            <Select
              onChange={(value) => {
                setChooseBusGo(value);
                setListBusArrive(
                  listAddressBus.filter((item) => item.name !== value)
                );
              }}
              value={chooseBusGo}
              style={{ width: "100%" }}
              disabled
            >
              {listBusGo.length > 0 &&
                listBusGo.map((item) => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="detail-schedule__top__item">
            <p>Ngày kết thúc:</p>
            <Input
              name="endTime"
              value={moment.utc(busInfoDetailClone.endDay).format("DD/MM/YYYY")}
              onChange={handleChangeValue}
              disabled
              style={{ color: "black" }}
            />
          </div>
        </div>
        <div className="detail-schedule__top__row">
          <div className="detail-schedule__top__item">
            <p>Điểm đến:</p>
            <Select
              disabled
              onChange={(value) => {
                setChooseBusArrive(value);
                setListBusGo(
                  listAddressBus.filter((item) => item.name !== value)
                );
              }}
              value={busInfoDetail?.destinationAddress?.name}
              style={{ width: "100%" }}
            >
              {listBusArrive.length > 0 &&
                listBusArrive.map((item) => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
          <div className="detail-schedule__top__item">
            <p>Giờ khởi hành:</p>
            <Select
              value={busInfoDetailClone.startTime}
              disabled
              // onChange={(value) => {
              //   setChooseBusGo(value);
              // }}
              // onChange={(value) =>
              //   setNewListBus({ ...newListBus, startTime: value })
              onChange={(value) => {
                setBusInfoDetailClone({
                  ...busInfoDetailClone,
                  startTime: value,
                });
              }}
              style={{ width: "100%" }}
            >
              {times.length > 0 &&
                times.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
        <div className="detail-schedule__top__row">
          <div className="detail-schedule__top__item">
            <p>Khoảng cách:</p>
            <Input
              name="distance"
              value={busInfoDetailClone.distance}
              onChange={handleChangeValue}
              disabled
              style={{ color: "black" }}
            />
          </div>
          <div className="detail-schedule__top__item">
            <p>Giờ kết thúc:</p>
            <Select
              value={busInfoDetailClone?.endTime}
              disabled
              // onChange={(value) => {
              //   setChooseBusGo(value);
              // }}
              // onChange={(value) =>
              //   setNewListBus({ ...newListBus, startTime: value })
              // }
              onChange={(value) => {
                setBusInfoDetailClone({
                  ...busInfoDetailClone,
                  endTime: value,
                });
              }}
              style={{ width: "100%" }}
            >
              {times.length > 0 &&
                times.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
        <div className="detail-schedule__top__row">
          <div className="detail-schedule__top__item">
            <p>Ngày tạo:</p>
            <Input
              disabled
              style={{ color: "black" }}
              value={moment
                .utc(busInfoDetail?.created_at)
                .format("DD/MM/YYYY - hh:mm")}
            />
          </div>
          <div className="detail-schedule__top__item">
            <p>Ngày cập nhật:</p>
            <Input
              disabled
              style={{ color: "black" }}
              value={moment
                .utc(busInfoDetail?.updated_at)
                .format("DD/MM/YYYY - hh:mm")}
            />
          </div>
        </div>
      </div>

      <div className="route-chair">
        <Typography.Title level={5}>Danh sách ghế</Typography.Title>
        {/* {busInfoDetail.car?.map((ele) => {
                      return ( */}
        <>
          {busInfoDetail.car?.numberOfFloor === 1 ? (
            <div className="route-chair__single">
              <div className="route-chair__bottom">
                <div className="route-chair__list">
                  {busInfoDetail.car?.seats.length > 0 &&
                    busInfoDetail.car?.seats.map((seat) => {
                      return (
                        <button
                          key={seat.id}
                          // disabled={chairExist.includes(seat.id)}
                          onClick={() => showModal(seat)}
                          className={
                            chairExist.includes(seat.id)
                              ? "route-chair__list--chosee"
                              : "route-chair__list--empty"
                          }
                          style={
                            seat.status === "available"
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        >
                          {seat.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="route-chair__group">
              <div className="route-chair__bottom">
                <p>Tầng dưới</p>
                <div className="route-chair__list">
                  {busInfoDetail?.car?.seats?.length > 0 &&
                    busInfoDetail?.car?.seats
                      ?.slice(0, busInfoDetail?.car.seats.length / 2)
                      .map((seat) => {
                        return (
                          <button
                            key={seat.id}
                            // disabled={chairExist.includes(seat.id)}
                            // onClick={() => handleSelectChairOnCar(seat)}
                            onClick={() => showModal(seat)}
                            className={
                              chairExist.includes(seat.id)
                                ? "route-chair__list--chosee"
                                : // : activeClass.includes(seat.id)
                                  // ? "route-chair__list--choosing"
                                  "route-chair__list--empty"
                            }
                          >
                            {seat.name}
                          </button>
                        );
                      })}
                </div>
              </div>

              <div className="route-chair__bottom">
                <p>Tầng trên</p>
                <div className="route-chair__list">
                  {busInfoDetail?.car?.seats?.length > 0 &&
                    busInfoDetail?.car?.seats
                      ?.slice(busInfoDetail?.car.seats.length / 2)
                      .map((seat) => {
                        return (
                          <button
                            key={seat.id}
                            // disabled={chairExist.includes(seat.id)}
                            // onClick={() => handleSelectChairOnCar(seat)}
                            onClick={() => showModal(seat)}
                            className={
                              chairExist.includes(seat.id)
                                ? "route-chair__list--chosee"
                                : activeClass.includes(seat.id)
                                ? "route-chair__list--choosing"
                                : "route-chair__list--empty"
                            }
                          >
                            {seat.name}
                          </button>
                        );
                      })}
                </div>
              </div>
            </div>
          )}

          <div className="route-chair__note2">
            <div className="route-chair__note2__item">
              <span className="route-chair__note2__item--empty"></span>
              <p>Trống</p>
            </div>
            {/* <div className="route-chair__note__item">
              <span className="route-chair__note__item--choosing"></span>
              <p>Đang chọn</p>
            </div> */}
            <div className="route-chair__note2__item">
              <span className="route-chair__note2__item--chosee"></span>
              <p>Đã đặt</p>
            </div>
          </div>
        </>
      </div>

      <div className="detail-schedule__bottom">
        <div className="detail-schedule__group">
          <Button
            onClick={() => {
              navigate("/driver/manage-info-bus");
            }}
          >
            Quay lại
          </Button>
          {/* <div className="detail-schedule__group__item">
            <Button
              className="detail-schedule__group__item--disable"
              onClick={handleDisableSchedule}
            >
              Vô hiệu hóa
            </Button>
            <Button
              className="detail-schedule__group__item--update"
              onClick={handleUpdateSchedule}
            >
              Cập nhật
            </Button>
          </div> */}
          {busInfoDetail.status === "waiting" && (
            <Button
              key="submit"
              type="primary"
              onClick={() => setIsModalOpenFinish(true)}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
      <Modal
        title="Thông tin khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <div className="manage-car__modal">
          <div className="manage-car__modal__row">
            <div className="manage-car__modal__item">
              {infoSeat.name && infoSeat.phoneNumber ? (
                <>
                  <p>{`Tên khách hàng: ${infoSeat.name}`}</p>
                  <p>{`Số điện thoại: ${infoSeat.phoneNumber}`}</p>
                </>
              ) : (
                <p>Ghế này chưa được đặt</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Xác nhận hoàn thành chuyến xe"
        open={isModalOpenFinish}
        onOk={handleOkFinish}
        onCancel={handleCancelFinish}
        footer={[
          <Button
            // loading={loading}
            onClick={() => setIsModalOpenFinish(false)}
          >
            Huỷ
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOkFinish}
          >
            OK
          </Button>,
        ]}
      >
        <div className="manage-car__modal">
          <div
            className="manage-car__modal__row"
            style={{ gridTemplateColumns: "none" }}
          >
            <div className="manage-car__modal__item">
              <p>Bạn có chắc chắn muốn hoàn thành chuyến xe này không?</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewDetailBusInfoByDriver;
