import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetListAddresses = () => {
  return BaseApi.get(API_URL_DOMAIN + "/address");
}

const GetOneAddressById = (addressId) => {
  return BaseApi.get(API_URL_DOMAIN + `/address/${addressId}`);
}

const CreateNewAddress = (newAddress) => {
  return BaseApi.post(API_URL_DOMAIN + "/address", newAddress);
}

const UpdateOneAddressById = (addressId, addressData) => {
  return BaseApi.patch(API_URL_DOMAIN + `/address/${addressId}`, addressData);
}

export const ManageAddressService = {
  GetListAddresses,
  CreateNewAddress,
  GetOneAddressById,
  UpdateOneAddressById,
}