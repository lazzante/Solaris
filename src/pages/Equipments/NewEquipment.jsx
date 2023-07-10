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

const NewEquipment = ({ title }) => {
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

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getDivisions();
    getLabratories();
  }, []);

  const getLabratories = async () => {
    await axios
      .get("http://localhost:8080/labratory/getAll")
      .then((response) => {
        setLabratories(response.data);
      })
      .catch((err) => console.log(err));
  };
  const getDivisions = async () => {
    await axios
      .get("http://localhost:8080/division/getAll")
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:8080/equipment/add", {
        name: name,
        procurementDate: procurementDate,
        procurementSource: procurementSource,
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
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Procurement Date</label>
                <input
                  id="procurementDate"
                  type="text"
                  placeholder=""
                  value={procurementDate}
                  onChange={(e) => setProcurementDate(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Procurement Source</label>
                <input
                  id="procurementSource"
                  type="text"
                  placeholder="EQE"
                  value={procurementSource}
                  onChange={(e) => setProcurementSource(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Funding Source</label>
                <input
                  id="fundingSource"
                  type="text"
                  placeholder=""
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Funding Amount</label>
                <input
                  id="fundingAmount"
                  type="text"
                  placeholder=""
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Manyfacturer</label>
                <input
                  id="manyfacturer"
                  type="text"
                  placeholder=""
                  value={manyfacturer}
                  onChange={(e) => setManyfacturer(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Equipment Identifier</label>
                <input
                  id="equipmentIdentifier"
                  type="text"
                  placeholder=""
                  value={equipmentIdentifier}
                  onChange={(e) => setEquipmentIdentifier(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Equipment Alt Name</label>
                <input
                  id="equipmentAltName"
                  type="text"
                  placeholder=""
                  value={equipmentAltName}
                  onChange={(e) => setEquipmentAltName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Equipment Eng Name</label>
                <input
                  id="equipmentEngName"
                  type="text"
                  placeholder=""
                  value={equipmentEngName}
                  onChange={(e) => setEquipmentEngName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <FormControl fullWidth>
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

              <div className="formInput">
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

export default NewEquipment;
