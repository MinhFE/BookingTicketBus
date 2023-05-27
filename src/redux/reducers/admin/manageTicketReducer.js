import { createSlice } from "@reduxjs/toolkit";
import { ManageTicketServices } from "../../../services/admin/manageTicketServices";
import { openNotificationWithIcon } from "./../../../components/notification/index";
import { history } from "../../../utils/history";

const initialState = {
  listTicket: [],
  ticketDetail: null,
};

const ManageTicketReducer = createSlice({
  name: "ManageTicketReducer",
  initialState,
  reducers: {
    getListTicketReducer: (state, { type, payload }) => {
      state.listTicket = payload;
    },
    getOneTicketDetailReducer: (state, { type, payload }) => {
      state.ticketDetail = payload;
    },
  },
});

export const { getListTicketReducer, getOneTicketDetailReducer } =
  ManageTicketReducer.actions;

export default ManageTicketReducer.reducer;

export const GetListTicketAction = () => async (dispatch) => {
  try {
    const result = await ManageTicketServices.GetListTickets();
    dispatch(getListTicketReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const GetOneTicketDetailAction = (ticketId) => async (dispatch) => {
  try {
    const result = await ManageTicketServices.GetOneTicketById(ticketId);
    dispatch(getOneTicketDetailReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const UpdateOneTicketAction = (ticketId, ticketData) => async () => {
  try {
    const result = await ManageTicketServices.UpdateOneTicketById(
      ticketId,
      ticketData
    );
    if (result.status === 200) {
      openNotificationWithIcon(`success`, `Đã cập nhật vé thành công !`);
    } else {
      openNotificationWithIcon(
        `error`,
        `Cập nhật vé không thành công. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-ticket");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật vé không thành công. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const CancelOneTicketAction = (ticketId, ticketData) => async () => {
  try {
    const result = await ManageTicketServices.CancelOneTicketById(ticketId);
    if (result.status === 200) {
      openNotificationWithIcon(`success`, `Canceled vé thành công !`);
    } else {
      openNotificationWithIcon(
        `error`,
        `Canceled vé không thành công. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-ticket");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Canceled vé không thành công. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};
