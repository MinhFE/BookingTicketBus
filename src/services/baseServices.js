/* eslint-disable no-mixed-operators */
import axios from "axios";
import { API_URL_DOMAIN } from "../utils/constant";
import { history } from "../utils/history";
import { getStringLocal } from "../utils/config";

let token = "";

const setToken = () => {
  if (getStringLocal("token")) {
    token = getStringLocal("token");
  }
};

export const get = (url, ...params) => {
  setToken();

  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    params: params,
    method: "GET",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const post = (url, data) => {
  setToken();
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "POST",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // timeout: 1000,
    data: JSON.stringify(data),
  });
};
export const patch = (url, data) => {
  setToken();
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "PATCH",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    timeout: 1000,
    data: JSON.stringify(data),
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const put = (url, data) => {
  setToken();
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "PUT",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // timeout: 1000,
    data: JSON.stringify(data),
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const remove = (url, ids) => {
  setToken();
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "DELETE",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: JSON.stringify(ids),
    // timeout: 1000
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const postForm = (url, data) => {
  setToken();
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "POST",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
    },
    // timeout: 1000,
    data: data,
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const putForm = (url, data) => {
  setToken();
  // console.log(url,"url","data",data)
  return axios({
    baseURL: API_URL_DOMAIN,
    url: url,
    method: "POST",
    responseType: "json",
    responseEncoding: "utf8",
    headers: {
      "Content-Type": "application/json",
    },
    // timeout: 1000,
    data: data,
  }).catch(
    (err) =>
      err.response.status === 401 ||
      (err.response.status === 403 && history.push("/login"))
  );
};

export const BaseApi = {
  get,
  post,
  put,
  remove,
  postForm,
  putForm,
  patch
};
