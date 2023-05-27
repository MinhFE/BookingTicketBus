import React, { useEffect, useState } from "react";
import { Column, Bar } from "@ant-design/charts";
import axios from "axios";
import constant from "../../../constant";
import { notification } from "antd";

const ManageStatistical = () => {
  // Khởi tạo dữ liệu để hiển thị
  const [data, setData] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [year, setYear] = useState("2023");
  const handleGetDataByMonth = async (year) => {
    axios
      .get(`${constant._SERVER_LINK}/ticket/statistic-by-month/${year}`)
      .then((r) => r.data)
      .then((d) => {
        const data = d.map((d) => {
          d.total = parseInt(d.total);
          return d;
        });
        setData([...data]);
      });
    setIsToggle(false);
  };
  useEffect(() => {
    handleGetDataByMonth(year);
  }, []);
  const handleGetDataByUser = async (year) => {
    axios
      .get(`${constant._SERVER_LINK}/ticket/statistic-by-user/${year}`)
      .then((r) => r.data)
      .then((d) => {
        const data = d.map((d) => {
          d.money = parseInt(d.money);
          return d;
        });
        setData([...data]);
      });
    setIsToggle(true);
  };
  // Cấu hình biểu đồ
  const config = {
    data: data,
    xField: !isToggle ? "month" : "user_name",
    yField: !isToggle ? "total" : "money",
    height: 400,
    title: {
      text: "Biểu đồ doanh thu theo năm",
      style: { fontSize: 20, fontWeight: 600 },
    },
    xAxis: {
      label: {
        style: { fontSize: 14 },
      },
    },
    yAxis: {
      label: {
        style: { fontSize: 14 },
      },
    },
    barSize: 80,
  };

  // Trả về biểu đồ cột hoặc thanh
  const handleChange = (e) => {
    const { value } = e.target;
    setYear(value);
    if (value === "") {
      if (!isToggle) {
        handleGetDataByMonth(parseInt(2023));
      } else {
        handleGetDataByUser(parseInt(2023));
      }
      return;
    }
    if (value.length > 4) {
      return notification.info({
        message: "Số năm không lớn hơn 4 kí tự, vui lòng nhập lại !",
        duration: 4,
      });
    } else {
      if (!isToggle) {
        handleGetDataByMonth(parseInt(value));
      } else {
        handleGetDataByUser(parseInt(value));
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 50,
        }}
      >
        <div className="">
          <button
            onClick={() => handleGetDataByMonth(year)}
            type="button"
            style={{
              padding: "10px",
              fontSize: 18,
              marginRight: 10,
              background: !isToggle && "#6395F9",
              color: !isToggle && "white",
            }}
          >
            Thống kê theo doanh thu
          </button>
          <button
            onClick={() => {
              handleGetDataByUser(year);
            }}
            type="button"
            style={{
              padding: "10px",
              fontSize: 18,
              marginRight: 10,
              background: isToggle && "#6395F9",
              color: isToggle && "white",
            }}
          >
            Top khách hàng
          </button>
        </div>

        <div className="">
          <h3>Nhập số năm</h3>
          <input
            value={year}
            type="number"
            style={{ padding: 5 }}
            onChange={handleChange}
          />
        </div>
      </div>
      {data.length <= 0 ? (
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Hiện tại không có dữ liệu
        </h1>
      ) : (
        <div>
          <h2 style={{ width: "100%", textAlign: "center", marginBottom: 20 }}>
            {!isToggle ? "Thống kê doanh thu theo năm" : "Top 10 khách hàng"}
          </h2>
          <Column {...config} columnStyle={{ width: "100px" }} />
        </div>
      )}
    </>
  );
};

export default ManageStatistical;
