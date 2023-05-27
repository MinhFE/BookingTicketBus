import { createSlice } from "@reduxjs/toolkit";
import { ManageBusInfoServices } from "../../../services/admin/manageBusInfoServices";
import { openNotificationWithIcon } from "./../../../components/notification/index";

const initialState = {
  listBusInfo: [],
  busInfoDetail: {},
};

const ManageBusInfoReducer = createSlice({
  name: "ManageBusInfoReducer",
  initialState,
  reducers: {
    getListBusInfoReducer: (state, { type, payload }) => {
      state.listBusInfo = payload;
    },
    getBusInfoDetailReducer: (state, { type, payload }) => {
      state.busInfoDetail = payload;
    },
  },
});

export const { getListBusInfoReducer, getBusInfoDetailReducer } =
  ManageBusInfoReducer.actions;

export default ManageBusInfoReducer.reducer;

export const GetListBusInfoAction = () => async (dispatch) => {
  try {
    const result = await ManageBusInfoServices.GetAllBusInfo();
    dispatch(getListBusInfoReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CreateNewScheduleAction = (scheduleData) => async (dispatch) => {
  try {
    const result = await ManageBusInfoServices.CreateNewSchedule(scheduleData);
    if (result.status === 201) {
      openNotificationWithIcon(`success`, "Tạo lịch trình thành công!");
    }
  } catch (err) {
    openNotificationWithIcon(`error`, `${err.response.data.error}`);
    console.log(err);
  }
};

export const GetDetailBusInfoAction = (scheduleId) => async (dispatch) => {
  try {
    const result = await ManageBusInfoServices.GetDetailScheduleTicket(
      scheduleId
    );
    if (result.status === 200) {
      dispatch(getBusInfoDetailReducer(result.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const UpdateBusInfoAction =
  (scheduleId, scheduleData) => async (dispatch) => {
    try {
      const result = await ManageBusInfoServices.UpdateDetailSchedule(
        scheduleId,
        scheduleData
      );
      if (result.status === 200) {
        openNotificationWithIcon(
          `success`,
          `Cập nhật thông tin lịch trình thành công !!!`
        );
      }
    } catch (err) {
      openNotificationWithIcon(
        `error`,
        `Cập nhật thông tin lịch trình thất bại. Vui lòng thử lại sau !!!`
      );
      console.log(err);
    }
  };
