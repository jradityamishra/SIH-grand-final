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
    const months = Object.keys(teacherGrowth);
    const lastMonth = months[months.length - 1];
    const secondLastMonth = months[months.length - 2];

    const lastMonthTotal = Object.values(teacherGrowth[lastMonth]).reduce(
      (total, value) => total + value,
      0
    );
    const secondLastMonthTotal = Object.values(
      teacherGrowth[secondLastMonth]
    ).reduce((total, value) => total + value, 0);

    // Calculate the slope comparison difference
    const slopeDifference =
      (lastMonthTotal - secondLastMonthTotal) / lastMonthTotal;

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
