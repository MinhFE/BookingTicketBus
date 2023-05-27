import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Button } from "antd";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <p className="title">404</p>
      <p className="status">Ooops!!</p>
      <p className="description">that page doesn't exist or is unavailable</p>
      <Button type="primary" size="large" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};

export default PageNotFound;
