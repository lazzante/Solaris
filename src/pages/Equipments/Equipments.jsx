import "./Equipments.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import CantAccess from "../Error/CantAccess";

const Equipments = () => {

 //GİRİŞ YAPINCA AUTHORİTY KONTROL
 const [hasAuthority, setHasAuthority] = useState();

 const userRoles = useSelector(
   (state) => state.detailSetter.value.authorities
 );
 let roleNames;


  const [equipmentData, setEquipmentData] = useState([]);

  let allEquipments;

  //LIST ALL OPERATION WHEN PAGE OPEN
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
    const fetchData = async () => {
      const getAllEquipments = await axios
        .get(`http://localhost:8080/equipment/getAll`)
        .then((response) => {
          if(response?.data){
            setEquipmentData(response.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  //DELETE OPERATION
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/equipment/delete/${id}`
      );
      setEquipmentData(equipmentData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 75,
    renderHeader: () => <strong>{"Action "}</strong>,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverIcon />
          </div>
        </div>
      );
    },
  };

  //GENERATING RANDOM NUMBERS FOR TABLE CELLS (MUST OF MUI)
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

  //TABLE COLUMNS
  const columns = [
    { field: "name", headerName: "Name", width: 150,renderHeader: () => <strong>{"Equipment Name "}</strong>, },
    { field: "procurementDate", headerName: "ProcurementDate", width: 150,renderHeader: () => <strong>{"Procurement Date "}</strong>, },
    { field: "procurementSource", headerName: "Procurement Source", width: 150,renderHeader: () => <strong>{"Procurement Source "}</strong>, },
    { field: "fundingSource", headerName: "Funding Source", width: 120,renderHeader: () => <strong>{"Funding Source "}</strong>, },
    {
      field: "fundingAmount",
      headerName: "Funding Amount",
      width: 120,
      renderHeader: () => <strong>{"Funding Amount "}</strong>,
    },
    { field: "manyfacturer", headerName: "Manyfacturer", width: 100,renderHeader: () => <strong>{"Manyfacturer "}</strong>, },
    {
      field: "equipmentIdentifier",
      headerName: "Equipment Identifier",
      width: 140,
      renderHeader: () => <strong>{"Equipment Identifier "}</strong>,
    },
    { field: "equipmentAltName", headerName: "Equipment Alt Name", width: 145,renderHeader: () => <strong>{"Equipment AltName "}</strong>, },
    { field: "equipmentEngName", headerName: "Equipment Eng Name", width: 145,renderHeader: () => <strong>{"Equipment EngName "}</strong>, },
    { field: "forExternalUsage", headerName: "For External Usage", width: 132,renderHeader: () => <strong>{"For External Usage "}</strong>, },
    {
      field: `labratories`,
      valueGetter: (params) => {
        return `${params.row.labratories.map((lab) => lab.name)}`;
      },
      headerName: "Labratories",
      width: 100,
      renderHeader: () => <strong>{"Laboratories "}</strong>,
    },
    {
      field: `equipmentDivisions`,
      valueGetter: (params) => {
        return `${params.row.equipmentDivisions.map((eq) => eq.name)}`;
      },
      headerName: "Divisions",
      width: 75,
      renderHeader: () => <strong>{"Divisions "}</strong>,
    },
  ];

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
         
         {hasAuthority?(
          <div className="dataTable">
            <div className="datatableTitle">
              <h2>Equipments</h2>
              <Link to="/equipments/newEquipment" className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              sx={{ height: "900px" }}
              className="datagrid"
              rows={equipmentData}
              columns={columns.concat(actionColumn)}
              getRowId={(row: any) => generateRandom()}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>):(<CantAccess/>)}


        </div>
      </div>
    </div>
  );
};

export default Equipments;
