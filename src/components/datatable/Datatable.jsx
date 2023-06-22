import "./Datatable.scss";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColums,
  titleColumns,
  divisionColumns,
  positionColumns,
} from "./datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { changeUserId } from "../../Redux/userIdSlice";
import axios from "axios";
import New from "../../pages/New/New";

//USERS TABLE
const Datatable = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [titleData, setTitleData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [authorityData, setAuthority] = useState([]);

  let allUsers;

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const getAllUsers = await axios
        .get("http://localhost:8080/user/getAll")
        .then((response) => {
          setData(response.data);
          console.log(response.data);

          setAuthority(response.data.authorities);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/user/delete/${id}`);

      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserId = (id) => {
    dispatch(changeUserId(id));
    navigate(`/users/${id}`);
  };

  //TABLE COLUMNS
  const columns = [
    { field: "uid", headerName: "UID", width: 100 },
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "password", headerName: "Password", width: 100 },
    { field: "username", headerName: "Username", width: 100 },
    {
      field: `titles`,
      valueGetter: (params) => {
        return `${params.row.titles.map((title) => title.name)}`;
      },
      headerName: "Titles",
      width: 100,
    },
    {
      field: `divisions`,
      valueGetter: (params) => {
        return `${params.row.divisions.map((division) => division.name)}`;
      },
      headerName: "Divisions",
      width: 100,
    },
    {
      field: `positions`,
      valueGetter: (params) => {
        return `${params.row.positions.map((position) => position.name)}`;
      },
      headerName: "Positions",
      width: 100,
    },

    {
      field: `authorities`,
      valueGetter: (params) => {
        return `${params.row.authorities.map((authority) => authority.name)}`;
      },
      headerName: "Roles",
      width: 100,
    },
  ];

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link
            to={`/users/${params.row.uid}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="viewButton"
              onClick={(e) => {
                e.preventDefault();
                handleUserId(params.row.id);
              }}
            >
              View
            </div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      );
    },
  };
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div>Users</div>
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        getRowId={(row: any) => generateRandom()}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
