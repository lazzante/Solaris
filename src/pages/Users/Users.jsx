import "./Users.scss";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserId } from "../../Redux/userIdSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getAuth } from "firebase/auth";
//USERS TABLE
const Users = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [titleData, setTitleData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [authority, setAuthority] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);

  //SAYFAYA GİRİŞ YETKİSİ VARMI KONTROL EDEN USESTATE
  const [hasAuthority, setHasAuthority] = useState();

  let allUsers;
  const userRoles = useSelector(
    (state) => state.detailSetter.value.authorities
    //
  );

  let roleNames;

  useEffect(() => {
    if (userRoles !== undefined) {
      console.log(userRoles);
      roleNames = userRoles.map((role) => role.name);
      userRoles.map((role) => {
        role.name === "ADMIN" ? setHasAuthority(true) : setHasAuthority(false);
      });
    } else {
      setHasAuthority(false);
    }

    const fetchData = async () => {
      let list = [];
      const getAllUsers = await axios
        .get(`http://localhost:8080/user/getAll`)
        .then((response) => {
          if(response?.data){
          setData(response.data);
          setAuthority(response.data.authorities);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/user/delete/${id}`);
      setData(data.filter((item) => item.id !== id));
      getAuth().deleteUser(data.uid); //BURDA KALDIM
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
    {
      field: "uid",
      headerName: "UID",
      width: 100,
      renderHeader: () => <strong>{"uid "}</strong>,
    },
    {
      field: "firstname",
      headerName: "First Name",
      width: 150,
      renderHeader: () => <strong>{"First Name "}</strong>,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      renderHeader: () => <strong>{"Last Name "}</strong>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      renderHeader: () => <strong>{"Email "}</strong>,
    },
    {
      field: "password",
      headerName: "Password",
      width: 100,
      renderHeader: () => <strong>{"Password "}</strong>,
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      renderHeader: () => <strong>{"Username "}</strong>,
    },
    {
      field: `titles`,
      valueGetter: (params) => {
        return `${params.row.titles.map((title) => title.name)}`;
      },
      headerName: "Titles",
      width: 100,
      renderHeader: () => <strong>{"Titles "}</strong>,
    },
    {
      field: `divisions`,
      valueGetter: (params) => {
        return `${params.row.divisions.map((division) => division.name)}`;
      },
      headerName: "Divisions",
      width: 100,
      renderHeader: () => <strong>{"Divisions "}</strong>,
    },
    {
      field: `positions`,
      valueGetter: (params) => {
        return `${params.row.positions.map((position) => position.name)}`;
      },
      headerName: "Positions",
      width: 100,
      renderHeader: () => <strong>{"Positions "}</strong>,
    },

    {
      field: `authorities`,
      valueGetter: (params) => {
        return `${params.row.authorities.map((authority) => authority.name)}`;
      },
      headerName: "Roles",
      width: 100,
      renderHeader: () => <strong>{"Authorities "}</strong>,
    },
    // {
    //   field: `equipments`,
    //   valueGetter: (params) => {
    //     return `${params.row.equipments.map((eq) => eq.name)}`;
    //   },
    //   headerName: "Equipments",
    //   width: 100,
    //   renderHeader: () => <strong>{"Equipments "}</strong>,
    // },
  ];

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderHeader: () => <strong>{"Action "}</strong>,
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
              <RemoveRedEyeIcon />
            </div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverIcon />
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
  {
    {
      return hasAuthority === true ? (
        <div className="datatable">
          <div className="datatableTitle">
            <h2 style={{ color: "#F49F3C" }}>Users</h2>
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            sx={{ height: "900px" }}
            className="datagrid"
            rows={data}
            columns={columns.concat(actionColumn)}
            getRowId={(row: any) => generateRandom()}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      ) : (
        <CantAccess />
      );
    }
  }
};
export default Users;
