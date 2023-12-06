import React, { useState,useEffect } from "react";
import { roleInputs } from "./inputs";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";


const NewRole = () => {
   //GİRİŞ YAPINCA AUTHORİTY KONTROL
   const [hasAuthority, setHasAuthority] = useState();

   const userRoles = useSelector(
    (state) => state.detailSetter.value.authorities
  );
  let roleNames;


  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`http://localhost:8080/authority/add`, {
        name: role,
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
  };
  const handleInput = (value) => {
    setRole(value);
  };
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
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">

        {hasAuthority ? (
          <div>
        <h2 style={{ textAlign: "center", color: "green" }}>New Role</h2>
        <form
          onSubmit={(e) => {
            handleAdd(e);
          }}
        >
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns: "auto  ",
              display: "flex",
              padding: "10px",
              marginTop: "50px",
              alignItems: "center",
              flexDirection: "column",
              marginLeft: "40px",
            }}
          >
            <div>
              <TextField
                fullWidth
                id="outlined-uncontrolled"
                label="Role Name"
                size="medium"
                type="text"
                value={role}
                onChange={(e) => handleInput(e.target.value)}
              />
            </div>
            <button type="button" style={{color:"white",backgroundColor:"green",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px",marginTop:"30px"}} 
            onClick={e=>handleAdd(e)}>
            Save
            </button>
            <br/>
            <button type="button" style={{color:"white",backgroundColor:"red",padding:"10px",fontSize:"large",fontWeight:"bold",border:"1px solid white",borderRadius:"7px",width:"100px"}} onClick={()=>{
            }}>
             <Link to="/roles" style={{ textDecoration: "none",color:"white" }}>Cancel</Link>
            </button>
          </div>
        </form></div>):(<CantAccess/>)}



      </div>
    </div>
  );
};

export default NewRole;
