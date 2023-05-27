import { createSlice } from "@reduxjs/toolkit";
import { AddressServices } from "../../services/addressServices";

const initialState = {
  listAddress: [],
};

const AddressReducer = createSlice({
  name: "AddressReducer",
  initialState,
  reducers: {
    getListAddressReducer: (state, { type, payload }) => {
      state.listAddress = payload;
    },
  },
});

export const {
  getListAddressReducer
} = AddressReducer.actions;

export default AddressReducer.reducer;

export const GetListAddressAction = () => async (dispatch) => {
  try {
    const listAddress = await AddressServices.GetListAddress();
    dispatch(getListAddressReducer(listAddress.data));
  } catch(err) {
    console.log(err);
  }
}
