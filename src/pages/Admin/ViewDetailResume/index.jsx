import React from "react";
import { Typography, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetListResumesAction,
  UpdateResumeAction,
} from "./../../../redux/reducers/admin/manageCareerReducer";
import "./style.scss";
import moment from "moment";

const ViewDetailResume = () => {
  const cvDetail = useSelector(
    (state) => state.ManageCareerReducer.resumeDetail
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDisableResume = () => {
    dispatch(UpdateResumeAction(cvDetail.id, { status: "Rejected" }));
  };

  const handleApproveResume = () => {
    dispatch(UpdateResumeAction(cvDetail.id, { status: "Approved" }));
  };

  return (
    <div className="cv-detail">
      <Typography.Title level={5} className="car-detail__title">
        Hồ Sơ Chi Tiết
      </Typography.Title>
      <div className="cv-detail__data">
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Họ tên ứng viên:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.fullName}
            />
          </div>
          <div className="cv-detail__data__item">
            <p>Giới tính:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.gender}
            />
          </div>
        </div>
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Thẻ CMND/CCCD:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.idCard}
            />
          </div>
          <div className="cv-detail__data__item">
            <p>Ngày sinh:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={moment(cvDetail.dateOfBirth).utc().format("DD/MM/YYYY")}
            />
          </div>
        </div>
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Số điện thoại liên lạc:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.phoneNumber}
            />
          </div>
          <div className="cv-detail__data__item">
            <p>Trình độ học vấn:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.education}
            />
          </div>
        </div>
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Địa chỉ liên lạc:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.address}
            />
          </div>
          <div className="cv-detail__data__item">
            <p>Email:</p>
            <Input style={{ color: "black" }} disabled value={cvDetail.email} />
          </div>
        </div>
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Trạng thái:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.status}
            />
          </div>
          <div className="cv-detail__data__item">
            <p>Giới thiệu:</p>
            <Input
              style={{ color: "black" }}
              disabled
              value={cvDetail.introduce}
            />
          </div>
        </div>
        <div className="cv-detail__data__row">
          <div className="cv-detail__data__item">
            <p>Ngày nộp:</p>
            <Input
              disabled
              style={{ color: "black" }}
              value={moment(cvDetail.created_at).utc().format("DD/MM/YYYY")}
            />
          </div>
        </div>
      </div>
      <div className="cv-detail__bottom">
        <Button
          className="view-detail-address__bottom--back"
          onClick={() => {
            navigate("/admin/manage-resume");
            dispatch(GetListResumesAction());
          }}
        >
          Quay lại
        </Button>
        <div className="view-detail-address__group">
          {cvDetail.status === "New" && (
            <>
              <Button
                className="view-detail-address__bottom--disabled"
                onClick={handleDisableResume}
                style={{ width: "120px" }}
              >
                Từ chối
              </Button>
              <Button
                className="view-detail-address__bottom--update"
                onClick={handleApproveResume}
                style={{ width: "120px" }}
              >
                Chấp nhận
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailResume;
