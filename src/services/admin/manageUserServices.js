import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetListUsers = () => {
  return BaseApi.get(API_URL_DOMAIN + "/user");
};

const CreateNewUser = (userData) => {
  return BaseApi.post(API_URL_DOMAIN + "/user/register", userData);
}

const GetDetailUser = (userId) => {
  return BaseApi.get(API_URL_DOMAIN + `/user/${userId}`);
}

const UpdateDataUser = (userId, userData) => {
  return BaseApi.patch(API_URL_DOMAIN + `/user/${userId}`, userData);
}

export const ManageUserServices = {
  GetListUsers,
  CreateNewUser,
  GetDetailUser,
  UpdateDataUser,
}