import { Button, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UpdateStatusSeatAction } from "../../../redux/reducers/admin/manageCarReducer";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";

const ManageSeatOfCar = () => {
  const navigate = useNavigate();
  const param = useParams();
  // const dispatch = useDispatch();
  // const seatOfCar = useSelector((state) => state.ManageCarReducer.carDetail);
  const [seatOfCar, setSeatOfCar] = useState({});

  const [seatOfCarClone, setSeatOfCarClone] = useState({});
  const [selectedTicket, setSelectedTicket] = useState({
    id: 0,
    name: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCarDetail = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + `/car/${param.id}`);
        // console.log(result.data);
        setSeatOfCar(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCarDetail();
  }, [isModalOpen]);
  useEffect(() => {
    setSeatOfCarClone({
      id: seatOfCar.id,
      name: seatOfCar.name,
      type: seatOfCar.type,
      totalRow: seatOfCar.totalRow,
      totalColumn: seatOfCar.totalColumn,
      numberOfFloor: seatOfCar.numberOfFloor,
      isActive: seatOfCar.isActive,
      phoneNumber: seatOfCar.phoneNumber,
      seats: seatOfCar.seats,
    });
  }, [seatOfCar]);
  const showModal = (value) => {
    setSelectedTicket({
      id: value.id,
      name: value.name,
      status: value.status,
    });
    setIsModalOpen(true);
  };
  // console.log(selectedTicket);
  const updateStatusSeat = async (idSeat, status) => {
    try {
      await BaseApi.patch(API_URL_DOMAIN + `/seat/${idSeat}`, status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    if (selectedTicket.status === "available") {
      console.log(true);
      updateStatusSeat(selectedTicket.id, { status: "unavailable" });

      // dispatch(
      //   UpdateStatusSeatAction(selectedTicket.id, { status: "unavailable" })
      // );
    } else {
      console.log(false);
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

  return (
    <div className="seat-car">
      <Typography.Title level={4}>Quản lý ghế</Typography.Title>
      {/* {seatOfCarClone.numberOfFloor === 1 ? ( */}
      <div className="seat-car__single">
        {/* <Typography.Title level={5}>Danh sách ghế</Typography.Title> */}
        <div className="seat-car__single__top">
          <div>
            <p>Tên xe:</p>
            <span>{seatOfCarClone.name}</span>
          </div>
          <div>
            <p>Tổng số ghế:</p>
            <span>
              {seatOfCarClone.totalRow *
                seatOfCarClone.totalColumn *
                seatOfCarClone.numberOfFloor}
            </span>
          </div>
        </div>
        {seatOfCarClone.numberOfFloor === 1 ? (
          <div
            className="seat-car__single__list"
            style={{
              gridTemplateColumns: `repeat(${seatOfCarClone.totalColumn},1fr)`,
            }}
          >
            {seatOfCarClone.seats.length > 0 &&
              seatOfCarClone.seats.map((item) => {
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
            <div
              className="route-chair__group"
              style={{ justifyContent: "space-around" }}
            >
              <div className="route-chair__bottom">
                <p>Tầng dưới</p>
                <div
                  className="route-chair__list"
                  style={{
                    gridTemplateColumns: `repeat(${seatOfCarClone.totalColumn},1fr)`,
                  }}
                >
                  {seatOfCarClone.seats?.length > 0 &&
                    seatOfCarClone.seats
                      ?.slice(0, seatOfCarClone.seats.length / 2)
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
                <div
                  className="route-chair__list"
                  style={{
                    gridTemplateColumns: `repeat(${seatOfCarClone.totalColumn},1fr)`,
                  }}
                >
                  {seatOfCarClone.seats?.length > 0 &&
                    seatOfCarClone.seats
                      ?.slice(seatOfCarClone.seats.length / 2)
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
            {/* {seatOfCarClone.seats.length > 0 && seatOfCarClone.seats.map(item => {
              return <Button key={item.id}>
                {item.name}
              </Button>
            })} */}
          </div>
        )}
      </div>

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
      <div className="btn-back">
        <Button
          className="car-detail__function--back"
          onClick={() => navigate(`/admin/manage-car/${seatOfCar.id}`)}
        >
          Quay lại
        </Button>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedTicket.status === "available" ? (
          <p>
            Bạn có muốn ẩn ghế <b> {selectedTicket.name}</b> của xe{" "}
            <b>{seatOfCarClone.name} </b>
            không ?
          </p>
        ) : (
          <p>
            Bạn có muốn hiện ghế <b> {selectedTicket.name}</b> của xe{" "}
            <b>{seatOfCarClone.name} </b>
            không ?
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ManageSeatOfCar;
