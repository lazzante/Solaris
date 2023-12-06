import { React, useState, useEffect } from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";


const Home = () => {
  // const [data,setData]=useState([])
  const [equipmentList,setEquipmentList]=useState([]);

let cancel =false;

  useEffect(()=>{
    if(!cancel){
      cancel=true;
      getUserEquipments().then(()=>{
       cancel=false;
      })
    }

  },[])

  const getUserSession = useSelector((state) => state.detailSetter.value);
  const userId = getUserSession.id;


  const getUserEquipments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/equser/getUsersByUserId/${userId}`
      );
      console.log(res);
      if(res.status===200 && res?.data?.length!==0){
        let filtered = res.data.filter(item=>item.status==="ACTIVE");
        setEquipmentList(filtered);
      }
      else if(res.data.status!==200){
        setEquipmentList([{equipment: {
          name:"You haven't got any equipments"
        }}])
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          {/* <Featured />
          <Chart aspect={2 / 1} title={"Last 6 Months (Revenue)"} /> */}
        </div>
        <div className="listItem">
          {/* <div className="listTitle">Latest Transactions</div>
          <Table /> */}
          {/* <Widget type="users" />
          <Widget type="equipments" /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity:"0.8",
              marginTop:"80px"
              // marginTop:"50px",
              // backgroundColor:"red",
              
              
            }}
          >
            <div
              style={{
                width: "40%",
                borderRadius: "10px",
                border: "1px solid #F49F3C",
                background:"#F49F3C",
                padding: "40px",
                textAlign: "center",
              }}
            >
              <h1 style={{ alignItems: "center",color:"white" }}>
                Welcome {getUserSession.firstname}{" "}
                {getUserSession.lastname}{" "}
              </h1>
              <h3 style={{marginTop:"20px",color:"white"}}>Your Equipments</h3>
              <div style={{marginTop:"10px",display:"flex",justifyContent:"center"}}>
               <div style={{background:"white",borderRadius:"10px",width:"75%",borderRadius:"50px"}}>
                {
                  equipmentList.map(item=>(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",padding:"30px 40px"}}>
                    <PrecisionManufacturingIcon className="icon" style={{height:"100px",width:"100px",backgroundColor:"#F49F3C" ,color:"white", borderRadius:"20px"}}/>
                    <h4 style={{marginTop:"10px",marginLeft:"5px"}}>{item.equipment.name}</h4>

                    </div>
                    
                  ))
                  
                }
                
               </div>
              </div>
            </div>
            
          </div>
        </div>
        {/* <Navbar /> */}
        {/* <div className="widgets">
         
        </div> */}
      </div>
    </div>
  );
};

export default Home;
