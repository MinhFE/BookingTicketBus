/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetListBusInfoAction,
  CreateNewScheduleAction,
  // GetDetailBusInfoAction,
} from "./../../../redux/reducers/admin/manageBusInfoReducer";
import {
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
  Pagination,
  Form,
} from "antd";
import moment from "moment";
import "./style.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import { filterListAddressByCity } from "../../../utils/filterListAddress";
import { GetListAddressAction } from "../../../redux/reducers/admin/manageAddressReducer";
import { GetListCarAction } from "../../../redux/reducers/admin/manageCarReducer";
import { useForm } from "antd/es/form/Form";
// import { GetListAddressAction } from "../../../redux/reducers/addressReducer";

const { Option } = Select;

const ManageBusInformation = () => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const navigate = useNavigate();
  const [listBusInfo, setListBusInfo] = useState([]);
  const [disableDatePicker, setDisableDatePicker] = useState(true);
  const [filter, setFilter] = useState({
    departure: "",
    destination: "",
  });
  useEffect(() => {
    dispatch(GetListBusInfoAction());
    dispatch(GetListAddressAction());
    dispatch(GetListCarAction());
  }, []);
  // const listBusInfo = useSelector(
  //   (state) => state.ManageBusInfoReducer.listBusInfo
  // );
  const disabledDate = (current) => {
    // Can not select days before today and today
    // return current && current < dayjs().endOf("day");
    // console.log(current);
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  };
  const disableDateCurrentAndPast = (current) => {
    return current && current <= dayjs(dayBusGo);
  };
  const listAddressBus = useSelector(
    (state) => state.ManageAddressReducer.listAddress
  );
  const listCar = useSelector((state) => state.ManageCarReducer.listCar);
  const listCarReady = listCar.filter((item) => item.isActive === true);
  const date = new Date();

  const [listBusClone, setListBusClone] = useState([]);
  const [listBusGo, setListBusGo] = useState([
    {
      id: 0,
      city: "All",
    },
  ]);
  const [listBusGo2, setListBusGo2] = useState([]);
  const [listBusArrive, setListBusArrive] = useState([
    {
      id: 0,
      city: "All",
    },
  ]);
  const [listBusArrive2, setListBusArrive2] = useState([]);
  const [chooseBusGo, setChooseBusGo] = useState("");
  const [chooseBusArrive, setChooseBusArrive] = useState("");
  const [filtered, setFiltered] = useState([]);
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
  // dayjs(date.toISOString(), "YYYY/MM/DD")
  const [dayBusArrive, setDayBusArrive] = useState("");
  // dayjs(date.toISOString(), "YYYY/MM/DD")

  const [current, setCurrent] = useState(1);
  const customFormat = (value) => `${value.format("YYYY-MM-DD")}`;
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
    const getListBusInfo = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/schedule");
        // console.log(result.data);
        setListBusInfo(result.data);
        setFiltered(result.data);
        setListBusClone(result.data.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };
    getListBusInfo();
  }, [open]);
  useEffect(() => {
    listAddressBus.forEach((item) => {
      if (item.isActive) {
        setListBusGo((prev) => [...prev, item]);
        setListBusGo2((prev) => [...prev, item]);
        setListBusArrive((prev) => [...prev, item]);
        setListBusArrive2((prev) => [...prev, item]);
      } else {
        setListBusGo((prev) => [...prev]);
        setListBusGo2((prev) => [...prev]);
        setListBusArrive((prev) => [...prev]);
        setListBusArrive2((prev) => [...prev]);
      }
    });
  }, []);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setNewListBus((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleOk = async () => {
    const newDataCreate = {
      price: Number(newListBus.price),
      departureAddress: Number(chooseBusGo),
      destinationAddress: Number(chooseBusArrive),
      startDay: dayBusGo + " 00:01:00Z", //dayBusGo.$d.toISOString()
      endDay: dayBusArrive + " 00:01:00Z", //dayBusArrive.$d.toISOString()
      distance: newListBus.distance,
      startTime: newListBus.startTime,
      endTime: newListBus.endTime,
      car: newListBus.car,
    };
    // console.log(newDataCreate);
    if (
      newDataCreate.price &&
      newDataCreate.departureAddress &&
      newDataCreate.destinationAddress &&
      newDataCreate.startDay &&
      newDataCreate.endDay &&
      newDataCreate.distance &&
      newDataCreate.startTime &&
      newDataCreate.endTime &&
      newDataCreate.car
    ) {
      console.log(newDataCreate);
      dispatch(CreateNewScheduleAction(newDataCreate));
      dispatch(GetListBusInfoAction());
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        form.resetFields();
        setOpen(false);
      }, 3000);
    }
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListBusClone(listBusInfo.slice(10 * (e - 1), e * 10));
  };
  const handleViewDetailBusInfo = (id) => {
    // dispatch(GetDetailBusInfoAction(id));
    navigate(`/admin/manage-info-bus/${id}`);
  };
  const handleFilter = () => {
    let listBusFilter = [...listBusInfo];
    // let listNewFilter = [];
    // console.log(filter);
    if (filter.departure) {
      listBusFilter = listBusFilter.filter(
        (item) => filter.departure === item.departureAddress.id
      );
      // console.log(listBusFilter);
    }
    if (filter.destination) {
      listBusFilter = listBusFilter.filter(
        (item) => filter.destination === item.destinationAddress.id
      );
      // console.log(listBusFilter);
    }
    // console.log(listBusFilter);
    setListBusClone(listBusFilter.slice(0, 10));
    setFiltered(listBusFilter);
  };
  // console.log(dayBusGo);
  return (
    <div className="bus-info">
      <div className="bus-info__top">
        <Button className="bus-info__top--add" onClick={showModal}>
          Tạo chuyến xe mới <i className="fas fa-plus"></i>
        </Button>
        <div className="bus-info__top-filter">
          <p>Điểm đi:</p>
          <Select
            defaultValue="All"
            style={{ width: "60%" }}
            // onChange={handleChange}
            onChange={(value) => setFilter({ ...filter, departure: value })}
          >
            {listBusGo.length > 0 &&
              filterListAddressByCity(filter.destination, listBusGo).map(
                (item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.city}
                    </Option>
                  );
                }
              )}
          </Select>
          <p>Điểm đến:</p>
          <Select
            defaultValue="All"
            style={{ width: "60%" }}
            onChange={(value) => setFilter({ ...filter, destination: value })}

            // onChange={handleChange}
          >
            {listBusArrive.length > 0 &&
              filterListAddressByCity(filter.departure, listBusArrive).map(
                (item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.city}
                    </Option>
                  );
                }
              )}
          </Select>
          <Button onClick={handleFilter}>Tìm kiếm</Button>
        </div>
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
        {filtered.length > 0 ? (
          <Pagination
            current={current}
            total={filtered.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
      <Modal
        open={open}
        title="Thêm mới chuyến xe"
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk} form={form}>
          <div className="manage-car__modal">
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Giá:</p>
                <Form.Item
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá!" },
                    {
                      pattern: new RegExp(/^([1-9][0-9]{5,})$/),
                      message: "Giá từ 100.000 trở lên!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    name="price"
                    value={newListBus.price}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Khoảng cách:</p>
                <Form.Item
                  name="distance"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập khoảng cách!",
                    },
                    {
                      pattern: new RegExp(/(\d+).?(\d*)\s*(m|cm|km)/),
                      message: "Không đúng định dạng! VD: 1km",
                    },
                  ]}
                >
                  <Input
                    name="distance"
                    value={newListBus.distance}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Ngày khởi hành:</p>
                <Form.Item
                  name="startDay"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày khởi hành!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày khởi hành"
                    // defaultValue={dayjs(date.toISOString(), "YYYY/MM/DD")}
                    format={customFormat}
                    onChange={(d, dateString) => {
                      setDayBusGo(dateString);
                      setDisableDatePicker(false);
                    }}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Giờ khởi hành:</p>
                <Form.Item
                  name="startTime"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giờ khởi hành!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn giờ khởi hành"
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
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Ngày kết thúc:</p>
                <Form.Item
                  name="endDay"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày kết thúc!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày kết thúc"
                    disabled={disableDatePicker}
                    // defaultValue={dayjs(date.toISOString(), "YYYY/MM/DD")}
                    format={customFormat}
                    onChange={(d, dateString) => setDayBusArrive(dateString)}
                    disabledDate={disableDateCurrentAndPast}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Giờ kết thúc:</p>
                <Form.Item
                  name="endTime"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giờ kết thúc!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn giờ kết thúc"
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
                </Form.Item>
              </div>
            </div>
            <div
              className="manage-car__modal__row"
              style={{ gridTemplateColumns: "repeat(2,48%)" }}
            >
              <div className="manage-car__modal__item">
                <p>Điểm đi:</p>
                <Form.Item
                  name="departureAddress"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn điểm đi!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn điểm đi"
                    onChange={(value) => {
                      setChooseBusGo(value);
                      setListBusArrive2(
                        listAddressBus.filter(
                          (item) => item.id !== value && item.isActive === true
                        )
                      );
                    }}
                    style={{ width: "100%" }}
                  >
                    {listBusGo2.length > 0 &&
                      listBusGo2.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Điểm đến:</p>
                <Form.Item
                  name="destinationAddress"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn điểm đến!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn điểm đến"
                    onChange={(value) => {
                      setChooseBusArrive(value);
                      setListBusGo2(
                        listAddressBus.filter(
                          (item) => item.id !== value && item.isActive === true
                        )
                      );
                    }}
                    style={{ width: "100%" }}
                  >
                    {listBusArrive2.length > 0 &&
                      listBusArrive2.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div
              className="manage-car__modal__row"
              style={{ gridTemplateColumns: "repeat(2,48%)" }}
            >
              <div className="manage-car__modal__item">
                <p>Chọn xe:</p>
                <Form.Item
                  name="car"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn xe!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn điểm xe"
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
                </Form.Item>
              </div>
            </div>
            <div className="bus-info__btn">
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>

              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Thêm mới chuyến xe
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBusInformation;
