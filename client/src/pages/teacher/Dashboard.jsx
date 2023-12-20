import * as React from "react";
import { useEffect,useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "../../components/Chart";
import Percentage from "../../components/Percentage";
import Recommend from "../../components/Recommend";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux'

import {login,logout,reset } from "../../redux/authSlice"
import Spinner from "../../components/Spinner";
// import { useSelector } from "react-redux";
function Copyright(props) {
  
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [teacherGraph, setTeacherGraph] = React.useState({});
  const { user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

  const teacherGrowth = async () => {
    try {      setLoading(true);

      const response = await axios.get(
        `http://localhost:8000/api/v1/analysis/${user.user._id}`
      );
      setTeacherGraph(response.data.analysis);
      console.log(response.data.analysis);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  teacherGrowth();
}, []);

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <h2 className="text-3xl font-semibold text-center">Dashboard</h2>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart teacherGrowth={teacherGraph} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Percentage teacherGrowth={teacherGraph} />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Recommend />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Layout>
  );
}