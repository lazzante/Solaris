import "./Single.scss";
import { React, useState, useEffect, Children } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import userLogo from "./user.png";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Input from '@mui/base/Input';
import { useNavigate } from "react-router-dom";




const Single = ({ inputs }) => {
  const userId = useSelector((state) => state.userId.value);
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);


  //FETCH AREAS
  const [titles,setTitles] = useState([]);
  const [divisions,setDivisions] = useState([]);
  const [positions,setPositions] = useState([]);
  const [roles,setRoles] = useState([]);
  const [equipments,setEquipments] = useState([]);


//SELECTED AREAS
  const [selectedRole, setSelectedRole] = useState([]);
  const[selectedTitle,setSelectedTitle]=useState([]);
  const [selectedPosition,setSelectedPosition]=useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedEquipments,setSelectedEquipments] = useState([]);

  const [firstname,setFirstname]=useState(user.firstname);
  const [lastname,setLastname]=useState(user.lastname);
  const [username,setUsername]=useState(user.username);
 

  const navigate = useNavigate();


  useEffect(() => {
    getUserById(userId);
    getAllTitles();
    getAllDivisions();
    getAllPositions();
    getAllRoles();
    getAllEquipments();
  }, []);


  const getAllTitles = async () => {
    const titlesRes = await axios.get("http://localhost:8080/title/getAll")
    .then(res=>{
      setTitles(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  const getAllDivisions = async () => {
    const divisionres = await axios.get("http://localhost:8080/division/getAll")
    .then(res=>{
      setDivisions(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  
  const getAllPositions = async () => {
    const positionres = await axios.get("http://localhost:8080/position/getAll")
    .then(res=>{
      setPositions(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  const getAllRoles = async () => {
    const authorityres = await axios.get("http://localhost:8080/authority/getAll")
    .then(res=>{
      setRoles(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }


  const getAllEquipments = async () => {
    const equipmentRes = await axios.get("http://localhost:8080/equipment/getAll")
    .then(res=>{
      setEquipments(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }

  const getUserById = async (id) => {
    const user = await axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSelectedUserTables = async (id) => {
    const role = await axios.get(``);
  };

  const onPositionTagsChange = (event, values) => {
    setSelectedPosition(values);
  };
  const onEquipmentsChange = (event, values) => {
    setSelectedEquipments(values);
    console.log("SELECTED EQUIPMENTS (onEqChange incoming value): ",values)
  };
  const onTagsChange = (event, values) => {
    setSelectedRole(values);
  };

  const onTitleTagsChange = (event, values) => {
    setSelectedTitle(values);
  };

  const onDivisionTagsChange = (event, values) => {
    setSelectedDivision(values);
  };


  const updateUser = async (e) => {
    e.preventDefault();
    console.log("userId : ",userId);

    try {
      //AXIOS
     const axRes = await axios
     .post(`http://localhost:8080/user/update/${userId}`, {
       username: username,
       password: user.password,
       email: user.email,
       firstname: firstname,
       lastname:lastname,
       uid: user.uid,

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
      console.log(error.message);
    }
     
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div
              className="editButton"
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(true);
              }}
            >
              Edit
            </div>
            <div className="title">Information</div>
            <div className="item">
              <img src={user.img || userLogo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {"   " + user.firstname + " " + user.lastname}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{user.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Titles:</span>
                  <span className="itemValue">
                    {user.titles
                      ? user.titles.map((title) => title.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Division:</span>
                  <span className="itemValue">
                    {user.divisions
                      ? user.divisions.map((division) => division.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Position:</span>
                  <span className="itemValue">
                    {user.positions
                      ? user.positions.map((position) => position.name + ",")
                      : "Empty"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">
                    {user.authorities
                      ? user.authorities.map((role) => role.name + ",")
                      : "Empty"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isEdit && (
            <div className="right">
              <div
                className="closeButton"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEdit(false);
                }}
              >
                Close
              </div>
              <form onSubmit={updateUser}>
                <div>
                  <label>First Name</label>
                  &nbsp;
                  <Input
                    type="text"
                    className="formInput"
                    defaultValue={user.firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                  ></Input>
                </div>
                <div>
                  <label>Last Name</label>
                  &nbsp;
                  <Input
                    type="text"
                    className="formInput"
                    defaultValue={user.lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                  ></Input>
                </div>
                <div>
                  <label>Username</label>
                  &nbsp;
                  <Input
                    type="text"
                    className="formInput"
                    defaultValue={user.username}
                    onChange={(e)=>setUsername(e.target.value)}
                  ></Input>
                </div>
                
                  <div className="formInput">
                  <label>Title</label> &nbsp;

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
                      label = {`CURRENT TİTLE : ${user.titles.map(title=>title.name)}`}
                      value={selectedTitle}
                    />
                  )}
                /></div>
                  {/* <input
                    type="text"
                    className="formInput"
                    defaultValue={user.titles.map((title) => title.name)}
                  ></input> */}
                  <label>Division</label> &nbsp;
                  <div className="formInput">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={divisions}
                  getOptionLabel={(division, id) => division.name}
                  sx={{ minWidth: 120 }}
                  onChange={onDivisionTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label = {`CURRENT DIVISION : ${user.divisions.map(division=>division.name)}`}
                      value={selectedDivision}
                    />
                  )}
                /></div>
                  {/* <input
                    type="text"
                    className="formInput"
                    defaultValue={user.divisions.map((division) => division.name)}
                  ></input> */}
                
                <div className="formInput">
                <label>Position</label> &nbsp;

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={positions}
                  getOptionLabel={(position, id) => position.name}
                  sx={{ minWidth: 120 }}
                  onChange={onPositionTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label = {`CURRENT POSITION : ${user.positions.map(position=>position.name)}`}
                      value={selectedPosition}
                    />
                  )}
                />
            
                  {/* <label>Position</label> &nbsp;
                  <input
                    type="text"
                    className="formInput"
                    defaultValue={user.positions.map((position)=>position.name)}
                  ></input> */}
                  
                </div>
                 
                  <div className="formInput">
                  <label>Roles</label> &nbsp;
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
                        label={`CURRENT ROLES : ${user.authorities.map(role=>role.name)}`}
                        placeholder="Roles"
                      />
                    )}
                  />
                </Stack>
              </div>
                  {/* <input
                    type="text"
                    className="formInput"
                    defaultValue={user.authorities.map((authority)=>authority.name)}
                  ></input> */}
                
                <div className="formInput">
                  <label>Equipments</label> &nbsp;
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
                        label={`CURRENT EQUIPMENTS : ${user.equipments.map(eq=>eq.name)}`}
                        placeholder="Equipments"
                      />
                    )}
                  />
                </Stack>
              </div>
          
                <div className="formInput">
                  <button type="submit" onClick={(e)=>updateUser}>Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Single;
