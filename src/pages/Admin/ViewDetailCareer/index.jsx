import React, { useEffect, useState } from "react";
import { Typography, Input, Select, Button, DatePicker, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateUserAction } from "../../../redux/reducers/admin/manageCareerReducer";
import dayjs from "dayjs";

import moment from "moment";
import { useForm } from "antd/es/form/Form";

const ViewDetailCareer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = useForm();
  const careerDetail = useSelector(
    (state) => state.ManageCareerReducer.careerDetail
  );
  const [careerDetailClone, setCareerDetailClone] = useState({
    name: careerDetail.name,
    quantity: careerDetail.quantity,
    formality: careerDetail.formality,
    salary: careerDetail.salary,
    workspace: careerDetail.workspace,
    deadline: careerDetail.deadline,
    welfare: careerDetail.welfare,
    description: careerDetail.description,
    requirement: careerDetail.requirement,
    contact: careerDetail.contact,
    include: careerDetail.include,
    isActive: careerDetail.isActive,
  });
  const [levelCareer, setLevelCareer] = useState(careerDetail.level);
  const [deadlineCareer, setDeadlineCareer] = useState(careerDetail.deadline);
  const [expCareer, setExpCareer] = useState(careerDetail.experience);
  const [formallity, setFormality] = useState(careerDetail.formality);
  const handleChangeValue = (event) => {
    const name = event.target.name;
    setCareerDetailClone((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  useEffect(() => {
    form.setFieldsValue(careerDetail);
  }, [careerDetail]);

  const handleDisabledCareer = () => {
    const newData = {
      isActive: false,
    };
    dispatch(UpdateUserAction(careerDetail.id, newData));
  };
  const handleUpdateCareer = () => {
    const newData = {
      name: careerDetailClone.name,
      level: levelCareer,
      quantity: careerDetailClone.quantity,
      formality: formallity,
      experience: expCareer,
      salary: careerDetailClone.salary,
      workspace: careerDetailClone.workspace,
      deadline: deadlineCareer,
      welfare: careerDetailClone.welfare,
      description: careerDetailClone.description,
      requirement: careerDetailClone.requirement,
      contact: careerDetailClone.contact,
      include: careerDetailClone.include,
      isActive: true,
    };
    // console.log(careerDetail.id, newData);
    dispatch(UpdateUserAction(careerDetail.id, newData));
  };
  // console.log(careerDetailClone);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  };
  return (
    <div>
      <Typography.Title level={5} className="car-detail__title">
        Xem Chi Tiết Tuyển Dụng
      </Typography.Title>
      <Form form={form} onFinish={handleUpdateCareer}>
        <div className="car-detail__data">
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Vị trí tuyển dụng:</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập vị trí tuyển dụng",
                  },
                ]}
              >
                <Input
                  name="name"
                  // value={careerDetailClone.name}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Lương:</p>
              <Form.Item
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lương!",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Phải là số!",
                  },
                ]}
              >
                <Input
                  name="salary"
                  // value={careerDetailClone.salary}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Cấp bậc:</p>
              <Select
                defaultValue={levelCareer}
                className="router-confirm__top--selected"
                onChange={(value) => setLevelCareer(value)}
                options={[
                  { value: "Nhân viên", label: "Nhân viên" },
                  {
                    value: "Trưởng phòng/ Giám sát",
                    label: "Trưởng phòng/ Giám sát",
                  },
                  { value: "Quản lý", label: "Quản lý" },
                  { value: "Phó giám đốc", label: "Phó giám đốc" },
                  { value: "Giám đốc", label: "Giám đốc" },
                  { value: "Phó tổng giám đốc", label: "Phó tổng giám đốc" },
                  { value: "Tổng giám đốc", label: "Tổng giám đốc" },
                  { value: "Chuyên viên", label: "Chuyên viên" },
                ]}
                style={{ width: "100%" }}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Nơi làm việc:</p>
              <Form.Item
                name="workspace"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nơi làm việc!",
                  },
                ]}
              >
                <Input
                  name="workspace"
                  // value={careerDetailClone.workspace}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Số lượng tuyển:</p>
              <Form.Item
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng tuyển!",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Phải là số!",
                  },
                ]}
              >
                <Input
                  name="quantity"
                  // value={careerDetailClone.quantity}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Hạn nộp:</p>
              <DatePicker
                style={{ width: "100%" }}
                // defaultValue={moment(careerDetailClone.deadline).format(
                //   "DD/MM/YYYY"
                // )}
                defaultValue={dayjs(careerDetailClone.deadline, "YYYY/MM/DD")}
                // value={moment(careerDetailClone.deadline).format("DD/MM/YYYY")}
                onChange={(d, dateString) => {
                  setDeadlineCareer(new Date(dateString).toISOString());
                }}
                disabledDate={disabledDate}
              />
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Hình thức:</p>
              <Select
                defaultValue={formallity}
                className="router-confirm__top--selected"
                onChange={(value) => setFormality(value)}
                options={[
                  {
                    value: "Nhân viên chính thức",
                    label: "Nhân viên chính thức",
                  },
                  {
                    value: "Nhân viên thời vụ",
                    label: "Nhân viên thời vụ",
                  },
                  {
                    value: "Nhân viên bán thời gian",
                    label: "Nhân viên bán thời gian",
                  },
                ]}
                style={{ width: "100%" }}
              />
              {/* <Input
              name="formality"
              value={careerDetailClone.formality}
              onChange={handleChangeValue}
            /> */}
            </div>
            <div className="car-detail__data__item">
              <p>Phúc lợi:</p>
              <Form.Item
                name="welfare"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập phúc lợi!",
                  },
                ]}
              >
                <Input
                  name="nameDiver"
                  // value={careerDetailClone.welfare}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Kinh nghiệm:</p>
              <Select
                defaultValue={expCareer}
                className="router-confirm__top--selected"
                onChange={(value) => setExpCareer(value)}
                options={[
                  {
                    value: "Chưa có kinh nghiệm",
                    label: "Chưa có kinh nghiệm",
                  },
                  { value: "0 - 1 năm", label: "0 - 1 năm" },
                  { value: "1- 2 năm", label: "1- 2 năm" },
                  { value: "2 -3 năm", label: "2 -3 năm" },
                  { value: "3- 4 năm", label: "3- 4 năm" },
                  {
                    value: "Trên 5 năm kinh nghiệm",
                    label: "Trên 5 năm kinh nghiệm",
                  },
                  {
                    value: "Trên 10 năm kinh nghiệm",
                    label: "Trên 10 năm kinh nghiệm",
                  },
                ]}
                style={{ width: "100%" }}
              />
            </div>
            <div className="car-detail__data__item">
              <p>Mô tả công việc:</p>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả công việc!",
                  },
                ]}
              >
                <Input
                  name="description"
                  // value={careerDetailClone.description}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Yêu cầu:</p>
              <Form.Item
                name="requirement"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập yêu cầu!",
                  },
                ]}
              >
                <Input
                  name="requirement"
                  // value={careerDetailClone.requirement}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Liên hệ:</p>
              <Form.Item
                name="contact"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin liên hệ!",
                  },
                ]}
              >
                <Input
                  name="contact"
                  // value={careerDetailClone.contact}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Hồ sơ bao gồm:</p>

              <Form.Item
                name="include"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin hồ sơ!",
                  },
                ]}
              >
                <Input
                  name="include"
                  // value={careerDetailClone.include}
                  onChange={handleChangeValue}
                />
              </Form.Item>
            </div>
            <div className="car-detail__data__item">
              <p>Ngày tạo:</p>
              <Input
                disabled
                name="created_at"
                value={Date(careerDetailClone.created_at).slice(0, 15)}
              />
            </div>
          </div>
          <div className="car-detail__data__row">
            <div className="car-detail__data__item">
              <p>Ngày cập nhật:</p>
              <Input
                disabled
                name="updated_at"
                value={Date(careerDetailClone.updated_at).slice(0, 15)}
              />
            </div>
          </div>
        </div>
        <div className="car-detail__function">
          <Button
            className="car-detail__function--back"
            onClick={() => navigate("/admin/manage-hire")}
          >
            Quay lại
          </Button>
          <div
            className="car-detail__group"
            style={
              careerDetailClone.isActive
                ? { gridTemplateColumns: "repeat(2,1fr)" }
                : { gridTemplateColumns: "none" }
            }
          >
            {careerDetailClone.isActive && (
              <Button
                className="car-detail__group--disabled"
                onClick={handleDisabledCareer}
              >
                Vô hiệu hóa
              </Button>
            )}
            <Button
              className="car-detail__group--update"
              // onClick={handleUpdateCareer}
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ViewDetailCareer;
