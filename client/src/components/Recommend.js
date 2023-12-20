// RecommendationSection.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Recommend = () => {
  const recommendations = [
    {
      id: 1,
      title: "Course 1",
      description: "Self development.",
    },
    {
      id: 2,
      title: "Chemcon",
      description: "Global research paper conference.",
    },
    {
      id: 3,
      title: "AICTE Teacher's Training",
      description: "Programme for improved teaching methods.",
    },
    // Add more recommendations as needed
  ];

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold mb-4">Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id}>
            <div style={{ padding: "16px" }}>
              <Typography variant="h6" component="div">
                {recommendation.title}
              </Typography>
              <Typography color="text.secondary">
                {recommendation.description}
              </Typography>
              <Button
                variant="contained"
                style={{ margin: "8px", width: "22px" }}
                size="small"
                color="primary"
              >
                More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
