import { createSlice } from "@reduxjs/toolkit";
import { TicketServices } from "../../services/ticketServices";
import { openNotificationWithIcon } from "../../components/notification";

const initialState = {};

const TicketReducer = createSlice({
  name: "TicketReducer",
  initialState,
  reducers: {},
});

export default TicketReducer.reducer;

export const CreateNewTicketAction = (ticket, scheduleId) => async () => {
  try {
    await TicketServices.CreateNewTicket(ticket, scheduleId);
    // openNotificationWithIcon(`success`, `Tạo vé mới thành công !`);
  } catch (err) {
    // openNotificationWithIcon(`error`, `Tạo vé mới thất bại.Vui lòng thử lại sau !`);
    console.log(err);
  }
};
