import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const NewPosition = () => {
  const [position, setPosition] = useState("");
  const [positionDescription, setPositionDescription] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://144.122.47.188:8080/position/add", {
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
        <Navbar />
        <div className="top">
          <h1>Positions</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form
              onSubmit={(e) => {
                handleAdd(e);
              }}
            >
              <div className="formInput">
                <label>Position Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Solar Energy"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Position Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="S.E"
                  value={positionDescription}
                  onChange={(e) => setPositionDescription(e.target.value)}
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

export default NewPosition;
