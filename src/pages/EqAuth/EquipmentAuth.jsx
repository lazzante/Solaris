import "./EquipmentAuth.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { CSVLink } from "react-csv";
import CancelIcon from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { async } from "@firebase/util";

const EquipmentAuth = () => {
  useEffect(() => {
    getAllEqUsers();
  }, []);

  const getAllEqUsers = async () => {
    const getAllUsers = await axios
      .get("http://localhost:8080/equser/getAll")
      .then((response) => {
        setEquipmentUsers(response.data);
      })
      .catch((err) => console.log(err));
  };
  //-----------------------------------------------------------------------------USE STATE AREA-----------------------------------------------------------------------------

  const userTypes = ["SUK", "UK", "K"];

  //İSCLİCKED AREA
  const [addNew, setAddNew] = useState(false);
  const [isExportOptionsClicked, setIsExportOptionsClicked] = useState(false);

  //FETCH AREA
  const [equipments, setEquipments] = useState([]);
  const [equipmentUsers, setEquipmentUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [divisions, setDivisions] = useState([]);

  //SELECTED AREA
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedEq, setSelectedEq] = useState({});
  const [selectedUserType, setSelectedUserType] = useState("");

  //CSV OBJECT
  const [csvObject, setCsvObject] = useState([]);

  //EXPORT AREA
  const [exportAreaSelectedEquipment, setExportAreaSelectedEquipment] =
    useState([]);
  const [exportAreaUserType, setExportAreaUserType] = useState("");
  const [exportAreaDivision, setExportAreaDivision] = useState([]);

  //----------------------------------------------------------------------------------------------------------------------------------------------------------

  //GENERATE RANDOM FOR TABLE COLUMNS(IT IS MUST)
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  //SELECT EQUİPMENT AYRICA BUTON OLARAK İSTENİRSE
  // const onEquipmentTagsChange = (event, values) => {
  //   setEquipment(values.name);
  //   console.log("Values", values); //IDSİ VALUES İLE GELİYOR
  //   //EKİPMAN SEÇİLDİ ARTIK BURADA SETLENEN EKİPMANA GÖRE USERLARIN LİSTELENECEĞİ BİR SORGU YAZILACAK
  // };

  //GET USERS
  const getUsers = async () => {
    try {
      await axios
        .get("http://localhost:8080/user/getAll")
        .then((response) => {
          setUsers(response.data);
          console.log("USERS", response.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  //GET EQUIPMENTS
  const getEquipments = async () => {
    const getAllEquipments = await axios
      .get("http://localhost:8080/equipment/getAll")
      .then((response) => {
        setEquipments(response.data);
        console.log("EQUİPMENT DATA :" + response.data);
      })
      .catch((err) => console.log(err));
  };

  //GET DIVISIONS
  const getDivisions = async () => {
    const getAllDivisions = await axios
      .get("http://localhost:8080/division/getAll")
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((err) => console.log(err));
  };

  //TABLE COLUMNS
  const columns = [
    {
      field: `equipment`,
      valueGetter: (params) => {
        return `${params.row.equipment.name}`;
      },
      headerName: "Equipment",
      width: 200,
    },
    {
      field: `user`,
      valueGetter: (params) => {
        return `${params.row.user.firstname + " " + params.row.user.lastname}`;
      },
      headerName: "User",
      width: 200,
    },
    { field: "userType", headerName: "User Type", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
  ];

  //-----------------------------------------------------------------------------ADD AREA-----------------------------------------------------------------------------
  const onUserChange = (event, value) => {
    if (value !== null) {
      console.log("User : ", value);
      setSelectedUser(value.id);
    } else {
      console.log("USER NULL GİRİLDİ");
    }
  };

  const onUserTypeChange = (event, value) => {
    if (value !== null) {
      console.log("User Type : ", value);
      setSelectedUserType(value);
    } else {
      console.log("LEVEL NULL GİRİLDİ");
      setSelectedUserType("K");
    }
  };

  const status = ["ACTIVE", "PASSIVE"];

  const onStatusChange = (event, value) => {
    if (value !== null) {
      console.log("Status : ", value);
      setSelectedStatus(value);
    } else {
      console.log("STATUS NULL GİRİLDİ");
      setSelectedStatus("ACTIVE");
    }
  };

  const onEqChange = (event, value) => {
    if (value !== null) {
      console.log("Equipment : ", value.id);
      setSelectedEq(value.id);
    } else {
      console.log("EQUIPMENT NULL GİRİLDİ");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:8080/equser/add", {
        userType: selectedUserType,
        status: selectedStatus,
        user: {
          id: selectedUser,
        },
        equipment: {
          id: selectedEq,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        console.log("RES:", res);
        getAllEqUsers();
        setAddNew(false);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };

  //-----------------------------------------------------------------------------EXPORT OPTIONS AREA-----------------------------------------------------------------------------

  const onExportOptionsEquipmentChanged = (event, value) => {
    console.log(value.name);
    setExportAreaSelectedEquipment(value.name);
  };

  const onExportOptionsUserTypeChanged = (event, value) => {
    setExportAreaUserType(value);
  };

  const onExportOptionsDivisionChanged = (event, value) => {
    setExportAreaDivision(value.name);
  };

  //-----------------------------------------------------------------------------EXPORT AREA-----------------------------------------------------------------------------

  const downloadCsv = async () => {
    const getAllUsers = await axios
      .get("http://localhost:8080/equser/getAll")
      .then((response) => {
        const resData = response.data;
        let data = [];
        resData.map((item) => {
          let object = {
            Equipment: item.equipment.name,
            User: item.user.firstname + " " + item.user.lastname,
          };
          data.push(object);
          console.log(object);
        });
        setCsvObject(data);
      })
      .catch((err) => console.log(err));
  };

  const exportHandle = () => {
    let allEqUsers = [...equipmentUsers];
    let data = [];
    if (exportAreaSelectedEquipment !== "") {
      allEqUsers = allEqUsers.filter(
        (user) => user.equipment.name === exportAreaSelectedEquipment
      );
    }
    if (exportAreaUserType !== "") {
      allEqUsers = allEqUsers.filter(
        (user) => user.userType === exportAreaUserType
      );
    }
    if (exportAreaDivision !== "") {
      allEqUsers = allEqUsers.filter((user) =>
        user.user.divisions.some(
          (division) => division.name === exportAreaDivision
        )
      );
    }
    allEqUsers.map((item) => {
      let object = {
        Equipment: item.equipment.name,
        UserType: item.userType,
        User: item.user.firstname + " " + item.user.lastname,
      };
      data.push(object);
    });
    console.log(data);
    setCsvObject(data);
    return data;
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------

  {
    return !addNew ? (
      <div>
        <div className="list">
          <Sidebar />
          <div className="listContainer">
            <Navbar />
            <div className="dataTable">
              <div className="datatableTitle">
                Equipment Authorization
                <div>
                  {!isExportOptionsClicked ? (
                    <div
                      className="exportOptions"
                      onClick={(e) => {
                        e.preventDefault();
                        setExportAreaDivision("");
                        setExportAreaSelectedEquipment("");
                        setExportAreaUserType("");
                        getEquipments();
                        getDivisions();
                        setIsExportOptionsClicked(true);
                      }}
                    >
                      Export Options
                    </div>
                  ) : (
                    <div className="exportOptionsOpened">
                      <div className="singleOption">
                        {" "}
                        <Autocomplete
                          disablePortal
                          disableClearable
                          id="combo-box-demo"
                          options={equipments}
                          getOptionLabel={(option) => option.name}
                          sx={{ minWidth: 120 }}
                          onChange={onExportOptionsEquipmentChanged}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Equipment"
                              value={exportAreaSelectedEquipment}
                            />
                          )}
                        />
                      </div>
                      <div className="singleOption">
                        {" "}
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={userTypes}
                          sx={{ minWidth: 120 }}
                          onChange={onExportOptionsUserTypeChanged}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="User Type"
                              value={exportAreaUserType}
                            />
                          )}
                        />
                      </div>
                      <div className="singleOption">
                        {" "}
                        <Autocomplete
                          disablePortal
                          disableClearable
                          id="combo-box-demo"
                          options={divisions}
                          getOptionLabel={(option) => option.name}
                          sx={{ minWidth: 120 }}
                          onChange={onExportOptionsDivisionChanged}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Division"
                              value={exportAreaDivision}
                            />
                          )}
                        />
                      </div>

                      <CSVLink
                        data={csvObject}
                        onClick={exportHandle}
                        className="exportButton"
                      >
                        Export
                      </CSVLink>
                      <div
                        className="exportCancelButton"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsExportOptionsClicked(false);
                        }}
                      >
                        Cancel
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    getUsers();
                    setAddNew(true);
                    getEquipments();
                  }}
                >
                  Give Equipment Authority
                </div>
              </div>

              <DataGrid
                className="datagrid"
                rows={equipmentUsers}
                columns={columns}
                //ACTİON COLUMN EKLENMEK İSTENİRSE
                // columns={columns.concat(actionColumn)}
                getRowId={(row: any) => generateRandom()}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 15 },
                  },
                }}
                pageSizeOptions={[15, 20]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="list">
          <Sidebar />
          <div className="listContainer">
            <Navbar />
            <div className="dataTable">
              <div className="datatableTitle">
                Give Equipment Authority
                <div
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddNew(false);
                  }}
                  style={{ color: "red", borderColor: "red" }}
                >
                  Exit This Screen
                </div>
              </div>

              {/*BURASI İTİBARİYLE ADD EKRANI*/}

              <div className="new">
                <div className="newContainer">
                  <div className="bottom">
                    <div className="right">
                      <form onSubmit={handleAdd}>
                        <div className="formInput">
                          <Autocomplete
                            id="combo-box-demo"
                            options={equipments}
                            getOptionLabel={(option) => option.name}
                            sx={{ minWidth: 120 }}
                            onChange={onEqChange}
                            disableClearable
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Equipment"
                                value={selectedEq}
                              />
                            )}
                          />
                        </div>
                        <div className="formInput">
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            getOptionLabel={(option) =>
                              option.firstname +
                              " " +
                              option.lastname +
                              " <-> " +
                              option.email
                            }
                            sx={{ minWidth: 120 }}
                            onChange={onUserChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="User"
                                value={selectedUser}
                              />
                            )}
                          />
                        </div>
                        <div className="formInput">
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={userTypes}
                            sx={{ minWidth: 120 }}
                            onChange={onUserTypeChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="User Type"
                                value={selectedUserType}
                              />
                            )}
                          />
                        </div>

                        <div className="formInput">
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={status}
                            sx={{ minWidth: 120 }}
                            onChange={onStatusChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Status"
                                value={selectedStatus}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EquipmentAuth;
