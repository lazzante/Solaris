export const userColums = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "displayName", headerName: "Name", width: 200 },
  { field: "age", headerName: "Age", width: 50 },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { field: "phone", headerName: "Phone", width: 200 },

  { field: "password", headerName: "Password", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  {
    field: "status",
    headerName: "Status",
    with: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const userRows = [
  {
    id: 1,
    username: "amanda22",
    name: "Amanda Grass",
    password: "123",
    img: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active",
    email: "amanda@gunam.com",
    role: "ACCOUNTER",
    age: 35,
  },
  {
    id: 2,
    username: "ali88",
    name: "Ali Çapacı",
    password: "123",
    img: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "passive",
    email: "ali@gunam.com",
    role: "INF.TECH.",
    age: 35,
  },
  {
    id: 3,
    username: "myilmaz",
    name: "Mert Yılmaz",
    password: "123",
    img: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "active",
    email: "mert@gunam.com",
    role: "ADMIN",
    age: 35,
  },
  {
    id: 4,
    username: "tafunhiz",
    name: "Tayfun Hız",
    password: "123",
    img: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    status: "pending",
    email: "thiz@gunam.com",
    role: "MANAGER",
    age: 35,
  },
];
