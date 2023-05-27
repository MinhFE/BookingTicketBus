import { createSlice } from "@reduxjs/toolkit";
import { ScheduleServices } from "../../services/scheduleServices";

const initialState = {
  listScheduleMoreThanCurrentDate: [],
  scheduleMoreThanCurrentDateFiltered: [],
  scheduleById: null,
};

const ScheduleReducer = createSlice({
  name: "ScheduleReducer",
  initialState,
  reducers: {
    getListScheduleMoreThanCurrentDate: (state, { type, payload }) => {
      state.listScheduleMoreThanCurrentDate = payload;
    },
    getListScheduleMoreThanCurrentDateFiltered: (state, { type, payload }) => {
      state.scheduleMoreThanCurrentDateFiltered = payload;
    },
    getScheduleByTicketId: (state, { type, payload }) => {
      state.scheduleById = payload;
    },
  },
});

export const {
  getListScheduleMoreThanCurrentDate,
  getListScheduleMoreThanCurrentDateFiltered,
  getScheduleByTicketId,
} = ScheduleReducer.actions;

export default ScheduleReducer.reducer;

export const CallApiListScheduleMoreThanCurrentDate =
  () => async (dispatch) => {
    try {
      const result = await ScheduleServices.GetScheduleMoreThanCurrentDate();
      dispatch(getListScheduleMoreThanCurrentDate(result.data));
    } catch (err) {
      console.log(err);
    }
  };
export const CallApiListScheduleMoreThanCurrentDateFiltered =
  (data) => async (dispatch) => {
    try {
      dispatch(getListScheduleMoreThanCurrentDateFiltered(data));
    } catch (err) {
      console.log(err);
    }
  };

export const CallApiGetScheduleByTicketId = (ticketId) => async (dispatch) => {
  try {
    const result = await ScheduleServices.GetAScheduleByManyFields(ticketId);
    dispatch(getScheduleByTicketId(result.data));
    return result;
  } catch (err) {
    console.log(err);
  }
};
