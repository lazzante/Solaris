import "./Titles.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import {
  positionColumns,
  titleColumns,
} from "../../components/datatable/datatablesource";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Titles = () => {
  const [titlesData, setTitlesData] = useState([]);

  let allTitles;

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const getAllTitles = await axios
        .get("http://144.122.47.188:8080/title/getAll")
        .then((response) => {
          allTitles = response.data;
          setTitlesData(allTitles);
          console.log(allTitles);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <div
            onClick={() => handleDelete(params.row.id)}
            className="deleteButton"
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://144.122.47.188:8080/title/delete/${id}`
      );
      setTitlesData(titlesData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <div className="datatableTitle">
            Titles
            <Link to="/titles/newTitle" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={titlesData}
            columns={titleColumns.concat(actionColumn)}
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

export default Titles;
