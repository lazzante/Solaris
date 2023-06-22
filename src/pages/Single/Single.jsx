import "./Single.scss";
import { React, useState, useEffect, Children } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import userLogo from "./user.png";
import { async } from "@firebase/util";
import axios from "axios";

const Single = ({ inputs }) => {
  const userId = useSelector((state) => state.userId.value);
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUserById(userId);
  }, []);

  const getUserById = async (id) => {
    console.log(id);
    const user = await axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSelectedUserTables = async (id) => {
    const role = await axios.get(``);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
            >
              Edit
            </div>
            <div className="title">Information</div>
            <div className="item">
              <img src={user.img || userLogo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {"   " + user.firstname + " " + user.lastname}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{user.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Titles:</span>
                  <span className="itemValue">
                    {user.titles
                      ? user.titles.map((title) => title.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Division:</span>
                  <span className="itemValue">
                    {user.divisions
                      ? user.divisions.map((division) => division.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Position:</span>
                  <span className="itemValue">
                    {user.positions
                      ? user.positions.map((position) => position.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">
                    {user.authorities
                      ? user.authorities.map((role) => role.name + ",")
                      : "Empty"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isEdit && (
            <div className="right">
              <div
                className="closeButton"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(false);
                }}
              >
                Close
              </div>
              <form>
                <div>
                  <label>First Name</label>
                  &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    value={user.firstname}
                  ></input>
                </div>
                <div>
                  <label>Last Name</label>
                  &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    value={user.lastname}
                  ></input>
                </div>
                <div>
                  <label>Username</label>
                  &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    value={user.username}
                  ></input>
                </div>
                <div>
                  <label>Title</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    value={user.titles.map((title) => title.name)}
                  ></input>
                </div>
                <div>
                  <label>Title Short</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    value={user.title_short}
                  ></input>
                </div>
                <div>
                  <label>Division</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    defaultValue={user.division}
                  ></input>
                </div>
                <div>
                  <label>Position</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    defaultValue={user.position}
                  ></input>
                </div>
                <div>
                  <label>Role</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    defaultValue={user.role}
                  ></input>
                </div>

                <div>
                  <label>Email</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    defaultValue={user.email}
                  ></input>
                </div>

                <div className="formInput">
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Single;
