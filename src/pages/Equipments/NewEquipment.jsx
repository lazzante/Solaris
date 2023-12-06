import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";

const NewEquipment = ({ title }) => {


 //GİRİŞ YAPINCA AUTHORİTY KONTROL
 const [hasAuthority, setHasAuthority] = useState();

 const userRoles = useSelector(
   (state) => state.detailSetter.value.authorities
 );
 let roleNames;

  const [name, setName] = useState("");
  const [procurementDate, setProcurementDate] = useState("");
  const [procurementSource, setProcurementSource] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [manyfacturer, setManyfacturer] = useState("");
  const [equipmentIdentifier, setEquipmentIdentifier] = useState("");
  const [equipmentAltName, setEquipmentAltName] = useState("");
  const [equipmentEngName, setEquipmentEngName] = useState("");
  const [forExternalUsage, setForExternalUsage] = useState(false);

  //FETCH STATES
  const [labratories, setLabratories] = useState([]);
  const [divisions, setDivisions] = useState([]);

  //SELECTED DROPDOWNS
  const [selectedLabratories, setSelectedLabratories] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedProcurementSource, setSelectedProcurementSource] =
    useState("");

  const [selectedProcurementDate, setSelectedProcurementDate] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

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
    getDivisions();
    getLabratories();
  }, []);

  const getLabratories = async () => {
    await axios
      .get(`http://localhost:8080/labratory/getAll`)
      .then((response) => {
        setLabratories(response.data);
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

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`http://localhost:8080/equipment/add`, {
        name: name,
        procurementDate: procurementDate,
        procurementSource: selectedProcurementSource,
        fundingSource: fundingSource,
        fundingAmount: fundingAmount,
        manyfacturer: manyfacturer,
        equipmentIdentifier: equipmentIdentifier,
        equipmentAltName: equipmentAltName,
        equipmentEngName: equipmentEngName,
        forExternalUsage: forExternalUsage,
        labratories: selectedLabratories.map((lab) => ({
          name: lab.name,
          id: lab.id,
        })),
        equipmentDivisions: [
          {
            id: selectedDivision.id,
            name: selectedDivision.name,
            short_name: selectedDivision.short_name,
          },
        ],
      })
      .then((res) => {
        console.log("Başarılı bir şekilde eklendi");
        navigate(-1);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };
  const onDivisionTagsChange = (event, values) => {
    setSelectedDivision(values);
    console.log(values);
  };
  const onLabratoriesTagsChange = (event, values) => {
    setSelectedLabratories(values);
  };
  const onProcurementDateChange = (value) => {
    var date = new Date(value.$d);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    setProcurementDate(day + "/" + month + "/" + year);

    //console.log(day + "-" + month + "-" + year);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        

        {hasAuthority ? (
        <div>
        <h2 style={{marginLeft: "50%",color:"green"}}>New Equipment</h2>

        <form onSubmit={handleAdd}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            padding: "10px",
            marginTop: "80px",
            marginLeft:"280px"
          }}
        >
         
          <div style={{ marginLeft: "50px",marginTop:"50px",width:"200px",display:"flex"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    format="DD-MM-YYYY"
                    label="Procurement Date"
                    defaultValue={Date.now() || null}
                    value={null}
                    onChange={(value) => onProcurementDateChange(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Equipment Name"
              size="medium"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">
                For External Usage
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={forExternalUsage}
                label="For External Usage"
                onChange={(e) => setForExternalUsage(e.target.value)}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Funding Source"
              size="medium"
              type="text"
              placeholder=""
              value={fundingSource}
              onChange={(e) => setFundingSource(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Funding Amount"
              size="medium"
              type="text"
              placeholder=""
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            {" "}
            <TextField
              id="outlined-uncontrolled"
              label="Manyfacturer"
              size="medium"
              type="text"
              placeholder=""
              value={manyfacturer}
              onChange={(e) => setManyfacturer(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Equipment Identifier"
              size="medium"
              type="text"
              placeholder=""
              value={equipmentIdentifier}
              onChange={(e) => setEquipmentIdentifier(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Equipment Alt Name"
              size="medium"
              type="text"
              placeholder=""
              value={equipmentAltName}
              onChange={(e) => setEquipmentAltName(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px" }}>
            <TextField
              id="outlined-uncontrolled"
              label="Equipment Eng Name"
              size="medium"
              type="text"
              placeholder=""
              value={equipmentEngName}
              onChange={(e) => setEquipmentEngName(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px",width:"200px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Procurement Source
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProcurementSource}
                label="Procurement Source"
                onChange={(e) => setSelectedProcurementSource(e.target.value)}
              >
                <MenuItem value={"Kamu Kaynaklı Destek"}>
                  Kamu Kaynaklı Destek
                </MenuItem>
                <MenuItem value="Özel Sektör/STK Desteği">
                  Özel Sektör/STK Desteği
                </MenuItem>
                <MenuItem value="Hibe">Hibe</MenuItem>
                <MenuItem value="Diğer">Diğer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px",width:"200px" }}>
            <Stack spacing={3} sx={{ minWidth: 120 }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={labratories}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={onLabratoriesTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Labratories"
                    placeholder="Favorites"
                  />
                )}
              />
            </Stack>
          </div>
          <div style={{ marginLeft: "50px",marginTop:"50px",width:"200px" }}>
            {" "}
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
        </div>
        <div>
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
                marginLeft: "52%",
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
                marginLeft: "52%",
              }}
            >
              <Link
                to="/equipments"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cancel
              </Link>
            </button>
          
        </div>
        </form>
        </div>):(<CantAccess/>)}



      </div>
    </div>
  );
};

export default NewEquipment;
