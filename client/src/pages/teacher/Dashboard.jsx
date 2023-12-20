import * as React from "react";
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

const teacherGrowth = {
  Jan: {
    feedback: 500,
    achievements: 2,
    yearsOfExperience: 20,
    contribution: 5,
  },
  Feb: {
    feedback: 525,
    achievements: 2,
    yearsOfExperience: 21,
    contribution: 5,
  },
  Mar: {
    feedback: 551,
    achievements: 2,
    yearsOfExperience: 22,
    contribution: 6,
  },
  Apr: {
    feedback: 679,
    achievements: 2,
    yearsOfExperience: 23,
    contribution: 6,
  },
  May: {
    feedback: 708,
    achievements: 2,
    yearsOfExperience: 24,
    contribution: 7,
  },
  Jun: {
    feedback: 739,
    achievements: 2,
    yearsOfExperience: 25,
    contribution: 7,
  },
  Jul: {
    feedback: 671,
    achievements: 2,
    yearsOfExperience: 26,
    contribution: 8,
  },
  Aug: {
    feedback: 805,
    achievements: 2,
    yearsOfExperience: 27,
    contribution: 8,
  },
  Sep: {
    feedback: 840,
    achievements: 2,
    yearsOfExperience: 28,
    contribution: 9,
  },
  Oct: {
    feedback: 977,
    achievements: 2,
    yearsOfExperience: 29,
    contribution: 9,
  },
  Nov: {
    feedback: 816,
    achievements: 2,
    yearsOfExperience: 30,
    contribution: 10,
  },
  Dec: {
    feedback: 757,
    achievements: 2,
    yearsOfExperience: 31,
    contribution: 10,
  },
};
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
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
                    <Chart teacherGrowth={teacherGrowth} />
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
                    <Percentage teacherGrowth={teacherGrowth} />
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
