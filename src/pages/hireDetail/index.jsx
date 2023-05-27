/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Typography,
  Modal,
  Input,
  DatePicker,
  Select,
  Form,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CallApiGetDetailCareer } from "../../redux/reducers/careerReducer";
import "./style.scss";
import dayjs from "dayjs";
import { CallApiApplyCVForCareer } from "./../../redux/reducers/careerReducer";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { regVietNameseNotNumber } from "../../utils/regExp";

const HireDetail = () => {
  const token = sessionStorage.getItem("token");
  const { t } = useTranslation(["recruitment", "validate"]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const customFormat = (value) => `${value.format("DD/MM/YYYY")}`;
  const [resume, setResume] = useState({
    fullName: "",
    gender: "",
    idCard: "",
    dateOfBirth: "",
    phoneNumber: "",
    education: "",
    address: "",
    email: "",
    introduce: "",
  });

  useEffect(() => {
    dispatch(CallApiGetDetailCareer(params.id));
  }, []);

  const careerDetail = useSelector((state) => state.CareerReducer.careerDetail);
  // console.log(careerDetail.id);
  // console.log(resume);
  const userProfile = useSelector((state) => state.UserReducer.userProfile);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (token) {
      dispatch(CallApiApplyCVForCareer(resume, careerDetail.id));
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    } else {
      setShow(true);
    }
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };
  // console.log(resume);
  return (
    <div className="hire-detail">
      <Image
        preview={false}
        className="hire__banner"
        src="https://vieclam.futabus.vn/Images/tuyendung_pn4_20190820.jpg"
        alt=""
      />
      <div className="hire-detail__body">
        <div className="hire-detail__body__top">
          <Typography.Title level={3}>{careerDetail.name}</Typography.Title>
          <Button onClick={showModal}>{t("viewDetail.Nộp hồ sơ nhanh")}</Button>
        </div>
        <div className="hire-detail__body__center">
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("viewDetail.Nơi làm việc")}
            </Typography.Title>
            <p>{careerDetail.workspace}</p>
          </div>
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("recruitment.Cấp bậc")}
            </Typography.Title>
            <p>{careerDetail.level}</p>
          </div>
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("viewDetail.Số lượng")}
            </Typography.Title>
            <p>{careerDetail.quantity}</p>
          </div>
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("recruitment.Hình thức")}
            </Typography.Title>
            <p>{careerDetail.formality}</p>
          </div>
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("viewDetail.Kinh nghiệm")}
            </Typography.Title>
            <p>{careerDetail.experience}</p>
          </div>
          <div className="hire-detail__body__center--item">
            <Typography.Title level={5}>
              {t("viewDetail.Mức lương")}
            </Typography.Title>
            <p>{careerDetail.salary}đ</p>
          </div>
        </div>
        <div className="hire-detail__body__bottom">
          <Typography.Title level={5}>
            {t("viewDetail.Mô tả công việc")}
          </Typography.Title>
          <p>{careerDetail.description}</p>
          <Typography.Title level={5}>
            {t("viewDetail.Yêu cầu")}
          </Typography.Title>
          <p>{careerDetail.requirement}</p>
          <Typography.Title level={5}>
            {t("viewDetail.Danh sách hồ sơ xin việc")}
          </Typography.Title>
          <p>{careerDetail.include}</p>
        </div>
      </div>
      <Modal
        title={t("validate.title")}
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <div className="hire-detail__modal">
            <div className="hire-detail__modal__row">
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.name")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Please input your name!", {
                        ns: "validate",
                      }),
                    },
                    {
                      pattern: new RegExp(regVietNameseNotNumber),
                      message: t(
                        "validate.Không được chứa chữ số và ký tự đặc biệt",
                        { ns: "validate" }
                      ),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("placeHolder.name")}
                    name="fullName"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.gender")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Vui lòng chọn giới tính", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <Select
                    name="gender"
                    placeholder={t("placeHolder.gender")}
                    style={{
                      width: "100%",
                    }}
                    onChange={(event) =>
                      setResume((prev) => ({
                        ...prev,
                        gender: event,
                      }))
                    }
                    options={[
                      { value: "Nam", label: t("gender.Nam") },
                      { value: "Nữ", label: t("gender.Nữ") },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="hire-detail__modal__row">
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.idCard")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="idCard"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Please input your Id Card!", {
                        ns: "validate",
                      }),
                    },
                    {
                      pattern: new RegExp(/^\d+$/),
                      message: t("validate.Chỉ chứa chữ số!", {
                        ns: "validate",
                      }),
                    },
                    // {
                    //   len: 12,
                    //   message: t("validate.Không đúng định dạng!", {
                    //     ns: "validate",
                    //   }),
                    // },
                  ]}
                >
                  <Input
                    placeholder={t("placeHolder.idCard")}
                    name="idCard"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        idCard: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.birthDay")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="dateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Vui lòng chọn ngày sinh", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <DatePicker
                    name="dateOfBirth"
                    style={{ width: "100%" }}
                    placeholder={t("placeHolder.birthDay")}
                    // defaultValue={dayjs("2023/04/29", "YYYY/MM/DD")}
                    format={customFormat}
                    onChange={(d, dateString) =>
                      setResume((prev) => ({
                        ...prev,
                        dateOfBirth: moment(dateString).format("YYYY-MM-DD"),
                      }))
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className="hire-detail__modal__row">
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.phone")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Please input your phone number!", {
                        ns: "validate",
                      }),
                    },
                    {
                      pattern: new RegExp(/^0\d{9}$/),
                      message: t("validate.Số điện thoại phải có 10 số!", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("placeHolder.phone")}
                    name="phoneNumber"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.education")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="education"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Vui lòng chọn học vấn!", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <Select
                    name="education"
                    placeholder={t("placeHolder.education")}
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) =>
                      setResume((prev) => ({
                        ...prev,
                        education: value,
                      }))
                    }
                    options={[
                      { value: "Đại học", label: t("apply.Đại học") },
                      { value: "Cao đẳng", label: t("apply.Cao đẳng") },
                      { value: "Trung cấp", label: t("apply.Trung cấp") },
                      { value: "THPT", label: t("apply.THPT") },
                      { value: "THCS", label: t("apply.THCS") },
                      { value: "Tiểu học", label: t("apply.Tiểu học") },
                      { value: "Tiến sĩ", label: t("apply.Tiến sĩ") },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="hire-detail__modal__row">
              <div className="hire-detail__modal__row--item">
                <p>
                  {t("validate.address")}
                  <span>(*)</span>
                </p>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Vui lòng nhập địa chỉ!", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("placeHolder.address")}
                    name="address"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
              <div className="hire-detail__modal__row--item">
                <p>
                  Email:<span>(*)</span>
                </p>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("validate.Please input your email!", {
                        ns: "validate",
                      }),
                    },
                    {
                      type: "email",
                      message: t("validate.Sai định dạng email", {
                        ns: "validate",
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("placeHolder.email")}
                    name="email"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className="hire-detail__modal__row--item">
              <p>{t("validate.introduce")}</p>
              <Form.Item
                name="introduce"
                rules={[
                  {
                    required: true,
                    message: t(
                      "validate.Vui lòng giới thiệu về bản thân bạn!",
                      { ns: "validate" }
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={t("placeHolder.introduce")}
                  name="introduce"
                  onChange={(e) =>
                    setResume((prev) => ({
                      ...prev,
                      introduce: e.target.value,
                    }))
                  }
                />
              </Form.Item>
            </div>
            <div className="hire-detail__modal__btn">
              <Button key="back" onClick={handleCancel}>
                {t("validate.cancel")}
              </Button>
              <Button htmlType="submit" type="primary">
                {t("validate.apply")}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        open={show}
        onOk={() => navigate("/login")}
        onCancel={() => setShow(false)}
        footer={[
          <Button key="back" onClick={() => setShow(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>,
        ]}
      >
        <Typography.Paragraph>
          Bạn chưa đăng nhập! Vui lòng đăng nhập
        </Typography.Paragraph>
      </Modal>
    </div>
  );
};

export default HireDetail;
