import "./CantAccess.scss";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";

const CantAccess = () => {
  return (
    <div className="cantAccess">
      <div className="problem">
        <LockIcon className="icon" />
        <h1>You Can't Access This Page !</h1>

        <p>You do not have enough authority. </p>
      </div>
    </div>
  );
};

export default CantAccess;
