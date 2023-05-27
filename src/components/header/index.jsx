import React, { useState } from "react";
import { MenuData } from "../../utils/menuData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image, Button, Drawer, Dropdown } from "antd";
import facebookLogo from "../../assets/images/facebook.png";
import youtubeLogo from "../../assets/images/youtube.png";
import useDeviceDetect from "./../../hooks/useDeviceDetect";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  CallApiLogoutUser,
  CallApiUserProfileReducer,
} from "./../../redux/reducers/userReducer";
import { removeLocal } from "../../utils/config";
import logo from "../../assets/images/logo.png";
import { getStringLocal } from "../../utils/config";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);
  const { isMobile } = useDeviceDetect();
  const userInfo = useSelector((state) => state.UserReducer.userLogin);
  const userToken = getStringLocal("token");
  const items = [
    {
      label: <Link to={"/lich-su-dat-ve"}>{t("header.Lịch sử mua vé")}</Link>,
      key: "0",
    },
    {
      label: (
        <Link onClick={() => dispatch(CallApiUserProfileReducer(userInfo.id))}>
          {t("header.Thông tin cá nhân")}
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          onClick={() => {
            dispatch(CallApiLogoutUser());
            removeLocal("token");
          }}
        >
          {t("header.Đăng xuất")}
        </Link>
      ),
      key: "2",
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      {!isMobile && (
        <div className="header-top">
          <div className="header-top__container">
            <div className="header-top__left">
              <p>
                <i className="fas fa-phone-alt"></i> 19001080
              </p>
              <p>
                <i className="fas fa-envelope"></i> hotro@mika.vn
              </p>
            </div>
            <div className="header-top__right">
              <Image
                className="header-top__right--icon"
                src={facebookLogo}
                preview={false}
              />
              <Image
                className="header-top__right--icon"
                src={youtubeLogo}
                preview={false}
              />
              <button
                className="btn-vn"
                onClick={() => i18n.changeLanguage("vi")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 28 28"
                  data-v-a3a4972c=""
                >
                  <g fill="none">
                    <circle
                      cx="13.991"
                      cy="13.991"
                      r="13.99"
                      fill="#FFF"
                    ></circle>{" "}
                    <path
                      fill="#E12A28"
                      d="M27.181 9.326l-.004-.012C25.387 4.265 20.781.55 15.247.058c2.141 1.173 2.767 4.893 3.315 9.268.374 2.989.376 6.282.007 9.274-.543 4.399-1.171 8.144-3.322 9.323 5.544-.494 10.156-4.221 11.94-9.283l.013-.04c.504-1.444.781-2.994.781-4.61 0-1.636-.284-3.205-.8-4.664z"
                    ></path>{" "}
                    <path
                      fill="#ED3432"
                      d="M19.282 9.326C18.734 4.95 17.388 1.23 15.247.057 14.833.021 14.414 0 13.99 0 7.904 0 2.728 3.887.804 9.314l-.005.012C.283 10.785 0 12.354 0 13.99c0 1.615.277 3.165.78 4.609.006.013.01.026.014.04 1.917 5.44 7.1 9.34 13.196 9.34.424 0 .843-.02 1.257-.057 2.15-1.179 3.499-4.924 4.042-9.323.37-2.993.367-6.285-.007-9.274z"
                    ></path>{" "}
                    <path
                      fill="#FDCE0C"
                      d="M13.865 6.82L15.527 11.935 20.906 11.935 16.554 15.096 18.216 20.212 13.865 17.05 9.514 20.212 11.176 15.096 6.825 11.935 12.203 11.935z"
                    ></path>
                  </g>
                </svg>
                <span>VN</span>
              </button>
              <button
                className="btn-en"
                onClick={() => i18n.changeLanguage("en")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 28 28"
                  data-v-a3a4972c=""
                >
                  <g fill="none">
                    <g fill="#29337A">
                      <path
                        d="M2.042 5.508C1.143 6.812.46 8.276.047 9.85h6.337L2.042 5.508zM9.618.028c-1.605.468-3.091 1.214-4.4 2.187l4.4 4.4V.028zM5.545 24.822c1.228.86 2.6 1.525 4.073 1.954V20.75l-4.073 4.072zM.207 17.516c.46 1.492 1.166 2.876 2.068 4.108l4.108-4.108H.207z"
                        transform="translate(.412 .588)"
                      ></path>
                    </g>{" "}
                    <g fill="#FFF">
                      <path
                        d="M2.507 5.48c-.078.106-.155.214-.23.323l4.342 4.342H.282c-.103.39-.187.789-.256 1.193h8.34L2.507 5.479zM5.457 24.887c.106.079.215.154.323.23l4.074-4.073v6.026c.39.114.788.213 1.193.293v-8.066l-5.59 5.59zM.132 16.617c.087.404.189.802.31 1.193h6.176L2.51 21.918c.447.61.943 1.183 1.48 1.713l7.015-7.014H.132zM9.854.322V6.91L5.453 2.509c-.607.451-1.174.952-1.7 1.494l7.294 7.293V.03c-.405.08-.802.179-1.193.292z"
                        transform="translate(.176 .294)"
                      ></path>
                    </g>{" "}
                    <g fill="#D32030">
                      <path
                        d="M.124 7.715L.053 7.787.124 7.787zM1.246 6.593L1.317 6.593 1.317 6.522zM6.636 1.285L6.568 1.285 6.568 1.354zM.165.121L.095.05.095.121zM1.288 1.244L1.288 1.314 1.358 1.314z"
                        transform="translate(9.941 10.353)"
                      ></path>
                    </g>{" "}
                    <g fill="#252F6C">
                      <path
                        d="M.049 23.75v3.124c1.493-.418 2.885-1.077 4.13-1.935L.795 21.555c-.27.95-.37 1.441-.746 2.196zM.812 5.91l3.695-3.694C3.179 1.244 1.674.503.048.048v3.208c.435.87.471 1.531.764 2.654zM7.472 21.764c.93-1.252 1.656-2.664 2.127-4.19H3.283l4.19 4.19zM9.758 9.91c-.423-1.608-1.126-3.1-2.053-4.424L3.282 9.91h6.476z"
                        transform="translate(17.647 .53)"
                      ></path>
                    </g>{" "}
                    <g fill="#E7E7E7">
                      <path
                        d="M2.802 16.853l.958.957 4.582 4.583c.104-.13.208-.26.307-.394L4.46 17.81h6.315c.12-.39.223-.789.31-1.193H2.891c-.014.17-.074.068-.09.236zM1.844 6.844L5.998 2.69c-.104-.08-.209-.16-.315-.239L1.989 6.145c.038.146-.18.55-.145.699zM1.225 3.235V.283C.835.173.436.081.032.005v1.44c.444.481.842 1.086 1.193 1.79zM2.708 11.337h8.482c-.069-.403-.153-.802-.255-1.193H4.458l4.424-4.423c-.435-.621-.918-1.205-1.446-1.747L2.453 8.956c.135.904.195 1.429.255 2.381zM1.77 21.588l3.585 3.586c.597-.41 1.158-.868 1.682-1.364l-4.716-4.716c-.15.872-.329 1.715-.551 2.494zM.032 25.782v1.605c.404-.075.802-.168 1.193-.278v-3.123c-.351.704-.75 1.316-1.193 1.796z"
                        transform="translate(16.47 .294)"
                      ></path>
                    </g>{" "}
                    <path
                      fill="#D71F28"
                      d="M18.924 9.25l4.982-4.981c-.449-.461-.93-.89-1.438-1.285L18.553 6.9c.174.727.253 1.56.37 2.35z"
                    ></path>{" "}
                    <g fill="#D32030">
                      <path
                        d="M.001.103c.232-.02.464-.03.695-.03-.233 0-.465.01-.695.03zM.696 27.95c-.231 0-.463-.012-.694-.03.23.019.461.03.694.03zM.696 27.922c.88 0 1.738-.085 2.571-.24v-1.605c-.732.793-1.588 1.845-2.57 1.845z"
                        transform="translate(13.235)"
                      ></path>
                    </g>{" "}
                    <g fill="#D71F28">
                      <path
                        d="M8.896.043H.524c.111 1.748.098 3.544-.04 5.28H8.79c.201-.942.309-1.919.309-2.92 0-.805-.072-1.592-.203-2.36zM.508 5.559c-.077.823-.347 1.464-.481 2.24l4.716 4.717c.466-.442.903-.915 1.305-1.417L1.465 6.516l-.957-.957z"
                        transform="translate(18.765 11.588)"
                      ></path>
                    </g>{" "}
                    <path
                      fill="#D32030"
                      d="M16.503 1.843V.299C15.669.144 14.81.06 13.932.06c.983 0 1.839.99 2.57 1.784z"
                    ></path>{" "}
                    <g fill="#29337A">
                      <path
                        d="M.049 21.824c.376-.755.7-1.624.97-2.574l-.97-.97v3.544zM1.14 3.053C.846 1.931.483.91.049.04v4.104l1.09-1.09z"
                        transform="translate(17.647 3.059)"
                      ></path>
                    </g>{" "}
                    <g fill="#FFF">
                      <path
                        d="M3.073 16.123c.015-.168.03-.337.043-.506h-.55l.507.506zM1.225 5.909V1.804C.873 1.1.475.495.032.014v7.642L2.428 5.26c-.036-.15-.074-.296-.112-.442l-1.091 1.09zM.072 10.337h3.084c-.06-.952-.156-1.89-.29-2.793L.072 10.337zM.032 25.378c.444-.48.842-1.085 1.193-1.79v-3.544l.97.97c.223-.78.41-1.613.561-2.485L.032 15.805v9.573z"
                        transform="translate(16.47 1.294)"
                      ></path>
                    </g>{" "}
                    <path
                      fill="#E51D35"
                      d="M16.503 26.672V17.1l2.723 2.724c.134-.777.24-1.582.317-2.406l-.506-.506h.55c.137-1.735.15-3.532.04-5.28h-3.084l2.793-2.792c-.118-.792-.264-1.557-.438-2.285L16.503 8.95V1.31C15.77.515 14.915.059 13.932.059c-.232 0-.464.006-.696.017-.685.034-1.357.119-2.013.248V11.59L3.93 4.297c-.448.463-.865.955-1.247 1.476L7.35 10.44l1.194 1.193H.203C.073 12.399 0 13.186 0 13.99c0 1.002.108 1.978.309 2.92H11.18l-7.014 7.014c.46.451.949.871 1.466 1.256l5.59-5.59v8.066c.656.13 1.328.213 2.014.248.231.011.463.017.694.017.984 0 1.84-.456 2.572-1.25z"
                    ></path>
                  </g>
                </svg>
                <span>EN</span>
              </button>
              {Object.keys(userInfo).length > 0 && userToken ? (
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  className="header-top__right--dropdown-user"
                >
                  <Link onClick={(e) => e.preventDefault()}>
                    {t("header.Xin chào")}, {userInfo.name}
                  </Link>
                </Dropdown>
              ) : (
                <Button
                  className="header-top__right--login"
                  onClick={() => navigate("/login")}
                >
                  <i className="fas fa-user-circle"></i>
                  {t("header.Đăng nhập")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="header-bottom">
        <div className="header-bottom__container">
          <Link className="header-bottom__left" to="/">
            <Image
              className="header-bottom__left--logo"
              src={logo}
              preview={false}
            />
          </Link>
          {!isMobile ? (
            <div className="header-bottom__center">
              {MenuData.data.length > 0 &&
                MenuData.data.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`header-bottom__center--item ${
                        active === item.path && "active-menu"
                      }`}
                      onClick={() => setActive(item.path)}
                    >
                      {t(`header.${item.name}`)}
                    </Link>
                  );
                })}
            </div>
          ) : (
            <Button onClick={showDrawer}>
              <i className="fas fa-bars"></i>
            </Button>
          )}
        </div>
      </div>
      <Drawer placement="left" width={350} onClose={onClose} open={open}>
        <ul>
          {MenuData.data.length > 0 &&
            MenuData.data.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={item.path} className="header-mobile__center--item">
                    {item.name}
                  </Link>
                </li>
              );
            })}
          <li>
            <Link className="header-mobile__center--item">
              {t("header.Đăng nhập")}
            </Link>
          </li>
        </ul>
      </Drawer>
    </div>
  );
};

export default Header;
