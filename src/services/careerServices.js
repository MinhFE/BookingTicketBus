import { API_URL_DOMAIN } from "../utils/constant";
import { BaseApi } from "./baseServices";

const GetListCareers = () => {
  return BaseApi.get(API_URL_DOMAIN + "/career");
};

const GetListCareersById = (careerId) => {
  return BaseApi.get(API_URL_DOMAIN + `/career/${careerId}`);
};

const ApplyCVForCareer = (dataCV, careerId) => {
  return BaseApi.post(API_URL_DOMAIN + `/cv/${careerId}`, dataCV);
};

export const CareerServices = {
  GetListCareers,
  GetListCareersById,
  ApplyCVForCareer,
};
