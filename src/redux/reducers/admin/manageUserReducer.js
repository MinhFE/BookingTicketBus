import { createSlice } from "@reduxjs/toolkit";
import { ManageUserServices } from "../../../services/admin/manageUserServices";
import { openNotificationWithIcon } from "./../../../components/notification/index";
import { history } from "../../../utils/history";

const initialState = {
  listUser: [],
  userDetail: {},
};

const ManageUserReducer = createSlice({
  name: "ManageUserReducer",
  initialState,
  reducers: {
    getListUserReducer: (state, { type, payload }) => {
      state.listUser = payload;
    },
    getDetailUserReducer: (state, { type, payload }) => {
      state.userDetail = payload;
    },
  },
});

export const { getListUserReducer, getDetailUserReducer } =
  ManageUserReducer.actions;

export default ManageUserReducer.reducer;

export const GetListUserAction = () => async (dispatch) => {
  try {
    const result = await ManageUserServices.GetListUsers();
    dispatch(getListUserReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const GetDetailUserAction = (userId) => async (dispatch) => {
  try {
    const result = await ManageUserServices.GetDetailUser(userId);
    if (result.status === 200) {
      history.push(`/admin/manage-user/${result.data.id}`);
      dispatch(getDetailUserReducer(result.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const CreateNewUserAction = (userData) => async (dispatch) => {
  try {
    const result = await ManageUserServices.CreateNewUser(userData);
    if (result.status === 201) {
      openNotificationWithIcon(`success`, `Tạo tài khoản mới thành công !`);
      GetListUserAction();
    } else {
      openNotificationWithIcon(
        `error`,
        `Tạo tài khoản mới thất bại. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-user");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Tạo tài khoản mới thất bại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const UpdateUserAction = (userId, userData) => async (dispatch) => {
  try {
    const result = await ManageUserServices.UpdateDataUser(userId, userData);
    if (result.status === 200) {
      GetListUserAction();
      openNotificationWithIcon(
        `success`,
        `Cập nhật thông tin tài khoản thành công !`
      );
    } else {
      openNotificationWithIcon(
        `error`,
        `Cập nhật thông tin tài khoản thất bại. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-user");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật thông tin tài khoản thất bại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};
