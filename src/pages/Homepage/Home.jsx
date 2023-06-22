import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CantAccess from "../Error/CantAccess";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const role = currentUser.role;
  //role===ADMIN olucak
  if (!role) {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart aspect={2 / 1} title={"Last 6 Months (Revenue)"} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    );
  } else {
    return <CantAccess />;
  }
};

export default Home;
