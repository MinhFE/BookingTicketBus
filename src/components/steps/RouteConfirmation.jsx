/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { dataBooking } from "../../utils/menuData";
import { Select, Typography, Button, Modal } from "antd";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RouteConfirmation = (props) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chairExist, setChairExist] = useState([]);

  const {
    // handleChangeFilterBooking,
    onChangeChoose,
    showChair,
    booked,
    setBooked,
    handleContinueStep,
    open,
    setOpen,
    activeClass,
    setActiveClass,
    // chairExist,
    // setChairExist,
    totalPrice,
    setTotalPrice,
  } = props;
  const [disableBtn, setDisableBtn] = useState(true);
  const [listSchedule, setListSchedule] = useState([]);
  const [listScheduleTmp, setListScheduleTmp] = useState([]);
  const [sort, setSort] = useState("");
  const [sort1, setSort1] = useState("");
  // const [scheduleById, setScheduleById] = useState([]);
  const scheduleFiltered = useSelector(
    (state) => state.ScheduleReducer.scheduleMoreThanCurrentDateFiltered
  );
  const scheduleById = useSelector(
    (state) => state.ScheduleReducer.scheduleById
  );
  useEffect(() => {
    setListSchedule(scheduleFiltered);
    setListScheduleTmp(scheduleFiltered);
  }, [scheduleFiltered]);
  let arrTmp = [...scheduleFiltered];
  console.log(arrTmp);
  // const handleChangeFilterBookingByPrice = (value) => {
  // console.log(value);
  // const listScheduleFilter = [...listScheduleTmp];
  if (sort) {
    if (sort === "1") {
      arrTmp?.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );
      // setListSchedule([...list]);
      // setListScheduleTmp([...list]);

      // console.log(arrTmp);
    } else {
      arrTmp?.sort((a, b) =>
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0
      );

      // setListSchedule([...list]);
      // setListScheduleTmp([...list]);

      // console.log(list);
    }
    // setListSchedule(arrTmp);
  }

  // const handleChangeFilterBookingByType = (value) => {
  // if (listScheduleTmp.length > 0) {
  // const listScheduleFilter = [...listSchedule];
  if (sort1) {
    arrTmp = arrTmp.filter((item) => item.car.type === sort1);
  }
  // setSort1(value);
  // setListSchedule(arrTmp);
  // setSort(value);
  // setListSchedule(list);
  // console.log(list);
  // setListScheduleTmp([...list]);

  // if (list.length > 0) {
  //   setListScheduleTmp([...list]);
  // } else {
  //   setListScheduleTmp([...listScheduleTmp]);
  // }
  // } else {
  //   const listScheduleFilter = [...scheduleFiltered];
  //   const list = listScheduleFilter.filter((item) => item.car.type === value);
  //   // setListSchedule(list);
  //   // console.log(list);
  //   setListScheduleTmp([...list]);

  //   // if (list.length > 0) {
  //   //   setListScheduleTmp([...list]);
  //   // } else {
  //   //   setListScheduleTmp([...listScheduleTmp]);
  //   // }
  // }
  // };
  useEffect(() => {
    // setChairExist([]);
    if (scheduleFiltered.length > 0 && scheduleById) {
      // scheduleById.tickets?.forEach((item) => {
      //   setChairExist((prev) => [...prev, item.seat.id]);
      // });
      const ids = [];
      const scheduleIds = scheduleById?.tickets.map((item) => {
        if (item.status !== "cancelled") {
          ids.push(item.seat.id);
        }
      });
      setChairExist(ids);
    }
  }, [scheduleById]);
  // console.log(chairExist);
  useEffect(() => {
    if (booked.length > 0) {
      setTotalPrice(booked.length * scheduleById.price);
      setDisableBtn(false);
    } else {
      setTotalPrice(0);
      setDisableBtn(true);
    }
  }, [booked]);

  const handleSelectChairOnCar = async (data) => {
    if (activeClass.includes(data.id)) {
      const newdata = await activeClass.filter((item) => item !== data.id);
      setActiveClass(newdata);
    } else {
      setActiveClass((prev) => [...prev, data.id]);
    }
    if (booked.includes(data)) {
      const newdata = await booked.filter((item) => item.id !== data.id);
      setBooked(newdata);
    } else {
      setBooked((prev) => [...prev, data]);
    }
  };

  return (
    <div className="route-confirm">
      <div className="route-confirm__top">
        <Select
          defaultValue="Giá"
          className="router-confirm__top--selected"
          // onChange={handleChangeFilterBookingByPrice}
          onChange={(e) => setSort(e)}
          options={dataBooking.typePrice}
        />
        <Select
          defaultValue="Loại Xe"
          className="router-confirm__top--selected"
          // onChange={handleChangeFilterBookingByType}
          onChange={(e) => setSort1(e)}
          options={dataBooking.typeCar}
        />
        {/* <Select
          defaultValue="Giờ"
          className="router-confirm__top--selected"
          onChange={handleChangeFilterBooking}
          options={dataBooking.typeHours}
        /> */}
      </div>
      <div className="route-confirm__list">
        {arrTmp.length > 0 ? (
          arrTmp.map((item) => {
            return (
              <div key={item.id} className="route-confirm__item">
                <p className="route-confirm__item--header">
                  {item.startTime}
                  <img
                    alt="fromto"
                    width="28"
                    height="7"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAOCAYAAAB6pd+uAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAOKADAAQAAAABAAAADgAAAAAjNiV1AAABjklEQVRIDWNgGGQgraTRO7OiXZBazmKilkHUMuffPwaFX39+ZaSXN+lTw8xB50FGRgYmxn8MbH9//w9ILmoMLezr46TEo4POg/8ZgV6EAiBD68uTL5nAJKsEEyOVZiZVA63VG1nYWzIwMHIg2cP+7+9ffWMrRw4/d4eHBw4c+IckR5A56GIQGGtY3fT/P4PFk0+MqSlVreIEfYWkAKthSPJ0ZyInUSyWizH+/JuaVNJk+f//f3hSxqIOLjToPMgALGTgrsPCAHqMmenff7fUsubY3IYGPixKUITwGoaikk4cYAlKnJv+/lf88YUxM7W8SRuf04gzDJ8JVJYjkERRbPv/j4Hj/+//IamFjYG5kyaxo0hCOYwpRY312CSGntj/j0ysHOtmdVY8Qnb7oItBZMeRxmbk//f7ZyKwceAcumoVvPobRh6EBAewaLXhP3kjOa24QQQkwmxk6egAkRqcJDBP/mcAImDpCkQgBgMom/4DYmBFAaorgMUSAwMEMzL+BSr5BxTkBNabeqZ2Tp8BQTlvqFxYe+QAAAAASUVORK5CYII="
                    data-v-008a65cb=""
                  />
                  {item.endTime}
                </p>
                <p className="route-confirm__item--center">
                  {item.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <div className="route-confirm__item__bottom">
                  <div className="route-confirm__item__bottom--left">
                    <p>
                      {item.departureAddress.name}
                      <img
                        alt="fromto"
                        width="28"
                        height="7"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAOCAYAAAB6pd+uAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAOKADAAQAAAABAAAADgAAAAAjNiV1AAABjklEQVRIDWNgGGQgraTRO7OiXZBazmKilkHUMuffPwaFX39+ZaSXN+lTw8xB50FGRgYmxn8MbH9//w9ILmoMLezr46TEo4POg/8ZgV6EAiBD68uTL5nAJKsEEyOVZiZVA63VG1nYWzIwMHIg2cP+7+9ffWMrRw4/d4eHBw4c+IckR5A56GIQGGtY3fT/P4PFk0+MqSlVreIEfYWkAKthSPJ0ZyInUSyWizH+/JuaVNJk+f//f3hSxqIOLjToPMgALGTgrsPCAHqMmenff7fUsubY3IYGPixKUITwGoaikk4cYAlKnJv+/lf88YUxM7W8SRuf04gzDJ8JVJYjkERRbPv/j4Hj/+//IamFjYG5kyaxo0hCOYwpRY312CSGntj/j0ysHOtmdVY8Qnb7oItBZMeRxmbk//f7ZyKwceAcumoVvPobRh6EBAewaLXhP3kjOa24QQQkwmxk6egAkRqcJDBP/mcAImDpCkQgBgMom/4DYmBFAaorgMUSAwMEMzL+BSr5BxTkBNabeqZ2Tp8BQTlvqFxYe+QAAAAASUVORK5CYII="
                        data-v-008a65cb=""
                      />
                      {item.destinationAddress.name}
                    </p>
                    <p>
                      Loại xe:{" "}
                      {item.car.type === "bed"
                        ? "Giường"
                        : item.car.type === "chair"
                        ? "Ghế"
                        : "Limousine"}
                    </p>
                    <span>Lộ trình: {item.distance}</span>
                  </div>
                  <Button
                    onClick={() => onChangeChoose(item.id)}
                    className="route-confirm__item__bottom--right"
                  >
                    Xem lịch
                  </Button>
                </div>
                {showChair && scheduleById.id === item.id && (
                  <div className="route-chair">
                    <Typography.Title level={5}>Danh sách ghế</Typography.Title>
                    {/* {scheduleById.car?.map((ele) => {
                      return ( */}
                    <>
                      {scheduleById.car.numberOfFloor === 1 ? (
                        <div className="route-chair__single">
                          <div className="route-chair__bottom">
                            <div
                              className="route-chair__list"
                              style={{
                                gridTemplateColumns: `repeat(${scheduleById.car.totalColumn},1fr)`,
                              }}
                            >
                              {scheduleById.car.seats?.length > 0 &&
                                scheduleById.car.seats?.map((seat) => {
                                  return (
                                    <button
                                      key={seat.id}
                                      disabled={chairExist.includes(seat.id)}
                                      onClick={() =>
                                        handleSelectChairOnCar(seat)
                                      }
                                      className={
                                        chairExist.includes(seat.id)
                                          ? "route-chair__list--chose"
                                          : activeClass.includes(seat.id)
                                          ? "route-chair__list--choosing"
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
                            <div
                              className="route-chair__list"
                              style={{
                                gridTemplateColumns: `repeat(${scheduleById.car.totalColumn},1fr)`,
                              }}
                            >
                              {scheduleById.car.seats?.length > 0 &&
                                scheduleById.car.seats
                                  ?.slice(0, scheduleById.car.seats.length / 2)
                                  .map((seat) => {
                                    return (
                                      <button
                                        key={seat.id}
                                        disabled={chairExist.includes(seat.id)}
                                        onClick={() =>
                                          handleSelectChairOnCar(seat)
                                        }
                                        className={
                                          chairExist.includes(seat.id)
                                            ? "route-chair__list--chose"
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
                          <div className="route-chair__bottom">
                            <p>Tầng trên</p>
                            <div
                              className="route-chair__list"
                              style={{
                                gridTemplateColumns: `repeat(${scheduleById.car.totalColumn},1fr)`,
                              }}
                            >
                              {scheduleById.car.seats?.length > 0 &&
                                scheduleById.car.seats
                                  ?.slice(scheduleById.car.seats.length / 2)
                                  .map((seat) => {
                                    return (
                                      <button
                                        key={seat.id}
                                        disabled={chairExist.includes(seat.id)}
                                        onClick={() =>
                                          handleSelectChairOnCar(seat)
                                        }
                                        className={
                                          chairExist.includes(seat.id)
                                            ? "route-chair__list--chose"
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
                      <div className="route-chair__note">
                        <div className="route-chair__note__item">
                          <span className="route-chair__note__item--empty"></span>
                          <p>Trống</p>
                        </div>
                        <div className="route-chair__note__item">
                          <span className="route-chair__note__item--choosing"></span>
                          <p>Đang chọn</p>
                        </div>
                        <div className="route-chair__note__item">
                          <span className="route-chair__note__item--chose"></span>
                          <p>Đã đặt</p>
                        </div>
                      </div>
                      <div className="route-chair__payment">
                        <div className="route-chair__payment__left">
                          <p>
                            {booked.length} vé:
                            {booked.map((item) => {
                              return (
                                <span key={item.id}>{item.name + " "}</span>
                              );
                            })}
                          </p>
                          <p>
                            Tổng tiền:{" "}
                            {totalPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        <Button
                          className="route-chair__payment__right"
                          onClick={handleContinueStep}
                          disabled={disableBtn}
                        >
                          Tiếp tục
                        </Button>
                      </div>
                    </>
                    {/* );
                    })} */}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Không tìm thấy lịch phù hợp</p>
        )}
      </div>
      <Modal
        open={open}
        onOk={() => navigate("/login")}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>,
        ]}
      >
        <Typography.Paragraph>
          Bạn chưa đăng nhập! Vui lòng đăng nhập
        </Typography.Paragraph>
      </Modal>
    </div>
  );
};

export default RouteConfirmation;
