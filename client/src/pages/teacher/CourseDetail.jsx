import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
const CourseDetail = () => {
  const { id } = useParams();
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`http://localhost:5000/teacher/courses/${id}`)
  //     .then((response) => {
  //       setVariable(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Layout>
      <div className=" justify-center m-8">
        <Card className="flex flex-col md:flex-row md:justify-evenly  justify-center">
          <div>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Lecture Topic
              </Typography>
              <Typography variant="body1" paragraph>
                Lecture Description goes here. Provide all the details about the
                event.
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Duration: X hours
              </Typography>
            </CardContent>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-vector/technology-conference-poster-template_1361-1297.jpg?w=1060&t=st=1702557183~exp=1702557783~hmac=fc0c57f92778b6ae6cc34bbea6e7d2e11b83b64ac4e262fbc033247f7e426623"
              alt="Event Banner"
              className=" h-64 object-cover"
            />
          </div>
        </Card>
        <div className="flex justify-center mx-auto my-8">
          <video
            src="https://d3mno2xesitl2o.cloudfront.net/demo.mp4"
            controls={true}
          ></video>
        </div>
        <div>
          <Typography variant="subtitle1" paragraph>
            <h4>Summary</h4>
            In a corner, a group of friends gathered, their laughter echoing in
            the cozy space. A writer, seeking inspiration, sat alone by the
            window, penning down thoughts in a worn-out notebook. Outside, the
            rain started to fall, tapping on the windowpane like a gentle
            melody. The cafe became a refuge, a haven where stories unfolded and
            dreams took flight. As the evening unfolded, strangers became
            friends, and the cafe transformed into a microcosm of shared
            experiences. Each sip of coffee held the promise of new beginnings,
            and the world outside faded away, leaving behind a mosaic of
            conversations and connections."
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Questions:
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
            <p>q1q1q1q1q1q1q1q1q1q1q1q1</p>
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
