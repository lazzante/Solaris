import "./Sidebar.scss";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import NotificationsIcon from "@mui/icons-material/Notifications";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SchoolIcon from "@mui/icons-material/School";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TitleIcon from "@mui/icons-material/Title";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">solaris</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">ADMIN</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/roles" style={{ textDecoration: "none" }}>
            <li>
              <TheaterComedyIcon className="icon" />
              <span>Roles</span>
            </li>
          </Link>
          <Link to="/titles" style={{ textDecoration: "none" }}>
            <li>
              <TitleIcon className="icon" />
              <span>Titles</span>
            </li>
          </Link>
          <Link to="/divisions" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Divisions</span>
            </li>
          </Link>
          <Link to="/positions" style={{ textDecoration: "none" }}>
            <li>
              <AccessibilityNewIcon className="icon" />
              <span>Positions</span>
            </li>
          </Link>

          <p className="title">SERVICE</p>

          <li>
            <HealthAndSafetyIcon className="icon" />
            <span>System Health </span>
          </li>
          <li>
            <TextSnippetIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountBoxIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
