import "./Projects.scss";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Projects = () => {
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

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    const allProjects = await axios
      .get("http://localhost:8080/project/getAll")
      .then((response) => {
        setProjectsData(response.data);
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

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:8080/project/add", {
        projectCode: projectCode,
        projectName: projectName,
        startDate: startDate,
        endDate: endDate,
        projectType: projectType,
        projectCoordinator: projectCoordinator,
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        getAllProjects();
        setAddNew(false);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
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
  return !addNew ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="dataTable">
          <div className="datatableTitle">
            Projects
            <div
              className="link"
              onClick={(e) => {
                e.preventDefault();
                setAddNew(true);
              }}
            >
              Add New
            </div>
          </div>
          <DataGrid
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
      </div>
    </div>
  ) : (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="dataTable">
            <div className="datatableTitle">
              New Project
              <div
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setAddNew(false);
                }}
                style={{ color: "red", borderColor: "red" }}
              >
                Back
              </div>
            </div>
            {/*BURASI İTİBARİYLE ADD EKRANI*/}

            <div className="new">
              <div className="newContainer">
                <div className="bottom">
                  <div className="right">
                    <form onSubmit={handleAdd}>
                      <div className="formInput">
                        <label>Project Name</label>
                        <input
                          type="text"
                          placeholder={"Project Name"}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      <div className="formInput">
                        <label>Project Type</label>
                        <input
                          type="text"
                          placeholder={"Project Type"}
                          onChange={(e) => setProjectType(e.target.value)}
                        />
                      </div>
                      <div className="formInput">
                        <label>Project Code</label>
                        <input
                          type="text"
                          placeholder={"Project Code"}
                          onChange={(e) => setProjectCode(e.target.value)}
                        />
                      </div>
                      <div className="formInput">
                        <label>Project Coordinator</label>
                        <input
                          type="text"
                          placeholder={"Project Coordinator"}
                          onChange={(e) =>
                            setProjectCoordinator(e.target.value)
                          }
                        />
                      </div>
                      <div className="formInput">
                        <label>Start Date</label>
                        <input
                          type="text"
                          placeholder={"Start Date"}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="formInput">
                        <label>End Date</label>
                        <input
                          type="text"
                          placeholder={"End Date"}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>

                      <div className="formInput">
                        <button
                          type="submit"
                          className="saveButton"
                          onClick={handleAdd}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
