/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Image } from "antd";
import { MenuDataAdmin } from "../../utils/menuData";
import logo from "../../assets/images/logo-admin.png";
import { useDispatch } from "react-redux";
import { GetListTicketAction } from "./../../redux/reducers/admin/manageTicketReducer";
import { GetListCarAction } from "./../../redux/reducers/admin/manageCarReducer";
import { GetListUserAction } from "./../../redux/reducers/admin/manageUserReducer";
import { GetListAddressAction } from "./../../redux/reducers/admin/manageAddressReducer";
import { GetListResumesAction } from "./../../redux/reducers/admin/manageCareerReducer";
// import { removeLocal } from "../../utils/config";
import { CallApiLogoutUser } from "../../redux/reducers/userReducer";

const AdminTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setActive(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    dispatch(GetListCarAction());
    dispatch(GetListUserAction());
    dispatch(GetListTicketAction());
    dispatch(GetListAddressAction());
    dispatch(GetListResumesAction());
  }, []);
  const handleLogoutAdminAction = async () => {
    await dispatch(CallApiLogoutUser());
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-template">
      <div className="admin-template__left">
        <div className="admin-template__left__top">
          <Image preview={false} src={logo} alt="" />
          <Typography.Title level={4}>ADMIN</Typography.Title>
          <p>Chào mừng quay trở lại</p>
        </div>
        <div className="admin-template__left__bottom">
          <ul>
            {MenuDataAdmin.data.length > 0 &&
              MenuDataAdmin.data.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="admin-template__left__bottom--item"
                  >
                    <Link
                      to={item.path}
                      className={`${active === item.path && "active-menu"}`}
                      onClick={() => setActive(item.path)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="admin-template__right">
        <div className="admin-template__right__top">
          <Button onClick={handleLogoutAdminAction}>
            <i className="fas fa-sign-out-alt"></i>
          </Button>
        </div>
        <div className="admin-template__right__bottom">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
