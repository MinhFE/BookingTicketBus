import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetListTickets = () => {
  return BaseApi.get(API_URL_DOMAIN + "/ticket");
};

const GetOneTicketById = (ticketId) => {
  return BaseApi.get(API_URL_DOMAIN + `/ticket/${ticketId}`);
};

const UpdateOneTicketById = (ticketId, ticketData) => {
  return BaseApi.patch(
    API_URL_DOMAIN + `/ticket/schedule/${ticketId}`,
    ticketData
  );
};

const CancelOneTicketById = (ticketId) => {
  return BaseApi.patch(API_URL_DOMAIN + `/ticket/${ticketId}`);
};

export const ManageTicketServices = {
  GetListTickets,
  GetOneTicketById,
  UpdateOneTicketById,
  CancelOneTicketById,
};
