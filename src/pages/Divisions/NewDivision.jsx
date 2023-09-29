import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const NewDivision = () => {
  const [division, setDivision] = useState("");
  const [divisionShort, setDivisionShort] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://144.122.47.188:8080/division/add", {
        name: division,
        short_name: divisionShort,
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
        <Navbar />
        <div className="top">
          <h1>Titles</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form
              onSubmit={(e) => {
                handleAdd(e);
              }}
            >
              <div className="formInput">
                <label>Division Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Solar Energy"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Title Short</label>
                <input
                  id="titleShort"
                  type="text"
                  placeholder="S.E"
                  value={divisionShort}
                  onChange={(e) => setDivisionShort(e.target.value)}
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

export default NewDivision;
