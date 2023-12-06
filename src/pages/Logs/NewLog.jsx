import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { async } from "@firebase/util";
import { fontSize } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "./NewLog.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NewLog = ({ inputs, title }) => {
  const [log, setLog] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [operation, setOperation] = useState("");
  const [purposeOfOperations, setPurposeOfOperations] = useState([]);
  const [projectCode, setProjectCode] = useState("");
  const [usageDuration, setUsageDuration] = useState("");
  const [usageMode, setUsageMode] = useState("");
  const [instutionName, setInstutionName] = useState("");
  const [instutionType, setInstutionType] = useState("");
  const [personName, setPersonName] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  //FETCH STATES
  const [equipments, setEquipments] = useState([]);
  const [titles, setTitles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectsByType, setProjectByType] = useState([]);
  const [user, setUser] = useState([]);

  //SELECTED
  const [selectedTitle, setSelectedTitle] = useState([{}]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedPurposeOfOperaiton, setSelectedPurposeOfOperation] = useState(
    []
  );
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserFirstName, setSelectedUserFirstName] = useState("");
  const [selectedUserLastName, setSelectedUserLastName] = useState("");

  const [eqByDivisionAndUser, setEqByDivisionAndUser] = useState([]);

  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    getUser();
    getTitles();
    getDivisions();
    getPositions();
    getAllProjects();
    setIsCalculated(false);
  }, []);

  const getUserSession = useSelector((state) => state.detailSetter.value);

  const getProjectsByProjectType = (type) => {
    let items = [];
    console.log("hoho", type);

    projects.map((project) => {
      project.projectType === type && items.push(project);
    });
    setProjectByType(items);
    console.log("Items", items);
  };

  //GET USERS
  const getUser = async () => {
    const userId = getUserSession.id;

    try {
      await axios
        .get(`http://localhost:8080/user/${userId}`)
        .then((response) => {
          console.log("USER:", response.data);
          setUser(response.data);
          if (response !== null) {
            console.log(
              "User : ",
              `${response.data.firstname} ${response.data.lastname}`
            );
            setSelectedUserFirstName(response.data.firstname);
            setSelectedUserLastName(response.data.lastname);
          } else {
            console.log("USER NULL GİRİLDİ");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  const getAllProjects = async () => {
    await axios
      .get(`http://localhost:8080/project/getAll`)
      .then((response) => {
        setProjects(response.data);
        let projectTypeData = [];
        response.data.map((project) =>
          projectTypeData.push(project.projectType)
        );
        setPurposeOfOperations(projectTypeData);
      })
      .catch((err) => console.log(err));
  };

  // const getEquipments = async () => {
  //   await axios
  //     .get(`http://localhost:8080/equipment/getAll`)
  //     .then((response) => {
  //       setEquipments(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  //GET EQUIPMENTS
  // const getEquipments = async (divisionName) => {
  //   let equipments = [];
  //   const getAllEquipments = await axios
  //     .get(`http://localhost:8080/equipment/getAll`)
  //     .then((response) => {
  //       response.data.map((equipment) => {
  //         equipment.equipmentDivisions.map((division) => {
  //           division.name === divisionName && equipments.push(equipment);
  //         });
  //       });

  //       setEquipments(equipments);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getTitles = async () => {
    await axios
      .get(`http://localhost:8080/title/getAll`)
      .then((response) => {
        setTitles(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getPositions = async () => {
    await axios
      .get(`http://localhost:8080/position/getAll`)
      .then((response) => {
        setPositions(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getDivisions = async () => {
    await axios
      .get(`http://localhost:8080/division/getAll`)
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((err) => console.log(err));
  };

  var specialEquipments = [];

  const getEquipmentsByDivisionAndUser = async (selectedDivisionInForm) => {
    const userId = getUserSession.id;
    var comingEquipments = [];
    var specialEquipments = [];
    if (selectedDivisionInForm) {
      await axios
        .get(`http://localhost:8080/equser/getUsersByUserId/${userId}`)
        .then((user) => {
          user?.data?.map((item) => {
            if (item.status !== "INACTIVE") {
              comingEquipments.push(item.equipment);
            }
          });
          comingEquipments.map((item) =>
            item.equipmentDivisions.map((div) => {
              div.name == selectedDivisionInForm &&
                specialEquipments.push(item);
            })
          );
          setEquipments(specialEquipments);
          console.log("Gelen ekipmanlar",specialEquipments);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`http://localhost:8080/log/add`, {
        date: date,
        time: time,
        operation: operation,
        projectUser: `${selectedUserFirstName} ${selectedUserLastName}`,
        purposeOfOperation: selectedPurposeOfOperaiton,
        projectCode: "disabled",
        usageDuration: usageDuration,
        usageMode: usageMode,
        instutionName: instutionName,
        instutionType: instutionType,
        personName: `${selectedUserFirstName} ${selectedUserLastName}`,
        equipments: [
          {
            id: selectedEquipment.id,
            name: selectedEquipment.name,
          },
        ],
        personTitles: [
          {
            id: selectedTitle.id,
            name: selectedTitle.name,
            title_short: selectedTitle.title_short,
          },
        ],

        personPositions: [
          {
            id: selectedPosition.id,
            name: selectedPosition.name,
            description: selectedPosition.description,
          },
        ],
        divisions: [
          {
            id: selectedDivision.id,
            name: selectedDivision.name,
            short_name: selectedDivision.short_name,
          },
        ],
      })
      .then((res) => {
        console.log("Başarılı bir şekilde eklendi");
        console.log("RES:", res);
        navigate(-1);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };

  const onEquipmentTagsChange = (event, values) => {
    setSelectedEquipment(values);
  };

  const onTitleTagsChange = (event, values) => {
    setSelectedTitle(values);
  };

  const onPositionTagsChange = (event, values) => {
    setSelectedPosition(values);
  };

  const onDivisionTagsChange = (event, values) => {
    if (values !== null) {
      setSelectedDivision(values);
      console.log("Division selected : ", values.name);
      getEquipmentsByDivisionAndUser(values.name);
    }
  };

  const onPurposeOfOperationChanges = (event, values) => {
    setSelectedPurposeOfOperation(values);
    getProjectsByProjectType(values);
  };
  const onProjectsByTypeChanged = (event, values) => {
    setSelectedProject(values);
  };

  const onDateChange = (value) => {
    var date = new Date(value.$d);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setDate(day + "/" + month + "/" + year);

    //console.log(day + "-" + month + "-" + year);
  };
  // const onUserChange = (event, value) => {
  //   if (value !== null) {
  //     console.log("User : ", value);
  //     setSelectedUserFirstName(value.firstname);
  //     setSelectedUserLastName(value.lastname);
  //   } else {
  //     console.log("USER NULL GİRİLDİ");
  //   }
  // };

  //END TİME - START TİME = DURATİON TİME
  function calculateDuration(startTime1, endTime1) {
    let sTime = startTime1.getTime();
    let eTime = endTime1.getTime();
    let time = (eTime - sTime) / 60000;
    setUsageDuration(`${time.toString()} min`);
    setIsCalculated(true);
    console.log(time);
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <h2 style={{marginLeft: "50%",color:"green"}}>New Log</h2>
        <form onSubmit={handleAdd}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              textAlign: "center",
              padding: "10px",
              marginTop: "80px",
            }}
          >
            <div style={{ marginLeft: "50px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    format="DD-MM-YYYY"
                    label="Date"
                    defaultValue={Date.now() || null}
                    value={null}
                    onChange={(value) => onDateChange(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Start Time"
                    onChange={(value) => {
                      console.log("Start Time", value.$d);
                      setStartTime(value.$d);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="End Time"
                    onChange={(value) => {
                      console.log("End Time", value.$d);
                      setEndTime(value.$d);
                      calculateDuration(startTime, value.$d);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={divisions}
                getOptionLabel={(option) => option.name}
                sx={{ minWidth: 120 }}
                onChange={onDivisionTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Division"
                    value={selectedDivision}
                  />
                )}
              />
            </div>

            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={equipments}
                getOptionLabel={(option) => option.name}
                sx={{ minWidth: 120 }}
                onChange={onEquipmentTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Equipment"
                    value={selectedEquipment}
                  />
                )}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <TextField
                fullWidth
                id="outlined-uncontrolled"
                label="Usage Mode"
                size="medium"
                type="text"
                placeholder=""
                value={usageMode}
                onChange={(e) => setUsageMode(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              {" "}
              <TextField
                fullWidth
                id="outlined-basic"
                label="Operation Name"
                size="normal"
                type="text"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={purposeOfOperations}
                sx={{ minWidth: 120 }}
                onChange={onPurposeOfOperationChanges}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Purpose Of Operation (Project)"
                    value={selectedPurposeOfOperaiton}
                  />
                )}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={projectsByType}
                getOptionLabel={(option) => option.projectName}
                sx={{ minWidth: 120 }}
                onChange={onProjectsByTypeChanged}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Projects"
                    value={selectedProject}
                  />
                )}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Instution Name"
                size="normal"
                type="text"
                placeholder=""
                value={instutionName}
                onChange={(e) => setInstutionName(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Instution Type"
                size="normal"
                type="text"
                placeholder=""
                value={instutionType}
                onChange={(e) => setInstutionType(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              {" "}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={titles}
                getOptionLabel={(title, id) => title.name}
                sx={{ minWidth: 120 }}
                onChange={onTitleTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Person Title"
                    value={selectedTitle}
                  />
                )}
              />
            </div>
            <div></div>
            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={positions}
                getOptionLabel={(option) => option.name}
                sx={{ minWidth: 120 }}
                onChange={onPositionTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Position"
                    value={selectedPosition}
                  />
                )}
              />
            </div>
          </div>
          <div>
            {isCalculated ? (
              <div style={{ marginTop: "60px", marginLeft: "47%" }}>
                <h3>Usage Duration : {usageDuration}</h3>
              </div>
            ) : (
              <></>
            )}{" "}
            <button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "green",
                padding: "10px",
                fontSize: "large",
                fontWeight: "bold",
                border: "1px solid white",
                borderRadius: "7px",
                width: "100px",
                marginTop: "60px",
                marginLeft: "50%",
              }}
              onClick={handleAdd}
            >
              Save
            </button>
            <button
              type="submit"
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
                marginLeft: "50%",
              }}
            >
              <Link
                to="/logs"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLog;
