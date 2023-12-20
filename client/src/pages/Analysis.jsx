import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";


const Analysis = () => {
  const [level, setLevel] = useState([]);
  const [value, setValue] = useState([]);

  const parameterMapping = {
    "Not Interested": 10,
    "confused": 20,
    "Looking Away": 30,
    "drowsy":40,
    "engaged":50,
    // Add more mappings as needed
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const output = await axios.get('http://127.0.0.1:8000/assign/6581dcfc19d641a0fc161ce9');
        if (output) {
          const parsedResult = JSON.parse(output.data.result);
          console.log(parsedResult)
          setLevel(parsedResult);

          // Map levels to corresponding values using parameterMapping
          const mappedValues = parsedResult.map(levelItem => parameterMapping[levelItem]);
          setValue(mappedValues);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    
    
    
     
    //  fetchData(); // Fetch data when component mounts
  }, []); // Em
  const data = {
    labels: level,
    datasets: [
      {
        label: 'Values',
        data: value,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: { title: { display: true, text: 'Level' } },
      y: { title: { display: true, text: 'Value' }, beginAtZero: true },
    },
  };
  return (
    <Layout>
     <div className="flex text-center">
     <h2 className="text-3xl text-center font-semibold">
        Performance analysis
      </h2>
      {/* <Bar data={data} options={options} /> */}

      
     </div>
    </Layout>
  );
};

export default Analysis;
