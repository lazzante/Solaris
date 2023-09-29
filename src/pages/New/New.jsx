import "./New.scss";
import { useState, React, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function New({ inputs, title }) {
  const [data, setData] = useState({});
  //SELECT AREAS
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState([{}]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);

  //FETCH AREAS
  const [roles, setRoles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getRoles();
    getTitles();
    getDivisions();
    getPositions();
    getEquipments();
  }, []);

  const getRoles = async () => {
    await axios
      .get("http://144.122.47.188:8080/authority/getAll")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTitles = async () => {
    await axios
      .get("http://144.122.47.188:8080/title/getAll")
      .then((response) => {
        setTitles(response.data);
        console.log(response);
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
  const getEquipments = async () => {
    await axios
      .get("http://144.122.47.188:8080/equipment/getAll")
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((err) => console.log(err));
  };

  //TEXT INPUTS
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  //SAVE SUBMİT
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("USER SAVED IN FİREBASE NEXT STEP IS DB");

      //AXIOS
      const axRes = await axios
        .post("http://144.122.47.188:8080/signUp", {
          username: data.username,
          password: data.password,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          uid: res.user.uid,
          authorities: selectedRole.map((role) => ({
            name: role.name,
            id: role.id,
          })),
          titles: [
            {
              id: selectedTitle.id,
              name: selectedTitle.name,
              title_short: selectedTitle.title_short,
            },
          ],

          positions: [
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
          equipments: selectedEquipments.map((eq) => ({
            id: eq.id,
            name: eq.name,
          })),
        })
        .then((res) => {
          console.log("Başarılı bir şekilde tamamlandı");
          console.log("RES:", res);
          navigate(-1);
        })
        .catch((error) => {
          console.log("Başarısız");
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onEquipmentsChange = (event, values) => {
    setSelectedEquipments(values);
    console.log("SELECTED EQUIPMENTS (onEqChange incoming value): ", values);
  };
  const onTagsChange = (event, values) => {
    setSelectedRole(values);
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
              {inputs.map((input) => (
                <div className="formInput" key={inputs.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
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
                      label="Title"
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
                <Stack spacing={3} sx={{ minWidth: 120 }}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={onTagsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Roles"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Stack>
              </div>
              <div className="formInput">
                <Stack spacing={3} sx={{ minWidth: 120 }}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={equipments}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={onEquipmentsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Equipments"
                        placeholder="Equipments"
                      />
                    )}
                  />
                </Stack>
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
}
