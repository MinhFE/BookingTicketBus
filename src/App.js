import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import UserTemplate from "./templates/user";
import Home from "./pages/home";
import News from "./pages/news";
import Contact from "./pages/contact";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/login";
import Register from "./pages/register/index";
import Hire from "./pages/hire";
import Schedule from "./pages/schedule";
import BookingTicket from "./pages/bookingTicket/index";
import Profile from "./pages/profile";
import ProtectedRoute from "./templates/protectedRoute/index";
import HireDetail from "./pages/hireDetail";
import ForgotPassword from "./pages/forgotPassword";
import HistoryOrder from "./pages/historyOrder";
import AdminTemplate from "./templates/admin";
import ProtectedRouteAdmin from "./templates/protectedRouteAdmin";
import ManageCar from "./pages/Admin/ManageCar/index";
import ManageTicket from "./pages/Admin/ManageTicket/index";
import ManageBusStation from "./pages/Admin/ManageBusStation";
import ManageBusInformation from "./pages/Admin/ManageBusInformation/index";
import ManageUser from "./pages/Admin/ManageUser/index";
import ManageStatistical from "./pages/Admin/ManageStatistical/index";
import ManageHire from "./pages/Admin/ManageHire/index";
import ViewDetailCar from "./pages/Admin/ViewDetailCar";
import ViewDetailTicket from "./pages/Admin/ViewDetailTicket/index";
import ProtectedRoleUser from "./templates/protectedRoleUser";
import ViewDetailAddress from "./pages/Admin/ViewDetailAddress";
import Rating from "./pages/Rating";
import ViewDetailUser from "./pages/Admin/ViewDetailUser";
import ViewDetailCareer from "./pages/Admin/ViewDetailCareer";
import ManageResume from "./pages/Admin/ManageResume";
import ViewDetailResume from "./pages/Admin/ViewDetailResume";
import DriverTemplate from "./templates/driver";
import ManageMyCar from "./pages/Driver/ManageMyCar";
import ManageUserProfile from "./pages/Driver/ManageUserProfile";
import ManageInfoBus from "./pages/Driver/ManageInfoBus";
import ManageSeatOfCar from "./pages/Admin/ManageSeatOfCar";
import ViewDetailBusInfo from "./pages/Admin/ViewDetailBusInfo";
import ConfirmAccount from "./pages/confirmAccount/confirmAccount";
import ViewDetailBusInfoByDriver from "./pages/Driver/ViewDetailBusInfoByDriver";
import ManageSeatOfCarByDriver from "./pages/Driver/ManageSeatOfCarByDriver";
import ViewDetailRate from "./pages/Admin/ViewDetailRate";
import "./i18n/i18n";
import PageNotFound from "./pages/pageNotFound";
import ProtectedRouteDriver from "./templates/protectedRouteDriver";
import { useEffect } from "react";
import PageErrorPermission from "./pages/pageErrorPermission";

function App() {
  return (
    <div>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/error-permission" element={<PageErrorPermission />} />

          <Route path="/confirm/:token" element={<ConfirmAccount />} />
          <Route element={<ProtectedRoleUser />}>
            <Route element={<UserTemplate />}>
              <Route path="/" element={<Home />} />
              <Route path="/lich-trinh" element={<Schedule />} />
              <Route path="/tin-tuc" element={<News />} />
              <Route path="/tuyen-dung" element={<Hire />} />
              <Route path="/tuyen-dung/:id" element={<HireDetail />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/ve-chung-toi" element={<AboutUs />} />
              <Route
                path="/dat-ve-xe"
                element={
                  // <ProtectedRoute>
                  <BookingTicket />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lich-su-dat-ve"
                element={
                  <ProtectedRoute>
                    <HistoryOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/danh-gia/:id"
                element={
                  <ProtectedRoute>
                    <Rating />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route element={<UserTemplate />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Home />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            element={
              <ProtectedRouteAdmin>
                <AdminTemplate />
              </ProtectedRouteAdmin>
            }
          >
            <Route path="/admin/manage-car" element={<ManageCar />} />
            <Route
              path="/admin/manage-seat-of-car/:id"
              element={<ManageSeatOfCar />}
            />
            <Route path="/admin/manage-car/:id" element={<ViewDetailCar />} />
            <Route path="/admin/manage-ticket" element={<ManageTicket />} />
            <Route
              path="/admin/manage-ticket/:id"
              element={<ViewDetailTicket />}
            />
            <Route
              path="/admin/manage-bus-station"
              element={<ManageBusStation />}
            />
            <Route
              path="/admin/manage-bus-station/:id"
              element={<ViewDetailAddress />}
            />
            <Route
              path="/admin/manage-bus-information"
              element={<ManageBusInformation />}
            />
            <Route
              path="/admin/manage-info-bus/:id"
              element={<ViewDetailBusInfo />}
            />
            <Route path="/admin/manage-user" element={<ManageUser />} />
            <Route path="/admin/manage-user/:id" element={<ViewDetailUser />} />
            <Route
              path="/admin/manage-statistical"
              element={<ManageStatistical />}
            />
            <Route path="/admin/manage-hire" element={<ManageHire />} />
            <Route
              path="/admin/manage-hire/:id"
              element={<ViewDetailCareer />}
            />
            <Route path="/admin/manage-resume" element={<ManageResume />} />
            <Route
              path="/admin/manage-resume/:id"
              element={<ViewDetailResume />}
            />
            <Route path="/admin/manage-rate/:id" element={<ViewDetailRate />} />
          </Route>

          <Route
            element={
              <ProtectedRouteDriver>
                <DriverTemplate />
              </ProtectedRouteDriver>
            }
          >
            <Route path="/driver/manage-my-car" element={<ManageMyCar />} />
            <Route
              path="/driver/manage-profile"
              element={<ManageUserProfile />}
            />
            <Route path="/driver/manage-info-bus" element={<ManageInfoBus />} />
            <Route
              path="/driver/manage-info-bus/:id"
              element={<ViewDetailBusInfoByDriver />}
            />
            <Route
              path="/driver/manage-seat-of-car/:id"
              element={<ManageSeatOfCarByDriver />}
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
