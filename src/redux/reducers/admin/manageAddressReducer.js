import { createSlice } from "@reduxjs/toolkit";
import { ManageAddressService } from "../../../services/admin/manageAddressServices";
import { openNotificationWithIcon } from './../../../components/notification/index';
import { history } from "../../../utils/history";

const initialState = {
  listAddress: [],
  addressDetail: {}
};

const ManageAddressReducer = createSlice({
  name: "ManageAddressReducer",
  initialState,
  reducers: {
    getListAddressReducer: (state, { type, payload }) => {
      state.listAddress = payload;
    },
    getOneAddressReducer: (state, { type, payload }) => {
      state.addressDetail = payload;
    },
  }
});

export const {
  getListAddressReducer,
  getOneAddressReducer,
} = ManageAddressReducer.actions;

export default ManageAddressReducer.reducer;

export const GetListAddressAction = () => async (dispatch) => {
  try {
    const result = await ManageAddressService.GetListAddresses();
    dispatch(getListAddressReducer(result.data));
  } catch (err) {
    console.log(err);
  }
}

export const CreateNewAddressAction = (newAddress) => async (dispatch) => {
  try {
    const result = await ManageAddressService.CreateNewAddress(newAddress);
    if (result.status === 201) {
      openNotificationWithIcon(`success`, `Đã thêm bến xe mới thành công !`);
    } else {
      openNotificationWithIcon(
        `error`,
        `Thêm bến xe mới không thành công. Vui lòng thử lại sau !`
      );
    }
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Thêm bến xe mới không thành công. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
}

export const GetOneAddressDetailAction = (addressId) => async (dispatch) => {
  try {
    const result = await ManageAddressService.GetOneAddressById(addressId);
    dispatch(getOneAddressReducer(result.data));
  } catch (err) {
    console.log(err);
  }
}

export const CallApiUpdateAddressAction = (addressId, addressData) => async () => {
  try {
    const result = await ManageAddressService.UpdateOneAddressById(addressId, addressData);
    if(result.status === 200) {
      openNotificationWithIcon(`success`, `Đã cập nhật bến xe thành công !`)
    } else {
      openNotificationWithIcon(`error`, `Cập nhật thông tin bến xe thất bại. Vui lòng thử lại sau !`);
    }
    history.push("/admin/manage-bus-station")
  }catch (err) {
    openNotificationWithIcon(`error`, `Cập nhật thông tin bến xe thất bại. Vui lòng thử lại sau !`);
    console.log(err);
  }
}
