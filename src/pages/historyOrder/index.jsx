import { Typography, Button, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CallApiGetOneOrderHistory,
  CallApiGetOrderHistory,
} from "./../../redux/reducers/userReducer";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { BaseApi } from "../../services/baseServices";
import { API_URL_DOMAIN } from "../../utils/constant";

const HistoryOrder = () => {
  const { t } = useTranslation("order");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [listOrder, setListOrder] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // const orderHistory = useSelector((state) => state.UserReducer.orderHistory);

  useEffect(() => {
    const getListOrderHistory = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/ticket/user");
        setOrderHistory(result.data);
        setListOrder(result.data.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };
    getListOrderHistory();
  }, []);

  const handleCreateRating = async (idTicket) => {
    await dispatch(CallApiGetOneOrderHistory(idTicket));
    navigate(`/danh-gia/${idTicket}`);
  };
  // useEffect(() => {
  // dispatch(CallApiGetOrderHistory());
  //   setListOrder(orderHistory.slice(0, 10));
  // }, []);
  const handleChangeSliceListOrderHistory = (e) => {
    setCurrent(e);
    setListOrder(orderHistory.slice(10 * (e - 1), e * 10));
  };
  // console.log(listOrder);
  return (
    <div className="history">
      <Typography.Title level={5} className="history__title">
        {t("order.Booking history")}
      </Typography.Title>
      {listOrder?.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>{t("order.Code")}</th>
                {/* <th>SL</th> */}
                <th>{t("order.Route")}</th>
                <th>{t("order.Departure day")}</th>
                <th>{t("order.Time")}</th>
                <th>{t("order.Price")}</th>
                <th>{t("order.Status")}</th>
                <th>{t("order.Operation")}</th>
              </tr>
            </thead>
            <tbody>
              {listOrder.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {/* <td>{item.totalMoney / item.schedule.price}</td> */}
                    <td>{`${item.schedule.departureAddress.city} - ${item.schedule.destinationAddress.city}`}</td>
                    {/* <td>{Date(item.startTime).slice(16, 21)}</td> */}
                    <td>
                      {moment(item.schedule.startDay).format("DD/MM/YYYY")}
                    </td>
                    <td>{item.schedule.startTime}</td>
                    <td>
                      {item.totalMoney.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>{item.status}</td>

                    <td>
                      <Button onClick={() => handleCreateRating(item.id)}>
                        {/* {item.status === "completed"
                          ? t("order.Evaluate")
                          : t("order.See details")} */}
                        {t("order.See details")}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination-order">
            {orderHistory.length > 0 ? (
              <Pagination
                current={current}
                total={orderHistory.length}
                onChange={handleChangeSliceListOrderHistory}
              />
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>
        </>
      ) : (
        <p>{t("order.NoItem")}</p>
      )}
    </div>
  );
};

export default HistoryOrder;
