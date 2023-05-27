import { createSlice } from "@reduxjs/toolkit";
import { ManageCarServices } from "../../../services/admin/manageCarServices";
import { openNotificationWithIcon } from "./../../../components/notification/index";
import { history } from "../../../utils/history";

const initialState = {
  listCar: [],
  carDetail: {},
};

const ManageCarReducer = createSlice({
  name: "ManageCarReducer",
  initialState,
  reducers: {
    getListCarReducer: (state, { type, payload }) => {
      state.listCar = payload;
    },
    getOneCarDetailReducer: (state, { type, payload }) => {
      state.carDetail = payload;
    },
  },
});

export const { getListCarReducer, getOneCarDetailReducer } =
  ManageCarReducer.actions;

export default ManageCarReducer.reducer;

export const GetListCarAction = () => async (dispatch) => {
  try {
    const result = await ManageCarServices.GetAllCars();
    dispatch(getListCarReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CreateNewCarAction = (carData) => async (dispatch) => {
  try {
    const result = await ManageCarServices.CreateNewCar(carData);
    if (result.status === 201) {
      openNotificationWithIcon(`success`, `Đã thêm xe mới thành công !`);
    }
    // else {
    //   openNotificationWithIcon(
    //     `error`,
    //     `Thêm xe mới không thành công. Vui lòng thử lại sau !`
    //   );
    // }
  } catch (err) {
    openNotificationWithIcon(`error`, err.response.data.error);
    console.log(err);
  }
};

export const GetOneCarDetailAction = (carId) => async (dispatch) => {
  try {
    const result = await ManageCarServices.GetOneCarDetail(carId);
    dispatch(getOneCarDetailReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const UpdateOneCarAction = (carId, data) => async (dispatch) => {
  try {
    const result = await ManageCarServices.UpdateOneCar(carId, data);
    if (result.status === 200) {
      dispatch(GetListCarAction());
      history.push("/admin/manage-car");
      openNotificationWithIcon(`success`, `Cập nhật xe thành công !`);
    }
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật xe thất bại. Vui lòng thử lại !`
    );
    console.log(err);
  }
};

export const CreateSeatForCar = (carId) => async (dispatch) => {
  try {
    await ManageCarServices.CreateNewSeatForCar(carId);
  } catch (err) {
    console.log(err);
  }
};

export const UpdateStatusSeatAction =
  (seatId, seatData) => async (dispatch) => {
    try {
      const result = await ManageCarServices.UpdateStatusSeatForCar(
        seatId,
        seatData
      );
      if (result.status === 200) {
        dispatch(GetListCarAction());
        history.push("/admin/manage-car");
        openNotificationWithIcon(`success`, `Cập nhật xe thành công !`);
      }
    } catch (err) {
      openNotificationWithIcon(
        `error`,
        `Cập nhật xe thất bại. Vui lòng thử lại !`
      );
      console.log(err);
    }
  };
