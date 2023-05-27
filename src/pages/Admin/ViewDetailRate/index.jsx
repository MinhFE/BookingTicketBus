import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
// import { Typography } from "antd";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import moment from "moment";

const ViewDetailRate = () => {
  const param = useParams();
  const [listRate, setListRate] = useState([]);

  useEffect(() => {
    const getListRate = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + `/rate/${param.id}`);
        setListRate(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListRate();
  }, []);
  return (
    <div className="detail-rate">
      <div className="detail-rate-top">
        <p>
          <Link to={`/admin/manage-info-bus/${param.id}`}>
            <i className="fas fa-solid fa-chevron-left"></i>
            Quay lại
          </Link>
        </p>
      </div>
      <div className="detail-rate-list">
        {listRate.length > 0 ? (
          listRate.map((item) => (
            <div className="detail-rate-list-item">
              <p className="detail-rate-list-item-name">
                {`${item.user.name} - ${item.user.phoneNumber}`}
              </p>
              <p className="detail-rate-list-item-content">{item.content}</p>
              <p className="detail-rate-list-item-time">
                {moment(item.create_at).format("DD/MM/YYYY")}
              </p>
            </div>
          ))
        ) : (
          <p>Không có đánh giá</p>
        )}
      </div>
    </div>
  );
};

export default ViewDetailRate;
