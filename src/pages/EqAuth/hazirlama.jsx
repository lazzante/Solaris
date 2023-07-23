import React from "react";

const hazirlama = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Give Equipment Authority</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label>UserType</label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Building</label>
                <input
                  id="bina"
                  type="text"
                  placeholder=""
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
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

export default hazirlama;
