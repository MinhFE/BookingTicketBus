import { createSlice } from "@reduxjs/toolkit";
import { CareerServices } from "../../services/careerServices";
import { openNotificationWithIcon } from "./../../components/notification/index";

const initialState = {
  listCareers: [],
  careerDetail: {},
  careerApplyCV: {},
};

const CareerReducer = createSlice({
  name: "CareerReducer",
  initialState,
  reducers: {
    getListCareerReducer: (state, { type, payload }) => {
      state.listCareers = payload;
    },
    getListCareerDetailReducer: (state, { type, payload }) => {
      state.careerDetail = payload;
    },
    handleApplyCVForCareer: (state, { type, payload }) => {
      state.careerApplyCV = payload;
    },
  },
});

export const {
  getListCareerReducer,
  getListCareerDetailReducer,
  handleApplyCVForCareer,
} = CareerReducer.actions;

export default CareerReducer.reducer;

export const CallApiGetListCareers = () => async (dispatch) => {
  try {
    const result = await CareerServices.GetListCareers();
    await dispatch(getListCareerReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CallApiGetDetailCareer = (careerId) => async (dispatch) => {
  try {
    const result = await CareerServices.GetListCareersById(careerId);
    dispatch(getListCareerDetailReducer(result.data));
  } catch (err) {
    console.log(err);
  }
};

export const CallApiApplyCVForCareer =
  (dataProvider, careerId) => async (dispatch) => {
    try {
      const result = await CareerServices.ApplyCVForCareer(
        dataProvider,
        careerId
      );
      if (result.status === 201) {
        dispatch(handleApplyCVForCareer(result.data));
        openNotificationWithIcon(`success`, `Nộp hồ sơ thành công!`);
      } else {
        openNotificationWithIcon(`error`, `Nộp hồ sơ thất bại!`);
      }
    } catch (err) {
      openNotificationWithIcon(`error`, `Nộp hồ sơ thất bại!`);
      console.log(err);
    }
  };
