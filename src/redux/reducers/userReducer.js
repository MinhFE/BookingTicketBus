import { createSlice } from "@reduxjs/toolkit";
import { UserServices } from "../../services/userServices";
import { openNotificationWithIcon } from "./../../components/notification/index";
import { history } from "../../utils/history";
import { saveStringLocal } from "../../utils/config";

const initialState = {
  userLogin: {},
  userProfile: {},
  orderHistory: [],
  oneOrderHistory: {},
  oneOrderHistoryByTicketId: {},
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    userLoginReducer: (state, { type, payload }) => {
      state.userLogin = payload;
    },
    userLogoutReducer: (state, { type, payload }) => {
      state.userLogin = payload;
    },
    userProfileReducer: (state, { type, payload }) => {
      state.userProfile = payload;
    },
    userOrderHistory: (state, { type, payload }) => {
      state.orderHistory = payload;
    },
    getUserOrderOneHistory: (state, { type, payload }) => {
      state.oneOrderHistory = payload;
    },
    GetOneOrderHistoryByTicketId: (state, { type, payload }) => {
      state.oneOrderHistoryByTicketId = payload;
    },
  },
});

export const {
  userLoginReducer,
  userLogoutReducer,
  userProfileReducer,
  userOrderHistory,
  getUserOrderOneHistory,
  GetOneOrderHistoryByTicketId,
} = UserReducer.actions;

export default UserReducer.reducer;

//------------ Action Call API For User ---------------//
export const CallApiRegisterUser = async (userInfoRegister) => {
  try {
    await UserServices.RegisterUser(userInfoRegister);

    UserServices.SendEmailRegister(userInfoRegister.email);
    openNotificationWithIcon(
      `success`,
      `Đăng ký thành công. Hãy đăng nhập email để xác nhận!`
    );
    history.push("/login");
  } catch (err) {
    // console.log(err);
    openNotificationWithIcon(`error`, err.response.data.error);
  }
};

export const CallApiLoginUser = (userInfoLogin) => async (dispatch) => {
  try {
    const result = await UserServices.LoginUser(userInfoLogin);
    if (result.data.role === "admin") {
      await dispatch(userLoginReducer(result.data));
      openNotificationWithIcon(
        `success`,
        `Đăng nhập thành công. Xin chào ${result.data.name} !`
      );
      saveStringLocal("token", result.data.access_token);
      history.push("/admin/manage-car");
    } else if (result.data.role === "member") {
      await dispatch(userLoginReducer(result.data));
      openNotificationWithIcon(
        `success`,
        `Đăng nhập thành công. Xin chào ${result.data.name} !`
      );
      saveStringLocal("token", result.data.access_token);
      history.push("/");
    } else if (result.data.role === "driver") {
      await dispatch(userLoginReducer(result.data));
      openNotificationWithIcon(
        `success`,
        `Đăng nhập thành công. Xin chào ${result.data.name} !`
      );
      saveStringLocal("token", result.data.access_token);
      history.push("/driver/manage-profile");
    }
  } catch (err) {
    openNotificationWithIcon(`error`, `Đăng nhập thất bại. Vui lòng thử lại !`);
    console.log(err);
  }
};

export const CallApiLogoutUser = () => async (dispatch) => {
  try {
    await dispatch(userLogoutReducer({}));
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};

export const CallApiUserProfileReducer = (userId) => async (dispatch) => {
  try {
    const result = await UserServices.UserProfile(userId);
    await dispatch(userProfileReducer(result.data));
    history.push("/profile");
  } catch (err) {
    console.log(err);
  }
};

export const CallApiForgotPasswordUser = (userUpdate) => async () => {
  try {
    const res = await UserServices.ForgotPasswordUser(userUpdate);
    if (res) {
      openNotificationWithIcon(`success`, `Cập nhật mật khẩu thành công !`);
      history.push("/");
    } else {
      openNotificationWithIcon(
        `error`,
        `Cập nhật mật khẩu thất bại.Vui lòng thử lại sau !`
      );
    }
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật mật khẩu thất bại.Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const CallApiSendMailForgotPassword = (mail) => async () => {
  try {
    const result = await UserServices.SendMailForgotPassword(mail);
    if (result.status === 200) {
      openNotificationWithIcon(
        `success`,
        `Vui lòng kiểm tra email để đặt lại mật khẩu !`
      );
    }
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Email sai hoặc không tồn tại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const CallApiGetOrderHistory = () => async (dispatch) => {
  try {
    const result = await UserServices.GetOrderHistory();
    dispatch(userOrderHistory(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CallApiPaymentAction = (dataOrder) => async (dispatch) => {
  try {
    const result = await UserServices.PaymentOrder(dataOrder);
    // window.open(result.data, "noreferrer");
    window.location.replace(result.data);
  } catch (err) {
    console.log(err);
  }
};

export const CallApiGetOneOrderHistory = (ticketId) => async (dispatch) => {
  try {
    const result = await UserServices.GetOneOrderHistory(ticketId);
    dispatch(getUserOrderOneHistory(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CallApiGetOneOrderHistoryByTicketId =
  (ticketId) => async (dispatch) => {
    try {
      const result = await UserServices.GetOneOrderHistoryByTicket(ticketId);
      dispatch(GetOneOrderHistoryByTicketId(result.data));
    } catch (err) {
      console.log(err);
    }
  };

export const CallApiCreateContentRating =
  (content, ticketId) => async (dispatch) => {
    try {
      const result = await UserServices.CreateContentRating(content, ticketId);
      if (result.status === 201) {
        openNotificationWithIcon(`success`, `Đánh giá thành công !`);
      } else {
        openNotificationWithIcon(
          `error`,
          `Đánh giá thất bại. Vui lòng thử lại sau !!!`
        );
      }
      history.push(`/lich-su-dat-ve`);
    } catch (err) {
      openNotificationWithIcon(
        `error`,
        `Đánh giá thất bại. Vui lòng thử lại sau !!!`
      );
      console.log(err);
    }
  };

export const UpdateUserProfileAction =
  (userId, userProfile) => async (dispatch) => {
    try {
      const result = await UserServices.UpdateUserProfile(userId, userProfile);
      if (result.status === 200) {
        await CallApiUserProfileReducer(userId);
        openNotificationWithIcon(
          `success`,
          `Cập nhật thông tin cá nhân thành công !`
        );
      } else {
        openNotificationWithIcon(
          `error`,
          `Cập nhật thông tin cá nhân thất bại. Vui lòng thử lại sau !!!`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
