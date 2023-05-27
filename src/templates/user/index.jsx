import React, { useEffect } from "react";
import Header from "../../components/header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/footer";
import "./style.scss";
import { GetListAddressAction } from "../../redux/reducers/addressReducer";
import { useDispatch } from "react-redux";

const UserTemplate = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);
  useEffect(() => {
    dispatch(GetListAddressAction());
    // dispatch(CallApiGetOrderHistory());
  }, []);
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserTemplate;
