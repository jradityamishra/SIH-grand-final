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
  // const [filterValue, setFilterValue] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 21;

  // const filteredData = Data.filter(
  //   (val) =>
  //     val.city.toLowerCase().includes(filterValue.toLowerCase()) ||
  //     val.name.toLowerCase().includes(filterValue.toLowerCase())
  // );

  // const totalItems = filteredData.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredData.slice(startIndex, endIndex);

  // const handlePageChange = (event, value) => {
  //   setCurrentPage(value);
  // };

  return (
    <Layout className="container p-8">
      <h1 className="mb-8 font-semibold text-3xl text-center">
        Explore opportunities
      </h1>
      {/* <div className="mb-4 border-4 text-center">
        <input
          type="text"
          className="px-2 py-1 border-2 rounded"
          placeholder="Search by name or city"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div> */}
      <div className="grid md:grid-cols-3 gap-8">
        {Data.map((val, k) => (
          <div id="hospitalDetails" key={k} className="mx-4">
            <Card variant="outlined">
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
                    Description : {val.description}
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
      {/* <div className="my-4">
        <Typography variant="body1" component="div" align="center">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="mb-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div> */}
    </Layout>
  );
}

export default Collab;
