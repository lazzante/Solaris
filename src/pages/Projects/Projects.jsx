import "./Projects.scss";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";
import NewProject from "./NewProject";

const Projects = () => {
  //GİRİŞ YAPINCA AUTHORİTY KONTROL
  const [hasAuthority, setHasAuthority] = useState();

  //ALL TABLE DATA
  const [projectsData, setProjectsData] = useState([]);

  //IS ADD NEW CLİCKED
  const [addNew, setAddNew] = useState(false);

  //SELECT AREA
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectCoordinator, setProjectCoordinator] = useState("");

  const userRoles = useSelector(
    (state) => state.detailSetter.value.authorities
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
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    const allProjects = await axios
      .get(`http://localhost:8080/project/getAll`)
      .then((response) => {
        if (response?.data) {
          setProjectsData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderHeader: () => <strong>{"Action "}</strong>,
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/project/delete/${id}`
      );
      setProjectsData(projectsData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
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

  const projectColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      renderHeader: () => <strong>{"ID "}</strong>,
    },
    {
      field: "projectCode",
      headerName: "Project Code",
      width: 200,
      renderHeader: () => <strong>{"Project Code "}</strong>,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 200,
      renderHeader: () => <strong>{"Project Name "}</strong>,
    },
    {
      field: "projectCoordinator",
      headerName: "Project Coordinator",
      width: 200,
      renderHeader: () => <strong>{"Project Coordinator "}</strong>,
    },

    {
      field: "startDate",
      headerName: "Start Date",
      width: 100,
      renderHeader: () => <strong>{"Start Date "}</strong>,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 100,
      renderHeader: () => <strong>{"End Date "}</strong>,
    },
  ];


  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          {/* <Navbar /> */}
          {hasAuthority ? 
        (
          <div className="dataTable">
            <div className="datatableTitle">
              <h2>Projects</h2>
              <Link to="/projects/newProject" className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              sx={{ height: "900px" }}
              className="datagrid"
              rows={projectsData}
              columns={projectColumns.concat(actionColumn)}
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
        
          ):(<CantAccess/>)}</div>



      </div>
    </div>
  );
};

export default Projects;
