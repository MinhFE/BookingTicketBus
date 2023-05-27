import { Button, Form, Input, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  CallApiUpdateAddressAction,
  GetListAddressAction,
  // GetOneAddressDetailAction,
} from "../../../redux/reducers/admin/manageAddressReducer";
import { BaseApi } from "../../../services/baseServices";
import { API_URL_DOMAIN } from "../../../utils/constant";
import { useForm } from "antd/es/form/Form";
import { regVietNameseNotNumber } from "../../../utils/regExp";
import moment from "moment";

const ViewDetailAddress = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [form] = useForm();
  const dispatch = useDispatch();

  // const [stateAddress, setAddressDetail] = useState({});
  // const stateAddress = useSelector(
  //   (state) => state.ManageAddressReducer.stateAddress
  // );
  const [stateAddress, setStateAddress] = useState({});
  const [stateAddressClone, setStateAddressClone] = useState({});

  useEffect(() => {
    const getAddressDetail = async () => {
      try {
        const res = await BaseApi.get(API_URL_DOMAIN + `/address/${param.id}`);
        // setAddressDetail(res.data);
        setStateAddress(res.data);
        setStateAddressClone(res.data);
        form.setFieldsValue(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddressDetail();
  }, []);
  const handleUpdateAddress = async () => {
    const newData = {
      name: stateAddress.name,
      city: stateAddress.city,
      isActive: stateAddress.isActive,
    };
    await dispatch(CallApiUpdateAddressAction(stateAddress.id, newData));
    await dispatch(GetListAddressAction());
  };

  const handleDisableAddress = () => {
    const newData = {
      isActive: false,
    };
    dispatch(CallApiUpdateAddressAction(stateAddress.id, newData));
    dispatch(GetListAddressAction());
  };

  return (
    <div className="view-detail-address">
      <Typography.Title level={4}>Xem chi tiết bến xe</Typography.Title>
      <Form form={form} onFinish={handleUpdateAddress}>
        <div className="view-detail-address__form">
          <div className="view-detail-address__row">
            <div className="view-detail-address__row--item">
              <p>Tên bến xe:</p>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập bến xe!" }]}
              >
                <Input
                  name="name"
                  // value={stateAddress.name}
                  onChange={(event) =>
                    setStateAddress((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                />
              </Form.Item>
            </div>
            <div className="view-detail-address__row--item">
              <p>Tỉnh/ Thành phố:</p>
              <Form.Item
                name="city"
                rules={[
                  { required: true, message: "Vui lòng nhập Tỉnh/TP" },
                  {
                    pattern: new RegExp(regVietNameseNotNumber),
                    message: "Không được chứa số và ký tự đặc biệt",
                  },
                ]}
              >
                <Input
                  name="city"
                  // value={stateAddress.city}
                  onChange={(event) =>
                    setStateAddress((prev) => ({
                      ...prev,
                      city: event.target.value,
                    }))
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="view-detail-address__row">
            <div className="view-detail-address__row--item">
              <p>Trạng thái bến xe:</p>
              <Form.Item>
                <Select
                  value={stateAddress.isActive ? "Đang hoạt động" : "Tạm dừng"}
                  className="router-confirm__top--selected"
                  style={{ width: " 100%" }}
                  onChange={(value) =>
                    setStateAddress({ ...stateAddress, isActive: value })
                  }
                  options={[
                    { label: "Đang hoạt động", value: true },
                    { label: "Tạm dừng", value: false },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="view-detail-address__row--item">
              <p>Ngày tạo bến xe:</p>
              <Input
                disabled
                value={moment(stateAddress?.created_at).format("DD/MM/YYYY")}
              />
            </div>
          </div>
          <div className="view-detail-address__row">
            <div className="view-detail-address__row--item">
              <p>Ngày cập nhật bến xe:</p>
              <Form.Item>
                <Input
                  disabled
                  value={moment(stateAddress?.updated_at).format("DD/MM/YYYY")}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="view-detail-address__bottom">
          <Button
            className="view-detail-address__bottom--back"
            onClick={() => navigate("/admin/manage-bus-station")}
          >
            Quay lại
          </Button>
          <div className="view-detail-address__group">
            {/* {stateAddressClone.isActive && (
              <Button
                className="view-detail-address__bottom--disabled"
                onClick={handleDisableAddress}
              >
                Vô hiệu hóa bến xe
              </Button>
            )} */}
            <Button
              htmlType="submit"
              className="view-detail-address__bottom--update"
              // onClick={handleUpdateAddress}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ViewDetailAddress;
