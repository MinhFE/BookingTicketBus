import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetAllCars = () => {
  return BaseApi.get(API_URL_DOMAIN + "/car");
}

const CreateNewCar = (carData) => {
  return BaseApi.post(API_URL_DOMAIN + "/car", carData);
}

const GetOneCarDetail = (carId) => {
  return BaseApi.get(API_URL_DOMAIN + `/car/${carId}`);
}

const UpdateOneCar = (carId, data) => {
  return BaseApi.patch(API_URL_DOMAIN + `/car/${carId}`, data);
}

const CreateNewSeatForCar = (carId) => {
  return BaseApi.post(API_URL_DOMAIN + `/seat/${carId}`);
}

const UpdateStatusSeatForCar = (seatId, seatStatus) => {
  return BaseApi.patch(API_URL_DOMAIN + `/seat/${seatId}`, seatStatus);
}

export const ManageCarServices = {
  GetAllCars,
  CreateNewCar,
  GetOneCarDetail,
  UpdateOneCar,
  CreateNewSeatForCar,
  UpdateStatusSeatForCar,
}