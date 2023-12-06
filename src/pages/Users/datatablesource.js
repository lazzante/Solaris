export const userColums = [
  { field: "uid", headerName: "UID", width: 100, },
  { field: "firstname", headerName: "First Name", width: 150 },
  { field: "lastname", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 100 },
  { field: "password", headerName: "Password", width: 100 },
  { field: "username", headerName: "Username", width: 100 },
  {
    field: `titles`,
    headerName: "Titles",
    width: 100,
  },
  {
    field: `divisions`,
    headerName: "Divisions",
    width: 100,
  },
  {
    field: `positions`,
    headerName: "Positions",
    width: 100,
  },

  {
    field: `authorities`,
    headerName: "Roles",
    width: 100,
  },
];

export const titleColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Title", width: 150 },
  { field: "title_short", headerName: "Title Short", width: 100 },
];

export const divisionColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Division", width: 150 },
  { field: "short_name", headerName: "Division Short", width: 150 },
];

export const positionColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Position", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
];

export const roleColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 150 },
];

export const eqAuthColumns = [{ field: "id", headerName: "ID", width: 50 }];

export const projectColumns = [{ field: "id", headerName: "ID", width: 50 }];
