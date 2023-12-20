import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Data } from "../../CollabDB.js";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

function Collab() {
  return (
    <Layout className="">
      <h1 className="mb-8 font-semibold text-3xl text-center">
        Explore opportunities
      </h1>
      <div className="grid md:grid-cols-3 gap-8 container p-8 bg-opacity-60 backdrop-blur-lg">
        {Data.map((val, k) => (
          <div id="hospitalDetails" key={k} className="mx-4">
            <Card variant="outlined" style={{ borderRadius: "4px" }}>
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {val.university_name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16 }}
                    variant="body2"
                    gutterBottom
                  >
                    {val.date}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16 }}
                    variant="body2"
                    gutterBottom
                  >
                    {val.topic}
                  </Typography>
                  <Typography color="text.secondary">
                    Description: {val.description}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/teacher/collaborations/detail/${val.id}`}>
                    <Button
                      size="small"
                      href={val.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Details
                    </Button>
                  </Link>
                </CardActions>
              </React.Fragment>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Collab;
