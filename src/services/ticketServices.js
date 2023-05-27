import { API_URL_DOMAIN } from "../utils/constant";
import { BaseApi } from "./baseServices";

const CreateNewTicket = (ticketData, scheduleId) => {
  return BaseApi.post(API_URL_DOMAIN + `/ticket/${scheduleId}`, ticketData);
}

export const TicketServices = {
  CreateNewTicket
}
