import React from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Layout from "../../components/layout/Layout";

const CollabDetail = () => {
  const { id } = useParams();
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`http://localhost:5000/collaborations/detail/${id}`)
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
      <div className="container m-8">
        <Card>
          {/* Event Banner Image */}
          <img
            src="https://img.freepik.com/free-vector/technology-conference-poster-template_1361-1297.jpg?w=1060&t=st=1702557183~exp=1702557783~hmac=fc0c57f92778b6ae6cc34bbea6e7d2e11b83b64ac4e262fbc033247f7e426623"
            alt="Event Banner"
            className="w-full h-64 object-cover"
          />

          {/* Event Details */}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Event Title
            </Typography>
            <Typography variant="body1" paragraph>
              Event Description goes here. Provide all the details about the
              event.
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Date: Event Date
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Time: Event Time
            </Typography>
            {/* Add other details like location, speakers, etc. */}
          </CardContent>

          {/* Registration Form */}
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Register for the Event
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                {/* Add other registration fields as needed */}
              </Grid>
              <Button
                style={{ marginTop: 24 }}
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Register Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CollabDetail;
