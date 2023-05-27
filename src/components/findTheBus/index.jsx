/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Select, Typography, DatePicker } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CallApiListScheduleMoreThanCurrentDate,
  CallApiListScheduleMoreThanCurrentDateFiltered,
} from "./../../redux/reducers/scheduleReducer";
import dayjs from "dayjs";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { filterListAddress } from "../../utils/filterListAddress";
// import { BaseApi } from "../../services/baseServices";
// import { API_URL_DOMAIN } from "../../utils/constant";

const { Option } = Select;

const FindTheBus = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [listAddressBus, setListAddressBus] = useState([]);
  const listAddressBus = useSelector(
    (state) => state.AddressReducer.listAddress
  );
  const listScheduleMoreThanCurrentDate = useSelector(
    (state) => state.ScheduleReducer?.listScheduleMoreThanCurrentDate
  );

  useEffect(() => {
    dispatch(CallApiListScheduleMoreThanCurrentDate());
  }, []);
  const [chooseBusGo, setChooseBusGo] = useState("");
  const [chooseBusArrive, setChooseBusArrive] = useState("");
  const [dayBusGo, setDayBusGo] = useState("");
  // const [dayBusArrive, setDayBusArrive] = useState("");
  const [listBusGo, setListBusGo] = useState([]);
  const [listBusArrive, setListBusArrive] = useState([]);
  // const [handleRadio, setHandleRadio] = useState({
  //   oneWay: true,
  //   twoWay: false,
  // });
  const [showValGo, setShowValGo] = useState(false);
  const [showValArrive, setShowValArrive] = useState(false);
  const [showValDate, setShowValDate] = useState(false);
  const date = new Date();
  useEffect(() => {
    listAddressBus &&
      listAddressBus.forEach((item) => {
        if (item.isActive) {
          setListBusGo((prev) => [...prev, item]);
          setListBusArrive((prev) => [...prev, item]);
        } else {
          setListBusGo((prev) => [...prev]);
          setListBusArrive((prev) => [...prev]);
        }
      });
  }, []);
  const scheduleMoreThanCurrentDateFiltered =
    listScheduleMoreThanCurrentDate &&
    listScheduleMoreThanCurrentDate.filter(
      (item) =>
        moment(item.startDay).format("DD/MM/YYYY") === dayBusGo &&
        item.departureAddress.name === chooseBusGo &&
        item.destinationAddress.name === chooseBusArrive
    );
  // console.log(scheduleMoreThanCurrentDateFiltered);
  const customFormat = (value) => `${value.format("DD/MM/YYYY")}`;
  const handleFindBus = async () => {
    if (chooseBusArrive && chooseBusGo && dayBusGo) {
      await dispatch(
        CallApiListScheduleMoreThanCurrentDateFiltered(
          scheduleMoreThanCurrentDateFiltered
        )
      );
      navigate("/dat-ve-xe");
    } else {
      if (!chooseBusGo) {
        setShowValGo(true);
      }
      if (!chooseBusArrive) {
        setShowValArrive(true);
      }
      if (!dayBusGo) {
        setShowValDate(true);
      }
    }
  };

  // const handleChangeRadio = () => {
  //   if (handleRadio.oneWay) {
  //     setHandleRadio({
  //       oneWay: false,
  //       twoWay: true,
  //     });
  //   } else {
  //     setHandleRadio({
  //       oneWay: true,
  //       twoWay: false,
  //     });
  //   }
  // };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  };
  // console.log(dayBusGo);
  return (
    <div className="find-bus">
      {/* <div className="find-bus__top">
        <Radio
          defaultChecked
          checked={handleRadio.oneWay}
          onChange={handleChangeRadio}
        >
          Một chiều
        </Radio>
        <Radio
          defaultChecked={false}
          checked={handleRadio.twoWay}
          onChange={handleChangeRadio}
        >
          Khứ hồi
        </Radio>
      </div> */}
      <div className="find-bus__list">
        <div className="find-bus__booking">
          <div className="find-bus__booking--item">
            <Typography.Title level={5}>{t("header.Điểm đi")}</Typography.Title>

            <Select
              placeholder={t("header.Chọn điểm đi")}
              onChange={(value) => {
                setChooseBusGo(value);
                setShowValGo(false);
                // setListBusArrive(listBusArrive.filter(item => item.name !== value));
              }}
            >
              {listBusGo.length > 0 &&
                filterListAddress(chooseBusArrive, listBusGo).map((item) => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.city}
                    </Option>
                  );
                })}
            </Select>
            {showValGo && (
              <p style={{ color: "red", fontSize: "14px", height: "18px" }}>
                Chọn điểm đi
              </p>
            )}
          </div>
          <div className="find-bus__booking--item">
            <Typography.Title level={5}>
              {t("header.Điểm đến")}
            </Typography.Title>
            <Select
              placeholder={t("header.Chọn điểm đến")}
              onChange={(value) => {
                setChooseBusArrive(value);
                setShowValArrive(false);
              }}
            >
              {listBusArrive.length > 0 &&
                filterListAddress(chooseBusGo, listBusArrive).map((item) => {
                  return (
                    <Option key={item.id} value={item.name}>
                      {item.city}
                    </Option>
                  );
                })}
            </Select>
            <div style={{ color: "red", fontSize: "14px", height: "18px" }}>
              {showValArrive && "Chọn điểm đến"}
            </div>
          </div>
        </div>

        <div className="find-bus__group">
          <div className="find-bus__group--item">
            <Typography.Title level={5}>{t("header.Ngày đi")}</Typography.Title>
            <DatePicker
              style={{ width: "100%" }}
              // defaultValue={dayjs(date.toISOString(), "YYYY/MM/DD")}
              format={customFormat}
              onChange={(d, dateString) => setDayBusGo(dateString)}
              disabledDate={disabledDate}
            />
            <div style={{ color: "red", fontSize: "14px", height: "18px" }}>
              {showValDate && "Chọn ngày đi"}
            </div>
          </div>
          <div className="find-bus__group--item">
            {/* <Typography.Title level={5}>Ngày về</Typography.Title>
            <DatePicker
              disabled={handleRadio.oneWay}
              style={{ width: "100%" }}
              defaultValue={dayjs("2023/04/29", "YYYY/MM/DD")}
              format={customFormat}
              onChange={(d, dateString) => setDayBusArrive(dateString)}
            /> */}
          </div>
        </div>
      </div>
      <Button className="find-bus__btn-search" onClick={handleFindBus}>
        <i className="fas fa-search"></i>
        {t("header.TÌM CHUYẾN XE")}
      </Button>
    </div>
  );
};

export default FindTheBus;
