import "./Labratories.scss";
import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";


const NewLabratory = ({ title }) => {
   //GİRİŞ YAPINCA AUTHORİTY KONTROL
   const [hasAuthority, setHasAuthority] = useState();


   const userRoles = useSelector(
    (state) => state.detailSetter.value.authorities
  );
  let roleNames;


  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");

  //FETCH STATES
  const [divisions, setDivisions] = useState([]);

  //SELECTED DROPDOWNS
  const [selectedDivision, setSelectedDivision] = useState([]);

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
  }, []);

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
      .post(`http://localhost:8080/labratory/add`, {
        name: name,
        bina: building,
        labratoryDivisions: [
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
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">

        {hasAuthority?(<div>
        <h2 style={{ textAlign: "center", color: "green" }}>New Laboratory</h2>
        <form onSubmit={handleAdd}>

        <div
          style={{
            // display: "grid",
            // gridTemplateColumns: "auto  ",
            display: "flex",
            padding: "10px",
            marginTop: "60px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "10px", textAlign: "center" }}>
            <TextField
              fullWidth
              id="outlined-uncontrolled"
              label="Laboratory Name"
              size="medium"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ padding: "10px", textAlign: "center" }}>
          <TextField
                  fullWidth
                  id="outlined-uncontrolled"
                  label="Building"
                  size="medium"
                  type="text"
                  placeholder=""
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                />
          </div>
          <div style={{ padding: "10px", textAlign: "center",width:"195px" }}>
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
          <button type="button" style={{color:"white",backgroundColor:"green",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px",marginTop:"50px"}} 
            onClick={e=>handleAdd(e)}>
            Save
            </button>
            <br/>
            <button type="button" style={{color:"white",backgroundColor:"red",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px"}} onClick={()=>{
            }}>
             <Link to="/laboratories" style={{ textDecoration: "none",color:"white" }}>Cancel</Link>
            </button>
        </div>
        </form>
        </div>):(<CantAccess/>)}



      </div>
    </div>
  );
};

export default NewLabratory;
