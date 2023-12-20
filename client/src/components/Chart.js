import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import axios from "axios";
import Spinner from "./Spinner";
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}



export default function Chart() {
  const [studentData,setStudentData]=React.useState('');

  const data = [
    createData("00:00", 0),
    createData("03:00", studentData.assignment),
    createData("06:00", studentData.assignamesubmit),
    createData("09:00", studentData.credit),
    createData("12:00", 1500),
    createData("15:00", 2000),
    createData("18:00", 2400),
    createData("21:00", 2400),
    createData("24:00", undefined),
  ];
  const dataa=async()=>{
    try{
     const mldata=await axios.get(`http://127.0.0.1:8000/student/6581659e8e8a2ceef290dea1`);
     if(mldata){
        setStudentData(mldata.data);
      //  setResponse(mldata.data.message)
     
      //  console.log("data:",mldata.data.message)
     }
    }catch(error){
       console.log("something is wrong");
    }
   
   }
   
   
   React.useEffect(()=>{
    dataa()
   //console.log(studentData)

   },[])
  const theme = useTheme();

  return (
   <>
   
   </>
  );
}
