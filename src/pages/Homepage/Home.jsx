import { React, useState, useEffect } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  // const userId = useSelector((state) => state.userId.value);
  // const [user, setUser] = useState({});
  // const getUserById = async (id) => {
  //   console.log(id);
  //   const user = await axios
  //     .get(`http://localhost:8080/user/${id}`)
  //     .then((response) => {
  //       setUser(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   getUserById(userId);
  // }, []);

  //role===ADMIN olucak
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured />
          <Chart aspect={2 / 1} title={"Last 6 Months (Revenue)"} /> */}
        </div>
        <div className="listContainer">
          {/* <div className="listTitle">Latest Transactions</div>
          <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
