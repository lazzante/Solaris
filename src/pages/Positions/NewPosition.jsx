import { useState, React,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";


const NewPosition = () => {

   //GİRİŞ YAPINCA AUTHORİTY KONTROL
   const [hasAuthority, setHasAuthority] = useState();

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

  const [position, setPosition] = useState("");
  const [positionDescription, setPositionDescription] = useState("");

  const navigate = useNavigate();


  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`http://localhost:8080/position/add`, {
        name: position,
        description: positionDescription,
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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">


        {hasAuthority ? (
        <div>
        <h2 style={{ textAlign: "center", color: "green" }}>New Position</h2>
        <form
          onSubmit={(e) => {
            handleAdd(e);
          }}
        >
          <div  style={{
            // display: "grid",
            // gridTemplateColumns: "auto  ",
            display: "flex",
            padding: "10px",
            marginTop: "50px",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "40px",
          }}>
            <div style={{ marginTop: "20px" }}>
              <TextField
                fullWidth
                id="outlined-uncontrolled"
                label="Position Name"
                size="medium"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              {" "}
              <TextField
                fullWidth
                id="outlined-uncontrolled"
                label="Position Description"
                size="medium"
                type="text"
                value={positionDescription}
                onChange={(e) => setPositionDescription(e.target.value)}
              />
            </div>
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
              marginTop: "30px",
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
            }}
            onClick={() => {}}
          >
            <Link
              to="/positions"
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

export default NewPosition;
