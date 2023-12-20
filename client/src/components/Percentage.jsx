import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ teacherGrowth }) {
  // Calculate the slope comparison difference for the total attributes of the last 2 months
  const calculateSlopeDifference = () => {
    const sortedGrowth = [...teacherGrowth].sort((a, b) => a.month - b.month);
  
    // Get the last 2 months
    const lastMonthData = sortedGrowth[sortedGrowth.length - 1];
    const secondLastMonthData = sortedGrowth[sortedGrowth.length - 2];
  
    // Calculate the total of aggregateFeedback for the last 2 months
    const lastMonthTotal = Object.values(lastMonthData.aggregateFeedback).reduce(
      (total, value) => total + value,
      0
    );
    const secondLastMonthTotal = Object.values(
      secondLastMonthData.aggregateFeedback
    ).reduce((total, value) => total + value, 0);
  
    // Calculate the slope comparison difference
    const slopeDifference = (lastMonthTotal - secondLastMonthTotal) / lastMonthTotal;
  
    return slopeDifference;
  };
  

  const value = calculateSlopeDifference();
  const currentDate = new Date().toLocaleDateString();

  return (
    <React.Fragment>
      <h4 className="text-center text-lg font-bold mb-4">Recent month</h4>
      {value > 0 ? (
        <Title>Growth</Title>
      ) : (
        <Typography style={{ color: "red", height: "20px" }}>
          Decline
        </Typography>
      )}
      <Typography component="p" variant="h4">
        {value > 0
          ? `+${(value * 100).toFixed(2)}%`
          : `${(value * -100).toFixed(2)}%`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of {currentDate}
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}