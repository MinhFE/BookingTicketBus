import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Pagination, Form } from "antd";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  GetListAddressAction,
  CreateNewAddressAction,
} from "../../../redux/reducers/admin/manageAddressReducer";
// import { GetOneAddressDetailAction } from "./../../../redux/reducers/admin/manageAddressReducer";
import { useNavigate } from "react-router-dom";
import { regVietNameseNotNumber } from "../../../utils/regExp";
// import { notSpecialCharacter } from "../../../utils/regExp";

const ManageBusStation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listAddress = useSelector(
    (state) => state.ManageAddressReducer.listAddress
  );
  const [listAddressClone, setListAddressClone] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [newAddress, setNewAddress] = useState({
    name: "",
    city: "",
  });

  useEffect(() => {
    setListAddressClone(listAddress.slice(0, 10));
  }, [listAddress]);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleChangeValueModal = (event) => {
    const name = event.target.name;
    setNewAddress((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleOk = (value) => {
    if (value.name && value.city) {
      dispatch(CreateNewAddressAction(value));
      setLoading(true);
      setTimeout(() => {
        dispatch(GetListAddressAction());
        setLoading(false);
        setOpen(false);
      }, 3000);
    }
  };

  const handleViewDetailAddress = (addressId) => {
    // dispatch(GetOneAddressDetailAction(addressId));
    navigate(`/admin/manage-bus-station/${addressId}`);
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListAddressClone(listAddress.slice(10 * (e - 1), e * 10));
  };

  return (
    <div className="bus-station">
      <div className="bus-station__top">
        <Button className="bus-station__top--add" onClick={showModal}>
          Tạo bến xe mới <i className="fas fa-plus"></i>
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tên bến xe</th>
            <th>Thành phố</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listAddressClone.length > 0 &&
            listAddressClone.map((item) => {
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
                  <td>{item.city}</td>
                  <td>{item.isActive ? "Đang hoạt động" : "Tạm dừng"}</td>
                  <td>
                    <Button onClick={() => handleViewDetailAddress(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="bus-info__pagination">
        {listAddress.length > 0 ? (
          <Pagination
            current={current}
            total={listAddress.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
      <Modal
        open={open}
        title="Thêm bến xe mới"
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
        //     Thêm mới bến xe
        //   </Button>,
        // ]}
        footer={null}
      >
        <Form onFinish={handleOk}>
          <div className="manage-car__modal">
            <div className="manage-car__modal__row">
              <div className="manage-car__modal__item">
                <p>Tên bến xe:</p>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập bến xe!" },
                    // {
                    //   pattern: new RegExp(notSpecialCharacter),
                    //   message: "Không được chứ ký tự đặc biệt!",
                    // },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên bến xe"
                    name="name"
                    value={newAddress.name}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
              <div className="manage-car__modal__item">
                <p>Tỉnh/ Thành phố:</p>
                <Form.Item
                  name="city"
                  rules={[
                    { required: true, message: "Vui lòng nhập Tỉnh/TP" },
                    {
                      pattern: new RegExp(regVietNameseNotNumber),
                      message: "Không được chữ số và ký tự đặc biệt!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập tỉnh hoặc thành phố"
                    name="city"
                    value={newAddress.city}
                    onChange={handleChangeValueModal}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="bus-station__btn">
              <Button key="back" onClick={handleCancel}>
                Hủy
              </Button>

              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                // onClick={handleOk}
              >
                Thêm mới bến xe
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBusStation;
