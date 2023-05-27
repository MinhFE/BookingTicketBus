import { API_URL_DOMAIN } from "../utils/constant";
import { BaseApi } from "./baseServices";

const GetListAddress = () => {
  return BaseApi.get(API_URL_DOMAIN + "/address");
}

export const AddressServices = {
  GetListAddress,
}