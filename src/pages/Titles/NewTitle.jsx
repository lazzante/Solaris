import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { titleInputs } from "./inputs";

const NewTitle = () => {
  const [title, setTitle] = useState("");
  const [titleShort, setTitleShort] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://144.122.47.188:8080/title/add", {
        name: title,
        title_short: titleShort,
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
                <label>Title Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Professor"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Title Short</label>
                <input
                  id="titleShort"
                  type="text"
                  placeholder="Prof"
                  value={titleShort}
                  onChange={(e) => setTitleShort(e.target.value)}
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
export default NewTitle;
