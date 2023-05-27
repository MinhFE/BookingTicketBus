import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Button } from "antd";
const PageErrorPermission = () => {
  const navigate = useNavigate();
  return (
    <div className="page-error-permission">
      <p className="title">403</p>
      <p className="status">Ooops!!</p>
      <p className="description">
        Unfortunately, you don't have permission to view this page.
      </p>
      <Button type="primary" size="large" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};

export default PageErrorPermission;
