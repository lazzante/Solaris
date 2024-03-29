import "./Divisions.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { divisionColumns } from "../Users/datatablesource";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";

const Divisions = () => {
   
 //GİRİŞ YAPINCA AUTHORİTY KONTROL
 const [hasAuthority, setHasAuthority] = useState();

 const userRoles = useSelector(
   (state) => state.detailSetter.value.authorities
 );
 let roleNames;


  const [divisionsData, setDivisionsData] = useState([]);

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
      const getAllDivisions = await axios
        .get(`http://localhost:8080/division/getAll`)
        .then((response) => {
          if(response?.data){
            setDivisionsData(response.data);

          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/division/delete/${id}`
      );
      if (res) {
        setDivisionsData(divisionsData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
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

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        

{hasAuthority ?(
        <div className="dataTable">
          <div className="datatableTitle">
            <h2>Divisions</h2>
            <Link to="/divisions/newDivision" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            sx={{ height: "900px" }}
            className="datagrid"
            rows={divisionsData}
            columns={divisionColumns.concat(actionColumn)}
            getRowId={(row: any) => generateRandom()}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>):(<CantAccess/>)}


      </div>
    </div>
  );
};

export default Divisions;
