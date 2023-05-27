import { API_URL_DOMAIN } from "../../utils/constant";
import { BaseApi } from "../baseServices";

const GetAllCareers = () => {
  return BaseApi.get(API_URL_DOMAIN + "/career");
}

const GetDetailCareer = (careerId) => {
  return BaseApi.get(API_URL_DOMAIN + `/career/${careerId}`);
}

const CreateNewCareer = (careerData) => {
  return BaseApi.post(API_URL_DOMAIN + "/career", careerData);
}

const UpdateOneCareer = (careerId ,careerData) => {
  return BaseApi.patch(API_URL_DOMAIN + `/career/${careerId}`, careerData);
}

const GetAllResumes = () => {
  return BaseApi.get(API_URL_DOMAIN + "/cv");
}

const GetDetailResume = (resumeId) => {
  return BaseApi.get(API_URL_DOMAIN + `/cv/${resumeId}`);
}

const CreateNewResume = (resumeId, resumeData) => {
  return BaseApi.post(API_URL_DOMAIN + `/cv/${resumeId}`, resumeData)
}

const UpdateResume = (resumeId, resumeData) => {
  return BaseApi.patch(API_URL_DOMAIN + `/cv/${resumeId}`, resumeData)
}

export const ManageCareerService = {
  GetAllCareers,
  GetDetailCareer,
  CreateNewCareer,
  UpdateOneCareer,
  GetAllResumes,
  GetDetailResume,
  CreateNewResume,
  UpdateResume,
}