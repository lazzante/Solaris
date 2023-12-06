import "./NewUser.scss";
import { useState, React, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";


export default function NewUser({ inputs, title }) {
//GİRİŞ YAPINCA AUTHORİTY KONTROL
const [hasAuthority, setHasAuthority] = useState();

const userRoles = useSelector(
  (state) => state.detailSetter.value.authorities
);
let roleNames;


  const [data, setData] = useState({});

  //SELECT AREAS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

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
    if (userRoles !== undefined) {
      console.log(userRoles);
      roleNames = userRoles.map((role) => role.name);
      userRoles.map((role) => {
        role.name === "ADMIN" ? setHasAuthority(true) : setHasAuthority(false);
      });
    getRoles();
    getTitles();
    getDivisions();
    getPositions();
    getEquipments();
    } else {
      setHasAuthority(false);
    }
    
  }, []);

  const getRoles = async () => {
    await axios
      .get(`http://localhost:8080/authority/getAll`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTitles = async () => {
    await axios
      .get(`http://localhost:8080/title/getAll`)
      .then((response) => {
        setTitles(response.data);
        console.log(response);
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
  const getEquipments = async () => {
    await axios
      .get(`http://localhost:8080/equipment/getAll`)
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
        email,
        password
      );
      console.log("USER SAVED IN FİREBASE NEXT STEP IS DB");

      //AXIOS
      const axRes = await axios
        .post(`http://localhost:8080/signUp`, {
          username: username,
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
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
          // equipments: selectedEquipments.map((eq) => ({
          //   id: eq.id,
          //   name: eq.name,
          // })),
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

  // const onEquipmentsChange = (event, values) => {
  //   setSelectedEquipments(values);
  //   console.log("SELECTED EQUIPMENTS (onEqChange incoming value): ", values);
  // };
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
        {/* <Navbar /> */}

        { hasAuthority ? 
       (<div> <h2 style={{textAlign:"center",color:"green"}}>New User</h2>
        <form onSubmit={handleAdd} style={{ width: "100%" }}>
          {/* username: data.username,
          password: data.password,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname, */}
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns: "auto  ",
              display: "flex",
              padding: "10px",
              marginTop: "50px",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "10px", textAlign: "center" }}>
              <TextField
                placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div style={{ padding: "10px", textAlign: "center" }}>
              <TextField
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div style={{ padding: "10px", textAlign: "center" }}>
              <TextField
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div style={{ padding: "10px", textAlign: "center" }}>
              <TextField
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div style={{ padding: "10px", textAlign: "center" }}>
              <TextField
              type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div style={{ padding: "10px", textAlign: "center", width:"300px" }}>
              <Stack spacing={3} sx={{ minWidth: 100 }}>
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
            <div style={{ padding: "20px", textAlign: "center", width:"300px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={titles}
                getOptionLabel={(title, id) => title.name}
                sx={{ minWidth: 120 }}
                onChange={onTitleTagsChange}
                renderInput={(params) => (
                  <TextField {...params} label="Title" value={selectedTitle} />
                )}
              />
            </div>
            <div style={{ padding: "20px", textAlign: "center", width:"300px" }}>
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
            <div style={{ padding: "20px", textAlign: "center", width:"300px" }}>
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
            <button type="button" style={{color:"white",backgroundColor:"green",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px"}} 
            onClick={e=>handleAdd(e)}>
            Save
            </button>
            <br/>
            <button type="button" style={{color:"white",backgroundColor:"red",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px"}} onClick={()=>{
            }}>
             <Link to="/users" style={{ textDecoration: "none",color:"white" }}>Cancel</Link>
            </button>
          </div>
        </form>
        </div>) :(<CantAccess/>)}
      </div>
     
    </div>
  );
}
