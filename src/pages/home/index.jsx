/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Banner from "./../../components/banner/index";
import FindTheBus from "../../components/findTheBus";
import SlickSwiper from "../../components/slickSwiper";
import PopularRoute from "../../components/popularRoute";
import Quantity from "./../../components/quantity/index";
import PopularDestination from "../../components/popularDestination";
import UpdateNews from "./../../components/updateNews/index";
import { useDispatch } from "react-redux";
import { GetListAddressAction } from "./../../redux/reducers/addressReducer";

// import { CallApiGetOrderHistory } from "./../../redux/reducers/userReducer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetListAddressAction());
    // dispatch(CallApiGetOrderHistory());
  }, []);

  return (
    <>
      <Banner />
      <FindTheBus />
      <SlickSwiper />
      <PopularRoute />
      <Quantity />
      <PopularDestination />
      <UpdateNews />
    </>
  );
};

export default Home;
