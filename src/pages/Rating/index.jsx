import React, { useEffect, useState } from "react";
import { Typography, Input, Button } from "antd";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CallApiCreateContentRating,
  CallApiGetOneOrderHistoryByTicketId,
} from "../../redux/reducers/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import { BaseApi } from "../../services/baseServices";
import { API_URL_DOMAIN } from "../../utils/constant";
import { openNotificationWithIcon } from "../../components/notification";
import moment from "moment";
import { useTranslation } from "react-i18next";
// import { CancelOneTicketAction } from "../../redux/reducers/admin/manageTicketReducer";

const { TextArea } = Input;

const Rating = () => {
  const { t } = useTranslation("order");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const oneOrderHistory = useSelector(
    (state) => state.UserReducer.oneOrderHistory
  );
  // const rate = useSelector(
  //   (state) => state.UserReducer.oneOrderHistoryByTicketId
  // );
  const [content, setContent] = useState("");
  const [rate, setRate] = useState({});

  const onChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const getRateById = async () => {
      try {
        const result = await BaseApi.get(
          API_URL_DOMAIN + `/rate/ticket/${param.id}`
        );
        setRate(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRateById();
  }, []);
  const handleCreateRating = () => {
    const data = {
      content: content,
    };
    dispatch(CallApiCreateContentRating(data, oneOrderHistory.id));
  };
  useEffect(() => {
    dispatch(CallApiGetOneOrderHistoryByTicketId(oneOrderHistory.id));
  }, []);
  const compareDate = () => {
    var date1 = new Date();
    var date2 = new Date(
      moment(oneOrderHistory.schedule.startDay).format("YYYY-MM-DD")
    );

    var diffInMilliseconds = Math.abs(date2 - date1);

    var diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const handleDisableTicket = async () => {
    if (compareDate() > 1) {
      try {
        await BaseApi.patch(API_URL_DOMAIN + `/ticket/${param.id}`);
        openNotificationWithIcon(
          `success`,
          `Huỷ vé thành công, vui lòng gọi vào 19001080 để nhận lại tiền !`
        );
        navigate("/lich-su-dat-ve");
      } catch (error) {
        console.log(error);
      }
    } else {
      openNotificationWithIcon(
        `error`,
        `Vé chỉ được huỷ trước ngày khởi hành 24 giờ !`
      );
    }
  };
  return (
    <div className="rating">
      <Typography.Title level={4} className="rating__title">
        {t("rate.Ticket Information")}
      </Typography.Title>
      {/* <p className="rating__top">Thông tin khách hàng</p> */}
      <div className="rating__body">
        <div className="rating__body__header">
          <div className="rating__body__header--item">
            <Typography.Title level={5}>{t("rate.FullName")}</Typography.Title>
            <p>{oneOrderHistory.fullname}</p>
          </div>
          <div className="rating__body__header--item">
            <Typography.Title level={5}>{t("rate.Phone")}</Typography.Title>
            <p>{oneOrderHistory.phoneNumber}</p>
          </div>
          <div className="rating__body__header--item">
            <Typography.Title level={5}>Email:</Typography.Title>
            <p>{oneOrderHistory.email}</p>
          </div>
          <div className="rating__body__header--item">
            <Typography.Title level={5}>{t("rate.Total")}</Typography.Title>
            <p>
              {oneOrderHistory.totalMoney.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="rating__body__header--item">
            <Typography.Title level={5}>{t("rate.CarName")}</Typography.Title>
            <p>{oneOrderHistory.seat?.car?.name}</p>
          </div>
          <div className="rating__body__header--item">
            <Typography.Title level={5}>{t("rate.ChairName")}</Typography.Title>
            <p>{oneOrderHistory.seat.name}</p>
          </div>
          {rate ? (
            <div className="rating__body__header--item">
              <Typography.Title level={5}>
                {t("rate.Evaluate")}
              </Typography.Title>
              <p>{rate.content}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        {oneOrderHistory.status === "waiting" && (
          <div className="rating__body__header--btn-cancell">
            <Button onClick={handleDisableTicket}>{t("rate.Cancel")}</Button>
          </div>
        )}

        {oneOrderHistory.status === "completed" ? (
          rate ? (
            <div className="rating__body__center">
              <p>{t("rate.SUCCESSFUL PAYMENT")}</p>
            </div>
          ) : (
            <>
              <div className="rating__body__center">
                <p>{t("rate.SUCCESSFUL PAYMENT")}</p>
              </div>

              <div className="rating__body__bottom">
                <p>{t("rate.Observe")}</p>
                <TextArea
                  rows={6}
                  placeholder={t("rate.Write a review")}
                  allowClear
                  onChange={onChange}
                />
                <Button onClick={handleCreateRating}>
                  {t("rate.Evaluate")}
                </Button>
              </div>
            </>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Rating;
