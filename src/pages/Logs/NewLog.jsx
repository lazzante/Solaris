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

const NewLog = ({ inputs, title }) => {
  const [log, setLog] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [operation, setOperation] = useState("");
  const [user, setUser] = useState("");
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

  //SELECTED
  const [selectedTitle, setSelectedTitle] = useState([{}]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedPurposeOfOperaiton, setSelectedPurposeOfOperation] = useState(
    []
  );
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    getEquipments();
    getTitles();
    getDivisions();
    getPositions();
    getAllProjects();
  }, []);

  const getProjectsByProjectType = (type) => {
    let items = [];
    console.log("hoho", type);

    projects.map((project) => {
      project.projectType === type && items.push(project);
    });
    setProjectByType(items);
    console.log("Items", items);
  };

  const getAllProjects = async () => {
    await axios
      .get("http://144.122.47.188:8080/project/getAll")
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

  const getEquipments = async () => {
    await axios
      .get("http://144.122.47.188:8080/equipment/getAll")
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTitles = async () => {
    await axios
      .get("http://144.122.47.188:8080/title/getAll")
      .then((response) => {
        setTitles(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getPositions = async () => {
    await axios
      .get("http://144.122.47.188:8080/position/getAll")
      .then((response) => {
        setPositions(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getDivisions = async () => {
    await axios
      .get("http://144.122.47.188:8080/division/getAll")
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://144.122.47.188:8080/log/add", {
        date: date,
        time: time,
        operation: operation,
        projectUser: user,
        purposeOfOperation: selectedPurposeOfOperaiton,
        projectCode: "disabled",
        usageDuration: usageDuration,
        usageMode: usageMode,
        instutionName: instutionName,
        instutionType: instutionType,
        personName: personName,
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
    setSelectedDivision(values);
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
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={purposeOfOperations}
                  sx={{ minWidth: 120 }}
                  onChange={onPurposeOfOperationChanges}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Purpose Of Operation"
                      value={selectedPurposeOfOperaiton}
                    />
                  )}
                />
              </div>
              <div className="formInput">
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
              <div className="formInput">
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

              <div className="formInput">
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

              <div className="formInput">
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
              <div className="formInput">
                <label>Time</label>
                <input
                  id="time"
                  type="text"
                  placeholder=""
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Operation</label>
                <input
                  id="operation"
                  type="text"
                  placeholder=""
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>User</label>
                <input
                  id="user"
                  type="text"
                  placeholder=""
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Usage Duration</label>
                <input
                  id="usageDuration"
                  type="text"
                  placeholder=""
                  value={usageDuration}
                  onChange={(e) => setUsageDuration(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Usage Mode</label>
                <input
                  id="usageMode"
                  type="text"
                  placeholder=""
                  value={usageMode}
                  onChange={(e) => setUsageMode(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Instution Name</label>
                <input
                  id="instutionName"
                  type="text"
                  placeholder=""
                  value={instutionName}
                  onChange={(e) => setInstutionName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Instution Type</label>
                <input
                  id="instutionType"
                  type="text"
                  placeholder=""
                  value={instutionType}
                  onChange={(e) => setInstutionType(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Person Name</label>
                <input
                  id="personName"
                  type="text"
                  placeholder=""
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </div>
              <div className="formInput">
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
              <div className="formInput">
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
  );
};

export default NewLog;
