import "./Divisions.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import {
  divisionColumns,
  positionColumns,
} from "../../components/datatable/datatablesource";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";


const Divisions = () => {
  const [divisionsData, setDivisionsData] = useState([]);



  useEffect(() => {

    const fetchData = async () => {
      let list = [];
      const getAllDivisions = await axios
        .get("http://localhost:8080/division/getAll")
        .then((response) => {
          setDivisionsData(response.data);
          console.log(response);
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
      setDivisionsData(divisionsData.filter((item) => item.id !== id));
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
   
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <div className="datatableTitle">
            Divisions
            <Link to="/divisions/newDivision" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
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
        </div>
      </div>
    </div>
  );
};

export default Divisions;
