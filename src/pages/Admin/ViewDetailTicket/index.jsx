import { Button, Input, Typography, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import {
  UpdateOneTicketAction,
  CancelOneTicketAction,
} from "./../../../redux/reducers/admin/manageTicketReducer";

const ViewDetailTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ticketDetail = useSelector(
    (state) => state.ManageTicketReducer.ticketDetail
  );
  const [ticketDetailClone, setTicketDetailClone] = useState({
    fullname: ticketDetail.fullname,
    phoneNumber: ticketDetail.phoneNumber,
    city: ticketDetail.city,
    district: ticketDetail.district,
    email: ticketDetail.email,
  });
  const [stateActive, setStateActive] = useState(ticketDetail.status);

  useEffect(() => {
    setTicketDetailClone({
      fullname: ticketDetail.fullname,
      phoneNumber: ticketDetail.phoneNumber,
      city: ticketDetail.city,
      district: ticketDetail.district,
      email: ticketDetail.email,
    });
    setStateActive(ticketDetail.status);
  }, [ticketDetail]);

  const handleChangeValue = (event) => {
    const name = event.target.name;
    setTicketDetailClone((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleUpdateCar = () => {
    const newData = {
      fullname: ticketDetailClone.fullname,
      email: ticketDetailClone.email,
      city: ticketDetailClone.city,
      district: ticketDetailClone.district,
      isActive: stateActive,
      phoneNumber: ticketDetailClone.phoneNumber,
    };
    // console.log(newData);
    dispatch(UpdateOneTicketAction(ticketDetail.id, newData));
  };

  const handleDisableTicket = () => {
    dispatch(CancelOneTicketAction(ticketDetail.id));
  };

  return (
    <div className="ticket-detail">
      <Typography.Title level={5} className="ticket-detail__title">
        Xem Chi Tiết Vé
      </Typography.Title>
      <div className="ticket-detail__data">
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Họ và tên:</p>
            <Input
              name="fullname"
              disabled
              value={ticketDetailClone.fullname}
              onChange={handleChangeValue}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Số điện thoại:</p>
            <Input
              name="phoneNumber"
              disabled
              value={ticketDetailClone.phoneNumber}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Tỉnh/Thành phố:</p>
            <Input
              name="city"
              disabled
              value={ticketDetailClone.city}
              onChange={handleChangeValue}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Quận/Huyện:</p>
            <Input
              name="district"
              disabled
              value={ticketDetailClone.district}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Ngày tạo:</p>
            <Input
              disabled
              value={Date(ticketDetail.created_at).slice(0, 15)}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Ngày cập nhật:</p>
            <Input
              disabled
              value={Date(ticketDetail.updated_at).slice(0, 15)}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Điểm đi:</p>
            <Input
              disabled
              value={ticketDetail.schedule.departureAddress.name}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Điểm đến:</p>
            <Input
              disabled
              value={ticketDetail.schedule.destinationAddress.name}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Trạng thái:</p>
            <Select
              disabled
              value={
                stateActive === "waiting"
                  ? "Waiting"
                  : stateActive === "processing"
                  ? "Processing"
                  : stateActive === "completed"
                  ? "Completed"
                  : "Cancelled"
              }
              className="router-confirm__top--selected"
              onChange={(value) => setStateActive(value)}
              options={[
                { value: "waiting", label: "Waiting" },
                { value: "processing", label: "Processing" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ]}
              style={{ width: "100%" }}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Email:</p>
            <Input
              name="email"
              disabled
              value={ticketDetailClone.email}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>CCCD/CMND:</p>
            <Input
              name="idCard"
              value={ticketDetail.user.idCard}
              disabled
              // onChange={handleChangeValue}
            />
          </div>
          <div className="ticket-detail__data__item">
            <p>Tên xe:</p>
            <Input
              name="nameCar"
              value={ticketDetail.seat.car.name}
              disabled
              // onChange={handleChangeValue}
            />
          </div>
        </div>
        <div className="ticket-detail__data__row">
          <div className="ticket-detail__data__item">
            <p>Tên ghế:</p>
            <Input
              name="idCard"
              value={ticketDetail.seat.name}
              disabled
              // onChange={handleChangeValue}
            />
          </div>
        </div>
      </div>
      <div className="ticket-detail__function">
        <Button
          className="ticket-detail__function--back"
          onClick={() => navigate("/admin/manage-ticket")}
        >
          Quay lại
        </Button>
        {ticketDetail.status !== "completed" &&
          ticketDetail.status !== "cancelled" && (
            <div className="ticket-detail__group">
              <Button
                className="ticket-detail__group--disabled"
                onClick={handleDisableTicket}
              >
                Huỷ vé
              </Button>
              {/* <Button
                className="ticket-detail__group--update"
                onClick={handleUpdateCar}
              >
                Cập nhật
              </Button> */}
            </div>
          )}
      </div>
    </div>
  );
};

export default ViewDetailTicket;
