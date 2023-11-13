import "./Labratories.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Labratories = () => {
  const [labratoryData, setLabratoryData] = useState([]);

  let allLabratories;

  //LIST ALL OPERATION WHEN PAGE OPEN
  useEffect(() => {
    const fetchData = async () => {
      const getAllLabratories = await axios
        .get(`http://localhost:8080/labratory/getAll`)
        .then((response) => {
          setLabratoryData(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  //DELETE OPERATION
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/labratory/delete/${id}`
      );
      setLabratoryData(labratoryData.filter((item) => item.id !== id));
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

  //GENERATING RANDOM NUMBERS FOR TABLE CELLS (MUST OF MUI)
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

  //TABLE COLUMNS
  const columns = [
    { field: "name", headerName: "Name", width: 75 },
    { field: "bina", headerName: "Building", width: 75 },
    {
      field: `labratoryDivisions`,
      valueGetter: (params) => {
        return `${params.row.labratoryDivisions.map((lab) => lab.name)}`;
      },
      headerName: "Divisions",
      width: 150,
    },
  ];

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          {/* <Navbar /> */}
          <div className="dataTable">
            <div className="datatableTitle">
              <h2>Laboratories</h2>
              <Link to="/labratories/newLabratory" className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              sx={{ height: "900px" }}
              className="datagrid"
              rows={labratoryData}
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
        </div>
      </div>
    </div>
  );
};

export default Labratories;
