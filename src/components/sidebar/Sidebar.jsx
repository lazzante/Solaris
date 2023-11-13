import "./Sidebar.scss";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
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
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BiotechIcon from "@mui/icons-material/Biotech";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
          <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
          <img src="/gunamlogo.png" alt="gunamLogo" style={{width:"90px"}}/>
          <span className="logo">solaris</span>
          </div>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Homepage</span>
            </li>
          </Link>
          <Link to="/logs" style={{ textDecoration: "none" }}>
            <li>
              <TextSnippetIcon className="icon" />
              <span>Logs</span>
            </li>
          </Link>
          <Link to="/equipments" style={{ textDecoration: "none" }}>
            <li>
              <PrecisionManufacturingIcon className="icon" />
              <span>Equipments</span>
            </li>
          </Link>
          <Link to="/labratories" style={{ textDecoration: "none" }}>
            <li>
              <BiotechIcon className="icon" />
              <span>Laboratories</span>
            </li>
          </Link>

          <p className="title">ADMIN</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIcon className="icon" />
              <span>Projects</span>
            </li>
          </Link>

          <Link to="/equipmentAuth" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>Equipment Authorization</span>
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
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          {/* <li>
            <AccountBoxIcon className="icon" />
            <span>Profile</span>
          </li> */}
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
