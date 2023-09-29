import "./EquipmentAuth.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GridToolbarExport } from "@mui/x-data-grid";
import { async } from "@firebase/util";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialog from "./AlertDialog";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EquipmentAuth = () => {
  useEffect(() => {
    getAllEqUsers();
  }, []);

  const getAllEqUsers = async () => {
    const getAllUsers = await axios
      .get("http://144.122.47.188:8080/equser/getAll")
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
  const [selectedDivision, setSelectedDivision] = useState("");

  //CSV OBJECT
  const [csvObject, setCsvObject] = useState([]);

  //EXPORT AREA
  const [exportAreaSelectedEquipment, setExportAreaSelectedEquipment] =
    useState([]);
  const [exportAreaUserType, setExportAreaUserType] = useState("");
  const [exportAreaDivision, setExportAreaDivision] = useState([]);

  const [isOk, setIsOk] = useState(false);

  //CELL
  const [isCellSelected, setIsCellClicked] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  //DIALOG
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        .get("http://144.122.47.188:8080/user/getAll")
        .then((response) => {
          setUsers(response.data);
          console.log("USERS", response.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  //GET EQUIPMENTS
  const getEquipments = async (divisionName) => {
    let equipments = [];
    const getAllEquipments = await axios
      .get("http://144.122.47.188:8080/equipment/getAll")
      .then((response) => {
        response.data.map((equipment) => {
          equipment.equipmentDivisions.map((division) => {
            division.name === divisionName && equipments.push(equipment);
          });
        });

        setEquipments(equipments);
      })
      .catch((err) => console.log(err));
  };

  //GET DIVISIONS
  const getDivisions = async () => {
    const getAllDivisions = await axios
      .get("http://144.122.47.188:8080/division/getAll")
      .then((response) => {
        setDivisions(response.data);
      })
      .catch((err) => console.log(err));
  };

  //TABLE COLUMNS
  const columns = [
    {
      field: "division",
      headerName: "Division",
      width: 200,
      renderHeader: () => <strong>{"Division "}</strong>,
    },
    {
      field: `equipment`,
      valueGetter: (params) => {
        return `${params.row.equipment.name}`;
      },
      headerName: "Equipment",
      width: 200,
      renderHeader: () => <strong>{"Equipment "}</strong>,
    },
    {
      field: `user`,
      valueGetter: (params) => {
        return `${params.row.user.firstname + " " + params.row.user.lastname}`;
      },
      headerName: "User",
      width: 200,
      renderHeader: () => <strong>{"User"}</strong>,
    },
    {
      field: "userType",
      headerName: "User Type",
      width: 100,
      renderHeader: () => <strong>{"User Type "}</strong>,
    },

    {
      field: "authdate",
      headerName: "Authenticated Date",
      width: 200,
      renderHeader: () => <strong>{"Authenticated Date "}</strong>,
    },

    {
      field: "status",
      headerName: "Status",
      renderHeader: () => <strong>{"Status "}</strong>,
      width: 100,
    },
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
  const onDivisionChange = (event, value) => {
    if (value !== null) {
      setSelectedDivision(value.name);
      getEquipments(value.name);
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
    let suAn = new Date();
    let suAnDateString = suAn.toDateString();

    e.preventDefault();
    const res = await axios
      .post("http://144.122.47.188:8080/equser/add", {
        userType: selectedUserType,
        status: selectedStatus,
        authdate: suAnDateString,
        division: selectedDivision,
        user: {
          id: selectedUser,
        },
        equipment: {
          id: selectedEq,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        console.log("AuthDate Tipi:", suAnDateString);
        getAllEqUsers();
        setAddNew(false);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };
  //-----------------------------------------------------------------------------CELL AREA-----------------------------------------------------------------------------
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const makeActive = async () => {
    setIsLoading(true);
    console.log("ORGINAL ROW", selectedRow);

    const id = selectedRow.id;

    const res = await axios
      .post(`http://144.122.47.188:8080/equser/update/${id}`, {
        userType: selectedRow.userType,
        status: "ACTIVE",
        authdate: selectedRow.authdate,
        division: selectedRow.authdate,
        user: {
          id: selectedRow.user.id,
        },
        equipment: {
          id: selectedRow.equipment.id,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        getAllEqUsers();
        setIsOk(true);
        handleClose();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };
  const makeInactive = async () => {
    setIsLoading(true);

    console.log("ORGINAL ROW", selectedRow);

    const id = selectedRow.id;

    const res = await axios
      .post(`http://144.122.47.188:8080/equser/update/${id}`, {
        userType: selectedRow.userType,
        status: "INACTIVE",
        authdate: selectedRow.authdate,
        division: selectedRow.authdate,
        user: {
          id: selectedRow.user.id,
        },
        equipment: {
          id: selectedRow.equipment.id,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        getAllEqUsers();
        setIsOk(true);
        handleClose();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderHeader: () => <strong>{"Action "}</strong>,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <div
            className="viewButton"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
              setSelectedRow(params.row);
              // handleUserId(params.row.id);
            }}
          >
            Change Status
          </div>
        </div>
      );
    },
  };

  //IF ROW CLICKED
  const handleRowClick = (params) => {
    // setMessage(
    //   `Selected User-> ${params.row.user.firstname} ${params.row.user.lastname} `
    // );
    // console.log(params.row);
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

  //-----------------------------------------------------------------------------UPDATE AREA-----------------------------------------------------------------------------
  const onStatusCellEditActive = async (originalRow) => {
    const id = originalRow.id;
    console.log("ORGINAL ROW", originalRow);

    const res = await axios
      .post(`http://144.122.47.188:8080/equser/update/${id}`, {
        userType: originalRow.userType,
        status: "ACTIVE",
        authdate: originalRow.authdate,
        division: originalRow.authdate,
        user: {
          id: originalRow.user.id,
        },
        equipment: {
          id: originalRow.equipment.id,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        getAllEqUsers();
        setIsOk(true);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
  };
  const onStatusCellEditInActive = async (originalRow) => {
    const id = originalRow.id;
    const res = await axios
      .post(`http://144.122.47.188:8080/equser/update/${id}`, {
        userType: originalRow.userType,
        status: "INACTIVE",
        authdate: originalRow.authdate,
        division: originalRow.authdate,
        user: {
          id: originalRow.user.id,
        },
        equipment: {
          id: originalRow.equipment.id,
        },
      })
      .then((res) => {
        console.log("Başarılı bir şekilde tamamlandı");
        getAllEqUsers();
        setIsOk(true);
      })
      .catch((error) => {
        console.log("Başarısız");
        console.log(error.message);
      });
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
        AuthenticateDate: item.authdate,
      };
      data.push(object);
    });
    console.log(data);
    setCsvObject(data);
    return data;
  };

  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  function CustomToolbar() {
    return <GridToolbarExport />;
  }
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
                <div
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    getUsers();
                    setAddNew(true);

                    getDivisions();
                  }}
                >
                  Assign Equipment Authority
                </div>
              </div>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Box sx={{ height: 300, width: "100%" }}>
                  {message && <Alert severity="info">{message}</Alert>}
                  <div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Status will change"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you want to make the user active or inactive?
                        </DialogContentText>
                      </DialogContent>
                      {isLoading ? (
                        <span className="loader"></span>
                      ) : (
                        <DialogActions>
                          <Button onClick={makeActive}>Active</Button>
                          <Button onClick={makeInactive} autoFocus>
                            Inactive
                          </Button>
                          <Button onClick={handleClose}>Back</Button>
                        </DialogActions>
                      )}
                    </Dialog>
                  </div>
                  <DataGrid
                    onRowClick={handleRowClick}
                    //onProcessRowUpdateStart={}
                    className="datagrid"
                    rows={equipmentUsers}
                    columns={columns.concat(actionColumn)}
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
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                  >
                    {" "}
                    <GridToolbarExport
                      csvOptions={{
                        fileName: "customerDataBase",
                        delimiter: ",",
                        utf8WithBom: true,
                      }}
                    />
                  </DataGrid>
                </Box>
              </Stack>
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
                Assign Equipment Authority
                <div
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddNew(false);
                  }}
                  style={{ color: "red", borderColor: "red" }}
                >
                  Back
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
                            disablePortal
                            id="combo-box-demo"
                            options={divisions}
                            getOptionLabel={(division) => division.name}
                            sx={{ minWidth: 120 }}
                            onChange={onDivisionChange}
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
