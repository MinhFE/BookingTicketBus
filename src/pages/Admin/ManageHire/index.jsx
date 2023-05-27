/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
  Pagination,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetListCareersAction } from "./../../../redux/reducers/admin/manageCareerReducer";
import "./style.scss";
import dayjs from "dayjs";
import {
  CreateNewCareerAction,
  GetDetailCareerAction,
} from "./../../../redux/reducers/admin/manageCareerReducer";
import moment from "moment";
import { hire } from "../../../utils/menuData";

const ManageHire = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetListCareersAction());
  }, [loading]);

  const listCareers = useSelector(
    (state) => state.ManageCareerReducer.listCareers
  );
  // useEffect(() => {
  //   dispatch(GetListCareersAction());
  // }, [listCareers]);
  const [listCareerClone, setListCareerClone] = useState([]);
  useEffect(() => {
    setListCareerClone(listCareers.slice(0, 10));
  }, [listCareers]);

  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);
  const [careerCreate, setCareerCreate] = useState({
    name: "",
    quantity: "",
    salary: "",
    workspace: "",
    welfare: "",
    description: "",
    requirement: "",
    contact: "",
    include: "",
  });
  const [levelCareer, setLevelCareer] = useState("");
  const [formalityCareer, setFormalityCareer] = useState("");
  const [experienceCareer, setExperienceCareer] = useState("");
  const [deadlineCareer, setDeadlineCareer] = useState("");
  const [nameWork, setNameWork] = useState("");
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setCareerCreate((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleViewDetailCareer = (careerId) => {
    dispatch(GetDetailCareerAction(careerId));
  };

  const handleOk = () => {
    const newDataCreate = {
      name: nameWork,
      level: levelCareer,
      quantity: careerCreate.quantity,
      formality: formalityCareer,
      experience: experienceCareer,
      salary: careerCreate.salary,
      workspace: careerCreate.workspace,
      deadline: deadlineCareer,
      welfare: careerCreate.welfare,
      description: careerCreate.description,
      requirement: careerCreate.description,
      contact: careerCreate.contact,
      include: careerCreate.include,
    };
    dispatch(CreateNewCareerAction(newDataCreate));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListCareerClone(listCareers.slice(10 * (e - 1), e * 10));
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  };
  return (
    <div className="manage-hire">
      <div className="manage-hire__top">
        <Button className="manage-hire__top--add" onClick={showModal}>
          Tạo tuyển dụng<i className="fas fa-plus"></i>
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vị trí tuyển dụng</th>
            <th>Nơi làm việc</th>
            <th>Hạn nộp</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listCareerClone.length > 0 &&
            listCareerClone.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={
                    item.isActive
                      ? { background: "#22cc22", color: "white" }
                      : { background: "red", color: "white" }
                  }
                >
                  <td>{item.name}</td>
                  <td>{item.workspace}</td>
                  <td>{moment(item.deadline).utc().format("DD/MM/YYYY")}</td>
                  <td>{item.isActive ? "Đang mở" : "Đã đóng"}</td>
                  <td>
                    <Button onClick={() => handleViewDetailCareer(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="bus-info__pagination">
        {listCareers.length > 0 ? (
          <Pagination
            current={current}
            total={listCareers.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>

      <Modal
        open={open}
        title="Thêm mới tuyển dụng"
        // onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Hủy
        //   </Button>,
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Thêm tuyển dụng mới
        //   </Button>,
        // ]}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <div className="manage-car__modal">
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
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
                  {/* <Input
                    placeholder="Nhập vị trí tuyển dụng"
                    name="name"
                    value={careerCreate.name}
                    onChange={handleChangeValueModal}
                  /> */}
                  <Select
                    showSearch
                    className="router-confirm__top--selected"
                    onChange={(value) => {
                      setNameWork(value);
                    }}
                    // placeholder={`--${t("recruitment.Chọn công việc")}--`}
                    // filterOption={(input, option) =>
                    //   (option?.label ?? "").includes(input)
                    // }
                    options={hire.nameWork}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập lương"
                    name="salary"
                    value={careerCreate.salary}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Cấp bậc:</p>
                <Form.Item
                  name="level"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn cấp bậc!",
                    },
                  ]}
                >
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
                      {
                        value: "Phó tổng giám đốc",
                        label: "Phó tổng giám đốc",
                      },
                      { value: "Tổng giám đốc", label: "Tổng giám đốc" },
                      { value: "Chuyên viên", label: "Chuyên viên" },
                    ]}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập nơi làm việc"
                    name="workspace"
                    value={careerCreate.workspace}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập số lượng tuyển"
                    name="quantity"
                    value={careerCreate.quantity}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Hạn nộp:</p>
                <Form.Item
                  name="deadlineCareer"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hạn nộp!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    // defaultValue={dayjs("2023/05/03", "YYYY/MM/DD")}
                    onChange={(d, dateString) => {
                      setDeadlineCareer(new Date(dateString).toISOString());
                    }}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Hình thức:</p>
                <Form.Item
                  name="formality"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hình thức!",
                    },
                  ]}
                >
                  <Select
                    defaultValue={formalityCareer}
                    className="router-confirm__top--selected"
                    onChange={(value) => setFormalityCareer(value)}
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
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập phúc lợi"
                    name="welfare"
                    value={careerCreate.welfare}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Kinh nghiệm:</p>
                <Form.Item
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn kinh nghiệm!",
                    },
                  ]}
                >
                  <Select
                    defaultValue={experienceCareer}
                    className="router-confirm__top--selected"
                    onChange={(value) => setExperienceCareer(value)}
                    options={[
                      {
                        value: "Chưa có kinh nghiệm",
                        label: "Chưa có kinh nghiệm",
                      },
                      { value: "0 - 1 năm", label: "0 - 1 năm" },
                      { value: "1 - 2 năm", label: "1 - 2 năm" },
                      { value: "2 - 3 năm", label: "2 - 3 năm" },
                      { value: "3 - 4 năm", label: "3 - 4 năm" },
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
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập mô tả công việc"
                    name="description"
                    value={careerCreate.description}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập yêu cầu"
                    name="requirement"
                    value={careerCreate.requirement}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập thông tin liên hệ"
                    name="contact"
                    value={careerCreate.contact}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
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
                    placeholder="Nhập thông tin hồ sơ"
                    name="include"
                    value={careerCreate.include}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="manage-hire__modal__btn">
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Thêm tuyển dụng mới
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageHire;
