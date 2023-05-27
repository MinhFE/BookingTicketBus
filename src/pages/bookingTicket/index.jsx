import { Steps } from "antd";
import { useState } from "react";
import "./style.scss";
import RouteConfirmation from "./../../components/steps/RouteConfirmation";
import InformationCustomer from "./../../components/steps/InformationCustomer";
import Payment from "./../../components/steps/Payment";
import { useDispatch } from "react-redux";
import { CallApiGetScheduleByTicketId } from "./../../redux/reducers/scheduleReducer";
import { useSelector } from "react-redux";
import ConfirmRouting from "./../../components/steps/ConfirmRouting";
import { CreateNewTicketAction } from "../../redux/reducers/ticketReducer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BookingTicket = () => {
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate();
  const { t } = useTranslation("schedule");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const scheduleById = useSelector(
    (state) => state.ScheduleReducer.scheduleById
  );
  const [current, setCurrent] = useState(0);
  const [showChair, setShowChair] = useState(false);
  const [booked, setBooked] = useState([]);
  const [activeClass, setActiveClass] = useState([]);
  const [open, setOpen] = useState(false);
  // const [chairExist, setChairExist] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    totalMoney: totalPrice,
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    seats: activeClass,
  });
  // console.log("scheduleById: ", scheduleById);
  // const onChange = (value) => {
  //   setCurrent(value);
  // };
  // const handleChangeFilterBooking = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const onChangeChoose = async (scheduleId) => {
    const { data } = await dispatch(CallApiGetScheduleByTicketId(scheduleId));
    // console.log(data);
    if (Object.keys(data).length > 0) {
      if (!showChair && data.id === scheduleId) {
        setShowChair(true);
      } else {
        setShowChair(false);
      }
    }
  };
  const handleContinueStep = () => {
    if (token) {
      setCurrent(1);
    } else {
      setOpen(true);
    }
  };
  const handleContinueConfirmRouteStep = () => {
    setCurrent(2);
  };

  const handleContinueStepInfo = () => {
    dispatch(CreateNewTicketAction(customerInfo, scheduleById.id));
    setCurrent(3);
  };

  const handleRenderSteps = () => {
    if (current === 0) {
      return (
        <RouteConfirmation
          // handleChangeFilterBooking={handleChangeFilterBooking}
          onChangeChoose={onChangeChoose}
          showChair={showChair}
          booked={booked}
          setBooked={setBooked}
          handleContinueStep={handleContinueStep}
          activeClass={activeClass}
          setActiveClass={setActiveClass}
          open={open}
          setOpen={setOpen}
          // chairExist={chairExist}
          // setChairExist={setChairExist}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      );
    } else if (current === 1) {
      return (
        <ConfirmRouting
          booked={booked}
          setBooked={setBooked}
          handleContinueConfirmRouteStep={handleContinueConfirmRouteStep}
          setCurrent={setCurrent}
        />
      );
    } else if (current === 2) {
      return (
        <InformationCustomer
          handleContinueStepInfo={handleContinueStepInfo}
          setCurrent={setCurrent}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          activeClass={activeClass}
          totalPrice={totalPrice}
        />
      );
    } else {
      return (
        <Payment
          customerInfo={customerInfo}
          booked={booked}
          setCurrent={setCurrent}
        />
      );
    }
  };

  return (
    <div className="booking">
      <Steps
        current={current}
        // onChange={onChange}
        items={[
          {
            title: t("pay.CHỌN TUYẾN"),
          },
          {
            title: t("pay.XÁC NHẬN LỘ TRÌNH"),
          },
          {
            title: t("pay.THÔNG TIN HÀNH KHÁCH"),
          },
          {
            title: t("pay.THANH TOÁN"),
          },
        ]}
      />
      {handleRenderSteps()}
    </div>
  );
};

export default BookingTicket;
