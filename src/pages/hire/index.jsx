/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Image, Select, Typography, Pagination } from "antd";
import { hire } from "../../utils/menuData";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
// import { CallApiGetListCareers } from "./../../redux/reducers/careerReducer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseApi } from "../../services/baseServices";
import { API_URL_DOMAIN } from "../../utils/constant";

const Hire = () => {
  const { t } = useTranslation("recruitment");
  const dispatch = useDispatch();
  // const listCareers = useSelector((state) => state.CareerReducer.listCareers);
  const [listCareers, setListCareers] = useState([]);
  const [dataCareer, setDataCareer] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filter, setFilter] = useState({
    name: "",
    level: "",
    formality: "",
    experience: "",
    workspace: "",
  });
  const handleSearch = () => {
    let list = [...listCareers];
    if (filter.name) {
      list = list.filter(
        (item) => item.name.toLowerCase() === filter.name.toLowerCase()
      );
    }
    if (filter.level) {
      list = list.filter(
        (item) => item.level.toLowerCase() === filter.level.toLowerCase()
      );
    }
    if (filter.formality) {
      list = list.filter(
        (item) =>
          item.formality.toLowerCase() === filter.formality.toLowerCase()
      );
    }
    if (filter.experience) {
      list = list.filter(
        (item) =>
          item.experience.toLowerCase() === filter.experience.toLowerCase()
      );
    }
    if (filter.workspace) {
      list = list.filter(
        (item) =>
          item.workspace.toLowerCase() === filter.workspace.toLowerCase()
      );
    }
    setDataCareer(list.slice(0, 10));
    setFiltered(list);
  };
  const [current, setCurrent] = useState(1);
  // const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getListCareers = async () => {
      try {
        const result = await BaseApi.get(API_URL_DOMAIN + "/career");
        setListCareers(result.data.filter((item) => item.isActive === true));
        setDataCareer(
          result.data.filter((item) => item.isActive === true).slice(0, 10)
        );
        setFiltered(result.data.filter((item) => item.isActive === true));
        // console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListCareers();
  }, []);
  const handleChangeSliceCareerList = (e) => {
    setCurrent(e);
    setDataCareer(filtered.slice(10 * (e - 1), e * 10));
  };

  return (
    <div className="hire">
      <Image
        preview={false}
        className="hire__banner"
        src="https://vieclam.futabus.vn/Images/tuyendung_pn4_20190820.jpg"
        alt=""
      />
      <div className="hire__list">
        <div className="hire__control">
          <p>{t("recruitment.Tên công việc")}</p>
          <Select
            showSearch
            className="hire__control--select"
            onChange={(value) => {
              setFilter({ ...filter, name: value });
            }}
            placeholder={`--${t("recruitment.Chọn công việc")}--`}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={hire.nameWork.map((item) => {
              return { label: t(`job.${item.label}`), value: item.value };
            })}
          />
        </div>
        <div className="hire__control">
          <p>{t("recruitment.Cấp bậc")}</p>
          <Select
            showSearch
            className="hire__control--select"
            onChange={(value) => {
              setFilter({ ...filter, level: value });
            }}
            placeholder={`--${t("recruitment.Chọn cấp bậc")}--`}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={hire.levelWork.map((item) => {
              return { label: t(`rank.${item.label}`), value: item.value };
            })}
          />
        </div>
        <div className="hire__control">
          <p>{t("recruitment.Hình thức")}</p>
          <Select
            showSearch
            className="hire__control--select"
            onChange={(value) => {
              setFilter({ ...filter, formality: value });
            }}
            placeholder={`--${t("recruitment.Chọn hình thức")}--`}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={hire.formWork.map((item) => {
              return { label: t(`form.${item.label}`), value: item.value };
            })}
          />
        </div>
        <div className="hire__control">
          <p>{t("recruitment.Số năm kinh nghiệm")}</p>
          <Select
            showSearch
            className="hire__control--select"
            onChange={(value) => {
              setFilter({ ...filter, experience: value });
            }}
            placeholder={`--${t("recruitment.Chọn kinh nghiệm")}--`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={hire.expWork.map((item) => {
              return {
                label: t(`experience.${item.label}`),
                value: item.value,
              };
            })}
          />
        </div>
        <div className="hire__control">
          <p>{t("recruitment.Tỉnh/TP")}</p>
          <Select
            showSearch
            className="hire__control--select"
            onChange={(value) => {
              setFilter({ ...filter, workspace: value });
            }}
            placeholder={`--${t("recruitment.Chọn Tỉnh/TP")}--`}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={hire.locationWork.map((item) => {
              return { label: t(`city.${item.label}`), value: item.value };
            })}
          />
        </div>
      </div>
      <Button className="hire__btn-search" onClick={handleSearch}>
        <i className="fas fa-search"></i>
        {t("recruitment.Tìm kiếm")}
      </Button>
      {dataCareer.length > 0 ? (
        <div className="hire__data">
          {dataCareer.length > 0 &&
            dataCareer.map((item) => {
              return (
                <Link
                  key={item.id}
                  className="hire__data__item"
                  to={`/tuyen-dung/${item.id}`}
                >
                  <Typography.Title level={5}>{item.name}</Typography.Title>
                  <div className="hire__data__item--bottom">
                    <p>
                      <i className="fas fa-map-marker-alt"></i>
                      {item.workspace}
                    </p>
                    <p>
                      <i className="fas fa-dollar-sign"></i>
                      {Number(item.salary).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          <div className="hire__data__bottom">
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
      ) : (
        <p className="hire__empty">
          {t("recruitment.Không tìm thấy kết quả phù hợp")}
        </p>
      )}
    </div>
  );
};

export default Hire;
