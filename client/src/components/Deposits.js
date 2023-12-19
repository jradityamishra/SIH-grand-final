import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import axios from "axios";
import Spinner from "./Spinner";
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
;
const [studentData,setStudentData]=React.useState('');

  const data=async()=>{
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
    data()
   console.log(studentData)

   },[])
   
  return (
  <>
  {!studentData ? <Spinner/>: <React.Fragment>
    <Title>Student Response</Title>
<Typography component="p" variant="h4">
    {studentData.name}
    </Typography>
    <Typography color="text.secondary" sx={{ flex: 1 }}>
    YourPerformance is: {studentData.message}
    </Typography>
    <div>
      <Typography color="text.secondary" >
      class:- {studentData.studentclass}
      </Typography>
    </div>
  </React.Fragment>}
  </>
  );
}
