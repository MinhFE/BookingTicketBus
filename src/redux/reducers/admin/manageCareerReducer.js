import { createSlice } from "@reduxjs/toolkit";
import { ManageCareerService } from "../../../services/admin/manageCareerService";
import { history } from "../../../utils/history";
import { openNotificationWithIcon } from './../../../components/notification/index';

const initialState = {
  listCareers: [],
  careerDetail: {},
  listResume: [],
  resumeDetail: {},
}

const ManageCareerReducer = createSlice({
  name: "ManageCareerReducer",
  initialState,
  reducers: {
    getListCareerReducer: (state, { type, payload }) => {
      state.listCareers = payload;
    },
    getDetailCareerReducer: (state, { type, payload }) => {
      state.careerDetail = payload;
    },
    getListResumeReducer: (state, { type, payload }) => {
      state.listResume = payload;
    },
    getDetailResumeReducer: (state, { type, payload }) => {
      state.resumeDetail = payload;
    },
  }
});

export const {
  getListCareerReducer,
  getDetailCareerReducer,
  getListResumeReducer,
  getDetailResumeReducer,
} = ManageCareerReducer.actions;

export default ManageCareerReducer.reducer;

export const GetListCareersAction = () => async (dispatch) => {
  try {
    const result = await ManageCareerService.GetAllCareers();
    dispatch(getListCareerReducer(result.data));
  } catch (err) {
    console.log(err);
  }
}

export const GetDetailCareerAction = (careerId) => async (dispatch) => {
  try {
    const result = await ManageCareerService.GetDetailCareer(careerId);
    if(result.status === 200) {
      history.push(`/admin/manage-hire/${result.data.id}`);
      dispatch(getDetailCareerReducer(result.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export const CreateNewCareerAction = (careerData) => async () => {
  try {
    const result = await ManageCareerService.CreateNewCareer(careerData);
    if (result.status === 201) {
      openNotificationWithIcon(`success`, `Tạo thông tin tuyển dụng thành công !`);
      GetListCareersAction();
    } else {
      openNotificationWithIcon(
        `error`,
        `Tạo thông tin tuyển dụng thất bại. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-hire");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Tạo thông tin tuyển dụng thất bại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const UpdateUserAction = (careerId, careerData) => async (dispatch) => {
  try {
    const result = await ManageCareerService.UpdateOneCareer(careerId, careerData);
    if (result.status === 200) {
      GetListCareersAction();
      openNotificationWithIcon(
        `success`,
        `Cập nhật tin tuyển dụng thành công !`
      );
    } else {
      openNotificationWithIcon(
        `error`,
        `Cập nhật tin tuyển dụng thất bại. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-hire");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật tin tuyển dụng thất bại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};

export const GetListResumesAction = () => async (dispatch) => {
  try {
    const result = await ManageCareerService.GetAllResumes();
    dispatch(getListResumeReducer(result.data));
  } catch (err) {
    console.log(err);
  }
}

export const GetDetailResumeAction = (resumeId) => async (dispatch) => {
  try {
    const result = await ManageCareerService.GetDetailResume(resumeId);
    if(result.status === 200) {
      history.push(`/admin/manage-resume/${result.data.id}`);
      dispatch(getDetailResumeReducer(result.data));
    }
  } catch (err) {
    console.log(err);
  }
}

export const UpdateResumeAction = (resumeId, resumeData) => async (dispatch) => {
  try {
    const result = await ManageCareerService.UpdateResume(resumeId, resumeData);
    if (result.status === 200) {
      GetListResumesAction();
      openNotificationWithIcon(
        `success`,
        `Cập nhật tuyển dụng thành công !`
      );
    } else {
      openNotificationWithIcon(
        `error`,
        `Cập nhật tuyển dụng thất bại. Vui lòng thử lại sau !`
      );
    }
    history.push("/admin/manage-resume");
  } catch (err) {
    openNotificationWithIcon(
      `error`,
      `Cập nhật tuyển dụng thất bại. Vui lòng thử lại sau !`
    );
    console.log(err);
  }
};
