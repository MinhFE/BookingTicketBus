import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateNewScheduleAction,
  GetListBusInfoAction,
} from "../../../redux/reducers/admin/manageBusInfoReducer";
import { Button, DatePicker, Input, Modal, Pagination, Select } from "antd";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import moment from "moment";
import dayjs from "dayjs";

const { Option } = Select;
const ManageInfoBus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listBusInfo, setListBusInfo] = useState([]);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    dispatch(GetListBusInfoAction());
  }, []);
  const userLogin = useSelector((state) => state.UserReducer.userLogin);
  // console.log(userLogin);
  // const listBusInfo = useSelector(
  //   (state) => state.ManageBusInfoReducer.listBusInfo
  // );
  const listAddressBus = useSelector(
    (state) => state.AddressReducer.listAddress
  );
  const listCar = useSelector((state) => state.ManageCarReducer.listCar);
  const listCarReady = listCar.filter((item) => item.isActive === true);

  const [listBusClone, setListBusClone] = useState([]);
  const [listBusGo, setListBusGo] = useState([]);
  const [listBusArrive, setListBusArrive] = useState([]);
  const [chooseBusGo, setChooseBusGo] = useState("");
  const [chooseBusArrive, setChooseBusArrive] = useState("");
  const [newListBus, setNewListBus] = useState({
    price: "",
    distance: "",
    startTime: "",
    endTime: "",
    car: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const [dayBusGo, setDayBusGo] = useState("");
  const [dayBusArrive, setDayBusArrive] = useState("");
  const [current, setCurrent] = useState(1);
  const customFormat = (value) => `${value.format("DD/MM/YYYY")}`;
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

  const getListBusInfoById = (listBus) => {
    return listBus.filter((item) => item.car.user.id === userLogin.id);
  };
  useEffect(() => {
    const getListBusInfo = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/schedule");
        // console.log(getListBusInfoById(result.data));
        setListBusInfo(getListBusInfoById(result.data));
        setListBusClone(getListBusInfoById(result.data).slice(0, 10));
        setFiltered(getListBusInfoById(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getListBusInfo();
  }, [open]);
  useEffect(() => {
    listAddressBus.forEach((item) => {
      setListBusGo((prev) => [...prev, item]);
      setListBusArrive((prev) => [...prev, item]);
    });
  }, []);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setNewListBus((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  // console.log(listBusClone);
  const handleOk = () => {
    const newDataCreate = {
      price: Number(newListBus.price),
      departureAddress: Number(chooseBusGo),
      destinationAddress: Number(chooseBusArrive),
      startDay: dayBusGo.$d.toISOString(),
      endDay: dayBusArrive.$d.toISOString(),
      distance: newListBus.distance,
      startTime: newListBus.startTime,
      endTime: newListBus.endTime,
      car: newListBus.car,
    };
    // console.log(newDataCreate);
    dispatch(CreateNewScheduleAction(newDataCreate));
    dispatch(GetListBusInfoAction());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListBusClone(listBusInfo.slice(10 * (e - 1), e * 10));
  };
  const handleViewDetailBusInfo = (id) => {
    // dispatch(GetDetailBusInfoAction(id));
    navigate(`/driver/manage-info-bus/${id}`);
  };
  const handleChange = (value) => {
    if (value === "All") {
      // setListUsersFilter(listUser.slice(0, 10));
      // setFiltered(listUser);
      setListBusClone(listBusInfo.slice(0, 10));
      setFiltered(listBusInfo);
    } else {
      const listFilter = [...listBusInfo];
      const filteredd = listFilter.filter((item) => item.status === value);
      //   setListUsersFilter(filteredd);
      //   setFiltered(filteredd);
      setListBusClone(filteredd.slice(0, 10));
      setFiltered(filteredd);
    }
  };

  return (
    <div className="bus-info">
      <div
        className="bus-info__top__driver"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        {/* <Button className="bus-info__top--add" onClick={showModal}>
          Tạo chuyến xe mới <i className="fas fa-plus"></i>
        </Button> */}
        <p>Lọc theo:</p>
        <Select
          defaultValue="All"
          style={{
            width: 150,
          }}
          onChange={handleChange}
          options={[
            { value: "All", label: "All" },
            { value: "completed", label: "Completed" },
            { value: "waiting", label: "Waiting" },
            { value: "cancelled", label: "Cancelled" },
          ]}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Tên xe</th>
            <th>Giá</th>
            <th>Giờ khởi hành</th>
            <th>Giờ kết thúc</th>
            <th>Lịch trình</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listBusClone.map((item) => {
            return (
              <tr
                key={item.id}
                style={
                  item.status === "completed"
                    ? { background: "#22cc22", color: "white" }
                    : item.status === "waiting"
                    ? { background: "#cccc23", color: "white" }
                    : { background: "red", color: "white" }
                }
              >
                <td>{item.car.name}</td>
                <td>
                  {item.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                {/* <td>{moment.utc(item.startDay).format("hh:mm:ss")}</td> */}
                <td>{moment(item.startDay).format("DD/MM/YYYY")}</td>
                {/* <td>{moment.utc(item.endDay).format("hh:mm:ss")}</td> */}
                <td>{moment(item.endDay).format("DD/MM/YYYY")}</td>
                <td>{`${item.departureAddress.city} - ${item.destinationAddress.city}`}</td>
                <td>{item.status}</td>
                <td>
                  <Button onClick={() => handleViewDetailBusInfo(item.id)}>
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bus-info__pagination">
        {listBusClone.length > 0 ? (
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
        title="Thêm mới chuyến xe"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {" "}
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Thêm mới chuyến xe
          </Button>,
        ]}
      >
        <div className="manage-car__modal">
          <div className="manage-car__modal__row">
            <div className="manage-car__modal__item">
              <p>Giá:</p>
              <Input
                type="number"
                name="price"
                value={newListBus.price}
                onChange={handleChangeValueModal}
              />
            </div>
            <div className="manage-car__modal__item">
              <p>Khoảng cách:</p>
              <Input
                name="distance"
                value={newListBus.distance}
                onChange={handleChangeValueModal}
              />
            </div>
          </div>
          <div className="manage-car__modal__row">
            <div className="manage-car__modal__item">
              <p>Ngày khởi hành:</p>
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs("2023/04/29", "YYYY/MM/DD")}
                format={customFormat}
                onChange={(d, dateString) => setDayBusGo(d)}
              />
            </div>
            <div className="manage-car__modal__item">
              <p>Giờ khởi hành:</p>
              <Select
                // onChange={(value) => {
                //   setChooseBusGo(value);
                // }}
                onChange={(value) =>
                  setNewListBus({ ...newListBus, startTime: value })
                }
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
          <div className="manage-car__modal__row">
            <div className="manage-car__modal__item">
              <p>Ngày kết thúc:</p>
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs("2023/04/29", "YYYY/MM/DD")}
                format={customFormat}
                onChange={(d, dateString) => setDayBusArrive(d)}
              />
            </div>
            <div className="manage-car__modal__item">
              <p>Giờ kết thúc:</p>
              <Select
                onChange={(value) =>
                  setNewListBus({ ...newListBus, endTime: value })
                }
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
          <div
            className="manage-car__modal__row"
            style={{ gridTemplateColumns: "repeat(2,48%)" }}
          >
            <div className="manage-car__modal__item">
              <p>Điểm đi:</p>
              <Select
                onChange={(value) => {
                  setChooseBusGo(value);
                  setListBusArrive(
                    listAddressBus.filter((item) => item.id !== value)
                  );
                }}
                style={{ width: "100%" }}
              >
                {listBusGo.length > 0 &&
                  listBusGo.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            <div className="manage-car__modal__item">
              <p>Điểm đến:</p>
              <Select
                onChange={(value) => {
                  setChooseBusArrive(value);
                  setListBusGo(
                    listAddressBus.filter((item) => item.id !== value)
                  );
                }}
                style={{ width: "100%" }}
              >
                {listBusArrive.length > 0 &&
                  listBusArrive.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </div>
          <div
            className="manage-car__modal__row"
            style={{ gridTemplateColumns: "repeat(2,48%)" }}
          >
            <div className="manage-car__modal__item">
              <p>Chọn xe:</p>
              <Select
                onChange={(value) => {
                  setNewListBus({ ...newListBus, car: value });
                }}
                style={{ width: "100%" }}
              >
                {listCarReady.length > 0 &&
                  listCarReady.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageInfoBus;
