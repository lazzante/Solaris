import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./Logs.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Logs = () => {
  const [logsData, setLogsData] = useState([]);

  let allLogs;

  //LIST ALL OPERATION WHEN PAGE OPEN
  useEffect(() => {
    const fetchData = async () => {
      const getAllLogs = await axios
        .get("http://localhost:8080/log/getAll")
        .then((response) => {
          console.log("RESPO",response);
          setLogsData(response.data);
          console.log(allLogs);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  //DELETE OPERATION
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/log/delete/${id}`);
      setLogsData(logsData.filter((item) => item.id !== id));
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
            <DeleteForeverIcon/>
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
    {
      field: `equipments`,
      valueGetter: (params) => {
        return `${params.row.equipments.map((eq) => eq.name)}`;
      },
      headerName: "Equipments",
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
    { field: "date", headerName: "Date", width: 75 },
    { field: "time", headerName: "Time", width: 75 },
    { field: "operation", headerName: "Operation", width: 75 },
    { field: "projectUser", headerName: "User", width: 100 },
    {
      field: "purposeOfOperation",
      headerName: "Purpose Of Operation",
      width: 100,
    },
    { field: "projectCode", headerName: "Project Code", width: 100 },
    {
      field: "purposeOfOperation",
      headerName: "Purpose Of Operation",
      width: 75,
    },
    { field: "usageDuration", headerName: "Usage Duration", width: 150 },
    { field: "usageMode", headerName: "Usage Mode", width: 100 },
    { field: "instutionName", headerName: "Instution Name", width: 150 },
    { field: "instutionType", headerName: "Instution Type", width: 150 },
    { field: "personName", headerName: "Person Name", width: 100 },
    {
      field: `personTitles`,
      valueGetter: (params) => {
        return `${params.row.personTitles.map((titles) => titles.name)}`;
      },
      headerName: "Person Title",
      width: 100,
    },
    {
      field: `personPositions`,
      valueGetter: (params) => {
        return `${params.row.personPositions.map(
          (positions) => positions.name
        )}`;
      },
      headerName: "Person Position",
      width: 100,
    },
  ];

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="dataTable">
            <div className="datatableTitle">
              Logs
              <Link to="/logs/newLog" className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              className="datagrid"
              rows={logsData}
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

export default Logs;
