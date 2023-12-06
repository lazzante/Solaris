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
import { useNavigate } from "react-router-dom";


export default function NewProject() {
  const [hasAuthority, setHasAuthority] = useState();
  const navigate = useNavigate();

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
    
  }, []);


  
  //SELECT AREA
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectCoordinator, setProjectCoordinator] = useState("");


  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`http://localhost:8080/project/add`, {
        projectCode: projectCode,
        projectName: projectName,
        startDate: startDate,
        endDate: endDate,
        projectType: projectType,
        projectCoordinator: projectCoordinator,
      })
      .then((res) => {
        console.log("Proje başarılı bir şekilde eklendi");
        navigate(-1);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };


  const onStartDateChange = (value) => {
    var date = new Date(value.$d);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setStartDate(day + "/" + month + "/" + year);

    //console.log(day + "-" + month + "-" + year);
  };
  const onEndDateChange = (value) => {
    var date = new Date(value.$d);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setEndDate(day + "/" + month + "/" + year);

    //console.log(day + "-" + month + "-" + year);
  };
  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
        {hasAuthority ? (
          <div className="dataTable">
            {/*BURASI İTİBARİYLE ADD EKRANI*/}
            <div className="new">
              <div className="newContainer">
                <form onSubmit={handleAdd} style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto auto",
                      textAlign: "center",
                      padding: "10px",
                      marginTop: "80px",
                      marginLeft: "250px",
                    }}
                  >
                    <div style={{ padding: "20px", width: "250px" }}>
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Project Name"
                        size="medium"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    <div style={{ padding: "20px", width: "250px" }}>
                      {" "}
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Project Type"
                        size="medium"
                        type="text"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                      />
                    </div>
                    <div style={{ padding: "20px", width: "200px" }}>
                      {" "}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            format="DD-MM-YYYY"
                            label="Start Date"
                            defaultValue={Date.now() || null}
                            value={null}
                            onChange={(value) => onStartDateChange(value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div style={{ padding: "20px", width: "250px" }}>
                      {" "}
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Project Code"
                        size="medium"
                        type="text"
                        value={projectCode}
                        onChange={(e) => setProjectCode(e.target.value)}
                      />
                    </div>
                    <div style={{ padding: "20px", width: "250px" }}>
                      {" "}
                      <TextField
                        fullWidth
                        id="outlined-uncontrolled"
                        label="Project Coordinator"
                        size="medium"
                        type="text"
                        value={projectCoordinator}
                        onChange={(e) => setProjectCoordinator(e.target.value)}
                      />
                    </div>

                    <div style={{ padding: "20px", width: "200px" }}>
                      {" "}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            format="DD-MM-YYYY"
                            label="End Date"
                            defaultValue={Date.now() || null}
                            value={null}
                            onChange={(value) => onEndDateChange(value)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div style={{ marginLeft: "250px", alignItems: "center" }}>
                    <button
                      type="button"
                      style={{
                        color: "white",
                        backgroundColor: "green",
                        padding: "10px",
                        fontSize: "large",
                        fontWeight: "bold",
                        border: "1px solid white",
                        borderRadius: "7px",
                        width: "100px",
                        marginTop: "50px",
                        marginLeft: "40%",
                      }}
                      onClick={(e) => handleAdd(e)}
                    >
                      Save
                    </button>
                    <br />
                    <button
                      type="button"
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        padding: "10px",
                        fontSize: "large",
                        fontWeight: "bold",
                        border: "1px solid white",
                        borderRadius: "7px",
                        width: "100px",
                        marginTop: "20px",
                        marginLeft: "40%",
                      }}
                    >
                      <Link to="/projects" style={{ textDecoration: "none",color:"white" }}>Cancel</Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>):(<CantAccess/>)}


        </div>
      </div>
    </div>
  );
}
