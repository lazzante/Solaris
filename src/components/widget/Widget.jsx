import React, { useEffect, useState } from "react";
import "./Widget.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useSelector } from "react-redux";
import axios from "axios";

const Widget = ({ type }) => {



  let data;

  switch (type) {
    case "users":
      data = {
        title: "USER",
        nodataCount: "View all users",
        data: `Welcome `,
        otherData: ``,
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;

    case "logs":
      data = {
        title: "LOGS",
        dataCount: "You have 22 logs",
        data: ``,
        icon: (
          <TextSnippetIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;

    case "projects":
      data = {
        title: "PROJECTS",
        dataCount: "You have 8 projects",
        data: "Your Projects",
        icon: (
          <AssignmentIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;

    case "equipments":
      data = {
        title: "YOUR EQUIPMENTS",
        dataCount: "You have 3 equipments",
        data: ``,
        icon: (
          <PrecisionManufacturingIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };

      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>

        <span className="counter">{data.data}</span>

        <span className="link">{data.dataCount}</span>
      </div>

      <div className="right">
        <div className="percentage positive"></div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
