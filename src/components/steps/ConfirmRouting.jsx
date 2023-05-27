/* eslint-disable jsx-a11y/alt-text */
import { Button, Typography } from "antd";
import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ConfirmRouting = (props) => {
  const { booked, setCurrent, handleContinueConfirmRouteStep } = props;
  const { t } = useTranslation("schedule");
  const scheduleById = useSelector(
    (state) => state.ScheduleReducer.scheduleById
  );

  return (
    <div className="confirm-route">
      <div className="confirm-route__top">
        <Typography.Title level={4}>
          {t("pay.XÁC NHẬN LỘ TRÌNH ĐI")}
        </Typography.Title>
        <p className="confirm-route__top--price">
          {scheduleById.price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <div className="confirm-route__top--group">
          <p>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAn1BMVEUAAAAAAAAAgAAAVVUAbUkAYEAAYkUAYkMAYjwAYD4AYTwAYD0AYT4AYTwAYT0AYT0AYT0AYT0AYT0AYT0AYDwAYT0AYT0AYT0AYD0AYT3////+/v79/f39/fzv8/HV4dzL29WTr6I0d1orakwfZUQWY0IPY0APYT4HYj8MXzwGYT4DYT0AYjwAYT0AYTwAYD0AYDwAXTYAXDAAWS0ASwCRAZr+AAAAGnRSTlMAAQIDBxgaIi9Se5eZwsja4Orx9/r7/P39/ifZSUoAAAFmSURBVHjahVMJjoMwDHS37fY+odBAuQrlTmKO/79tTUBVVWmVERLKzCSxHRtGzOYAy83+eDGMy3G/WQLMZ/CBH4DV7iRwgjjtVgP5xhwW2yvi3WKMc8asO+J1uyD6vf/3wPFmC8klgUth35AffkmY9q/P0mTIJcoJHJkpz2uSxv1nNDnpH6CliWd1xgwWBznq3w55WJA8hy0nfSKrsqwmMxK9JRlWV2QDxTnmSdY0WZIjH9ZEXylb2OFt0tOib+O47Yt0dJCwA1ie0Obq/FdXR6Hvh1HdvVBRNp6WsBF3ofS0ewaOQvDsUuUgaQN7tIb8MS/qwPEervvwnKAuchW2hXs4IlPHJX3keK7j0uc5UZ8okuERLsgkocra0Hk4LoF+YZtVRCLDCxhj1mUT+0pWFj9uyrEyhtagv4KCFP8FKShIbZraQmlLrX0s7XNrG0bbcrqm1bX99+AIsqD4GBz96OmHVzv+f2mSel1r7cqaAAAAAElFTkSuQmCC" />
            {Date(scheduleById.startTime).slice(15, 21)} -{" "}
            {scheduleById.departureAddress.name}
          </p>
          <span className="confirm-route__top--distance">
            {t("pay.Khoảng cách")}: {scheduleById.distance}
          </span>
          <p>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAMAAACS/WnbAAAA51BMVEUAAAD/AAD/ZjPmTRrvUCDwWh7yTSbzUSP2VSbwUiXwUCT4VSPxUyLyUSLwVSPxVSbyVSTtUSTzUiHuVCPvVSPxUyPxVCPxUyPvUyPwUyLwUyPxUyPwUyPwUiLxUiLvUyPwUiLwVCLvVCLwUyLvUyLvUiLwUyPwUiLvUyPvUyLwUiPwUyLvUiLvUiLwUiLvUyLwUiLvUiPxUyLwUiLwUyLvUiLwUiLvUyLvUyLwUyLvUiLwUiPvUiPvUiL////++ff83tX71sv1knTxZjzwXC70VCPyUyLxUyLwUiLvUiLvUSHvTx/vTh3N/rktAAAAPnRSTlMAAQUKEBEUFhsiIyQlJjM2OTk+SWBsbW5ueHuEhIiPk56rrra8xcfJ1dXW2Nna3OHi5efo6u3v9Pb5+vv7/K+Q08cAAAFUSURBVHjafdPllsIwEAXgu8YKrOHu7u5umQHe/3kWerophabfz9w5k2RyAunxwxPPlobDUjbu+XjEne9shwQRM5GgTvYbZp+pHZvsUp+44m0JviFaXki+CVuY+KDzT9nS1A+Ne8AKAzcuKsQKVMFZWLCSCAOOKhsOx9PpeGBD1YHfsRFv16vFYrXeGiXjX0SFzDfLuWa5kRUiijyxbqvlWsWWdZRHWzZYz6W1bNHGiHXH1VxaHVk3Qp91p8VcWpxY10eF7AqogjTZbUFpBPd2h9wH8TO2u+b4B46a3aBqDiBJ6lFTEoBrpn6smQtnCcEKIoGL9y4rdN+hiQlFgxh0RWILVMS/rx5b6H1BCrCFAAwPkfufFXnAlZccsQnlXmDyWiZTXn7FDVedWKK6C3ecDZJ5wwkLzqpgjag6YemtILS88AaF54wgEplnKD2Fms3Qk2npDzuS7aPkEDnLAAAAAElFTkSuQmCC" />
            {Date(scheduleById.endTime).slice(15, 21)} -{" "}
            {scheduleById.destinationAddress.name}
          </p>
        </div>
      </div>
      <div className="confirm-route__group">
        <div className="confirm-route__bottom">
          <p>{t("pay.Danh sách ghế đã chọn")}:</p>
          <div className="confirm-route__bottom__list">
            {booked.length > 0 &&
              booked.map((item) => {
                return <p key={item.id}>{item.name}</p>;
              })}
          </div>
        </div>
        <div>
          <Button
            className="confirm-route__group--back"
            onClick={() => setCurrent(0)}
          >
            {t("pay.Quay lại")}
          </Button>
          <Button
            className="confirm-route__group--continue"
            onClick={handleContinueConfirmRouteStep}
          >
            {t("pay.Tiếp tục")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRouting;
