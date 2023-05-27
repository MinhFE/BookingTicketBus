import { API_URL_DOMAIN } from "../utils/constant";
import { BaseApi } from "./baseServices";

const RegisterUser = (userInfoRegister) => {
  return BaseApi.post(API_URL_DOMAIN + "/user/register", userInfoRegister);
};
const SendEmailRegister = (mailUser) => {
  return BaseApi.post(API_URL_DOMAIN + "/mailer/register", { to: mailUser });
};

const LoginUser = (userInfoLogin) => {
  return BaseApi.post(API_URL_DOMAIN + "/auth/login", userInfoLogin);
};

const UserProfile = (userId) => {
  return BaseApi.get(API_URL_DOMAIN + `/user/${userId}`);
};

const ForgotPasswordUser = (userUpdate) => {
  return BaseApi.patch(API_URL_DOMAIN + "/user/forgot-password", userUpdate);
};

const SendMailForgotPassword = (mail) => {
  return BaseApi.post(API_URL_DOMAIN + "/mailer/forgot-password", { to: mail });
};

const GetOrderHistory = () => {
  return BaseApi.get(API_URL_DOMAIN + "/ticket/user");
};
const GetOneOrderHistoryByTicket = (tickedId) => {
  return BaseApi.get(API_URL_DOMAIN + `/rate/ticket/${tickedId}`);
};

const GetOneOrderHistory = (tickedId) => {
  return BaseApi.get(API_URL_DOMAIN + `/ticket/${tickedId}`);
};

const PaymentOrder = (dataOrder) => {
  return BaseApi.post(
    API_URL_DOMAIN + "/payment/create_payment_url",
    dataOrder
  );
};

const CreateContentRating = (content, ticketId) => {
  return BaseApi.post(API_URL_DOMAIN + `/rate/${ticketId}`, content);
};

const UpdateUserProfile = (userId, userProfile) => {
  return BaseApi.patch(API_URL_DOMAIN + `/user/${userId}`, userProfile);
};

export const UserServices = {
  RegisterUser,
  SendEmailRegister,
  LoginUser,
  UserProfile,
  ForgotPasswordUser,
  SendMailForgotPassword,
  GetOrderHistory,
  PaymentOrder,
  GetOneOrderHistory,
  CreateContentRating,
  UpdateUserProfile,
  GetOneOrderHistoryByTicket,
};
