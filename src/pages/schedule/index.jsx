/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SlickSwiper from "./../../components/slickSwiper/index";
import "./style.scss";
import { Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  // CallApiGetScheduleByTicketId,
  CallApiListScheduleMoreThanCurrentDateFiltered,
} from "../../redux/reducers/scheduleReducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  filterListAddressByValue,
  filterListAddressRepeat,
} from "../../utils/filterListAddress";

const Schedule = () => {
  const { t } = useTranslation(["schedule", "home"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectSchedule = useSelector(
    (state) => state.ScheduleReducer.listScheduleMoreThanCurrentDate
  );
  // const scheduleFind = useSelector(
  //   (state) => state.ScheduleReducer.scheduleMoreThanCurrentDateFiltered
  // );
  const [listSchedule, setListSchedule] = useState([]);
  const [scheduleGo, setScheduleGo] = useState([]);
  const [scheduleArrive, setScheduleArrive] = useState([]);

  const [chooseGo, setChooseGo] = useState("");
  const [chooseArrive, setChooseArrive] = useState("");

  useEffect(() => {
    setListSchedule(selectSchedule);
    const uniqueAddress = [];
    selectSchedule.forEach((item) => {
      const isDuplicate = uniqueAddress.some((element) => {
        return (
          element.departureAddress.city === item.departureAddress.city &&
          element.destinationAddress.city === item.destinationAddress.city
        );
      });
      if (!isDuplicate) {
        uniqueAddress.push(item);
        const newSelectedScheduleGo = {
          label: item.departureAddress.city,
          value: item.departureAddress.city,
        };
        const newSelectedScheduleArrive = {
          label: item.destinationAddress.city,
          value: item.destinationAddress.city,
        };
        setScheduleGo((prev) => [...prev, newSelectedScheduleGo]);
        setScheduleArrive((prev) => [...prev, newSelectedScheduleArrive]);
      }
    });
  }, []);
  // console.log(selectSchedule);
  const handleFilterSchedule = () => {
    let list = [...selectSchedule];

    if (chooseGo) {
      list = list.filter((item) => item.departureAddress.city === chooseGo);
    }
    if (chooseArrive) {
      list = list.filter(
        (item) => item.destinationAddress.city === chooseArrive
      );
    }
    setListSchedule(list);
  };

  const handleFindBus = (startDay, addressFrom, addressTo) => {
    const scheduleMoreThanCurrentDateFiltered = selectSchedule.filter(
      (item) =>
        moment.utc(item.startDay).format("DD/MM/YYYY") ===
          moment.utc(startDay).format("DD/MM/YYYY") &&
        item.departureAddress.name === addressFrom &&
        item.destinationAddress.name === addressTo
    );
    dispatch(
      CallApiListScheduleMoreThanCurrentDateFiltered(
        scheduleMoreThanCurrentDateFiltered
      )
    );
    navigate("/dat-ve-xe");
  };
  const unique = [];
  listSchedule.forEach((item) => {
    const isDuplicate = unique.some((element) => {
      return (
        element.departureAddress.id === item.departureAddress.id &&
        element.destinationAddress.id === item.destinationAddress.id &&
        moment(element.startDay).format("DD/MM/YYYY") ===
          moment(item.startDay).format("DD/MM/YYYY")
      );
    });
    // console.log(item);
    // console.log(isDuplicate);
    if (!isDuplicate) {
      // console.log(123);
      unique.push(item);
    }
  });
  // console.log(scheduleArrive);
  return (
    <div className="schedule">
      <SlickSwiper />
      <div className="schedule__filter">
        <div className="schedule__filter__control">
          <p>{t("schedule.Điểm đi")}</p>
          <Select
            showSearch
            className="schedule__filter__control--select"
            placeholder={`-- ${t("header.Chọn điểm đi", { ns: "home" })} --`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={filterListAddressByValue(
              chooseArrive,
              filterListAddressRepeat(scheduleGo)
            )}
            onChange={(value) => setChooseGo(value)}
          />
        </div>
        <div className="schedule__filter__control">
          <p>{t("schedule.Điểm đến")}</p>
          <Select
            showSearch
            className="schedule__filter__control--select"
            placeholder={`-- ${t("header.Chọn điểm đến", { ns: "home" })} --`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={filterListAddressByValue(
              chooseGo,
              filterListAddressRepeat(scheduleArrive)
            )}
            onChange={(value) => setChooseArrive(value)}
          />
        </div>
        <Button
          className="schedule__filter__btn-search"
          onClick={handleFilterSchedule}
        >
          <i className="fas fa-search"></i>
          {t("schedule.Tìm kiếm")}
        </Button>
      </div>
      <div className="schedule__list">
        <table>
          <thead>
            <tr className="schedule__list__head">
              <th>{t("schedule.Điểm đi")}</th>
              <th>{t("schedule.Điểm đến")}</th>
              <th>{t("schedule.Quãng đường")}</th>
              <th>{t("schedule.Thời gian hành trình")}</th>
              {/* <th>{t("schedule.Giá vé")}</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {unique.length > 0 ? (
              unique.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.departureAddress.city}</td>
                    <td>{item.destinationAddress.city}</td>
                    <td>{item.distance}</td>
                    <td>{moment(item.startDay).format("DD/MM/YYYY")}</td>
                    {/* <td>
                    {item.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td> */}
                    <td>
                      <Button
                        onClick={() =>
                          handleFindBus(
                            item.startDay,
                            item.departureAddress.name,
                            item.destinationAddress.name
                          )
                        }
                      >
                        {t("schedule.Đặt vé")}
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <td colSpan={4} style={{ padding: "10px 0" }}>
                {t("schedule.Không có lịch trình")}
              </td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
