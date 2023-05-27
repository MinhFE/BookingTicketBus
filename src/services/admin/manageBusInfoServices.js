import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetAllBusInfo = () => {
  return BaseApi.get(API_URL_DOMAIN + "/schedule");
};

const CreateNewSchedule = (scheduleData) => {
  return BaseApi.post(API_URL_DOMAIN + "/schedule", scheduleData);
};

const GetDetailScheduleTicket = (scheduleId) => {
  return BaseApi.get(API_URL_DOMAIN + `/schedule/ticket/${scheduleId}`);
};

const UpdateDetailSchedule = (scheduleId, scheduleData) => {
  return BaseApi.patch(API_URL_DOMAIN + `/schedule/${scheduleId}`, scheduleData);
};

export const ManageBusInfoServices = {
  GetAllBusInfo,
  CreateNewSchedule,
  GetDetailScheduleTicket,
  UpdateDetailSchedule
};
