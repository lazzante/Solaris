import "./Equipments.scss";
import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Equipments = () => {
  const [equipmentData, setEquipmentData] = useState([]);

  let allEquipments;

  //LIST ALL OPERATION WHEN PAGE OPEN
  useEffect(() => {
    const fetchData = async () => {
      const getAllEquipments = await axios
        .get(`http://localhost:8080/equipment/getAll`)
        .then((response) => {
          setEquipmentData(response.data);
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
    width: 200,
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
    { field: "name", headerName: "Name", width: 75 },
    { field: "procurementDate", headerName: "ProcurementDate", width: 75 },
    { field: "procurementSource", headerName: "Procurement Source", width: 75 },
    { field: "fundingSource", headerName: "Funding Source", width: 100 },
    {
      field: "fundingAmount",
      headerName: "Funding Amount",
      width: 75,
    },
    { field: "manyfacturer", headerName: "Manyfacturer", width: 100 },
    {
      field: "equipmentIdentifier",
      headerName: "Equipment Identifier",
      width: 75,
    },
    { field: "equipmentAltName", headerName: "Equipment Alt Name", width: 100 },
    { field: "equipmentEngName", headerName: "Equipment Eng Name", width: 100 },
    { field: "forExternalUsage", headerName: "For External Usage", width: 75 },
    {
      field: `labratories`,
      valueGetter: (params) => {
        return `${params.row.labratories.map((lab) => lab.name)}`;
      },
      headerName: "Labratories",
      width: 150,
    },
    {
      field: `equipmentDivisions`,
      valueGetter: (params) => {
        return `${params.row.equipmentDivisions.map((eq) => eq.name)}`;
      },
      headerName: "Divisions",
      width: 150,
    },
  ];

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          {/* <Navbar /> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipments;
