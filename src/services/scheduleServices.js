import { API_URL_DOMAIN } from "../utils/constant";
import { BaseApi } from "./baseServices";

const GetScheduleMoreThanCurrentDate = () => {
  return BaseApi.get(API_URL_DOMAIN + "/schedule/scheduleMoreThanCurrentDate");
};

const GetAScheduleByManyFields = (ticketId) => {
  return BaseApi.get(API_URL_DOMAIN + `/schedule/ticket/${ticketId}`)
};

export const ScheduleServices = {
  GetScheduleMoreThanCurrentDate,
  GetAScheduleByManyFields
}