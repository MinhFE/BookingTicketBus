/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Pagination, Select } from "antd";
import { GetOneTicketDetailAction } from "../../../redux/reducers/admin/manageTicketReducer";
import "./style.scss";
import { GetListTicketAction } from "./../../../redux/reducers/admin/manageTicketReducer";

const ManageTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetListTicketAction());
  }, []);
  const listTicket = useSelector(
    (state) => state.ManageTicketReducer.listTicket
  );
  const [listTicketClone, setListTicketClone] = useState([]);
  const [current, setCurrent] = useState(1);
  const [filtered, setFiltered] = useState(listTicket);

  useEffect(() => {
    setListTicketClone(listTicket.slice(0, 10));
  }, [listTicket]);

  const handleViewDetailTicket = async (ticketId) => {
    await dispatch(GetOneTicketDetailAction(ticketId));
    navigate(`/admin/manage-ticket/${ticketId}`);
  };
  const handleChange = (value) => {
    // console.log(value);
    if (value === "All") {
      setListTicketClone(listTicket.slice(0, 10));
      setFiltered(listTicket);
    } else {
      const filteredd = listTicket.filter((item) => item.status === value);
      setFiltered(filteredd);
      setListTicketClone(filteredd);
    }
  };

  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setListTicketClone(filtered.slice(10 * (e - 1), e * 10));
  };
  const handleFilterTicketById = (value) => {
    if (value) {
      const filteredTmp = [...listTicket];
      const listFilterTmp = filteredTmp.filter((item) => {
        return item.id === Number(value);
        // return item.username === value;
      });
      setListTicketClone(listFilterTmp);
      setFiltered(listFilterTmp);
    } else {
      // if (filtered.length > 0) {
      //   setListUsersFilter(filtered);
      // } else {
      setListTicketClone(listTicket.slice(0, 10));
      setFiltered(listTicket);
      // }
    }
  };
  return (
    <div className="manage-ticket">
      <div className="manage-ticket__top">
        <div className="manage-ticket__top__item">
          {/* <p>Lọc theo:</p>
          <Select
            defaultValue="All"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              { value: "All", label: "All" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
              { value: "waiting", label: "Waiting" },
            ]}
          /> */}
          <Input.Search
            placeholder="Nhập ID vé"
            // enterButton="Search"
            size="large"
            style={{ width: "100%" }}
            onChange={(e) => handleFilterTicketById(e.target.value)}
            onSearch={handleFilterTicketById}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID vé</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Lịch trình</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listTicketClone.length > 0 &&
            listTicketClone.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={
                    item.status === "completed"
                      ? { background: "#22cc22", color: "white" }
                      : item.status === "waiting"
                      ? { background: "#cccc23", color: "white" }
                      : { background: "red", color: "white" }
                  }
                >
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.status}</td>
                  <td>{`${item.schedule.departureAddress.city} - ${item.schedule.destinationAddress.city}`}</td>
                  <td>
                    <Button onClick={() => handleViewDetailTicket(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="bus-info__pagination">
        {filtered.length > 0 ? (
          <Pagination
            current={current}
            total={filtered.length}
            onChange={handleChangeSliceCareerList}
          />
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
    </div>
  );
};

export default ManageTicket;
