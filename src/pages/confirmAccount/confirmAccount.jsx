import React from "react";
import { Result, Button, notification } from "antd";
import axios from "axios";
import constant from "../../constant";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmAccount = () => {
  const navigation = useNavigate();
  const { token } = useParams();
  const handleOnClick = async () => {
    try {
      const res = await axios.patch(
        `${constant._SERVER_LINK}/user/confirm/${token}`
      );
      const result = await res.data;
      console.log(res);
      if (res.status === 200) {
        notification.success({
          message: "Kích hoạt tài khoản thành công",
          description:
            "Bạn đã kích hoạt tài khoản thành công. Vui lòng đăng nhập để sử dụng dịch vụ.",
          duration: 4,
        });

        navigation("/");
      } else {
        notification.error({
          message: "Kích hoạt tài khoản thât bại",
          description:
            "Bạn đã kích hoạt tài khoản thât bại. Vui lòng thao tác lại ",
          duration: 4,
        });
      }
    } catch (error) {
      notification.error({
        message: "Kích hoạt tài khoản thât bại",
        description:
          "Bạn đã kích hoạt tài khoản thât bại. Vui lòng thao tác lại ",
        duration: 4,
      });
    }
  };
  return (
    <div style={{ width: 400, margin: "auto" }}>
      <Result
        status="warning"
        title="Kích hoạt Tài Khoản"
        subTitle="Vui lòng kích hoạt Tài Khoản để sử dụng dịch vụ"
        extra={[
          <Button onClick={handleOnClick} type="primary" key="login">
            Xác nhận
          </Button>,
        ]}
      />
    </div>
  );
};

export default ConfirmAccount;
