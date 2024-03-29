import Layout from "../../components/layout/Layout";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const usersWithAchievements = [
  {
    id: 1,
    name: "John Doe",
    achievements: "Winner of Innovation Award",
    avatarUrl: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    achievements: "Published Author of the Year",
    avatarUrl: "https://example.com/avatar2.jpg",
  },
  {
    id: 3,
    name: "Alex Johnson",
    achievements: "Tech Influencer of the Month",
    avatarUrl: "https://example.com/avatar3.jpg",
  },
  {
    id: 4,
    name: "Emily Brown",
    achievements: "Top Performer in Sales",
    avatarUrl: "https://example.com/avatar4.jpg",
  },
  {
    id: 5,
    name: "Michael Wilson",
    achievements: "Outstanding Volunteer of the Year",
    avatarUrl: "https://example.com/avatar5.jpg",
  },
  {
    id: 6,
    name: "Olivia Davis",
    achievements: "Artistic Achievement Award",
    avatarUrl: "https://example.com/avatar6.jpg",
  },
  {
    id: 7,
    name: "William Turner",
    achievements: "Community Leader of the Month",
    avatarUrl: "https://example.com/avatar7.jpg",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    achievements: "Exceptional Student Researcher",
    avatarUrl: "https://example.com/avatar8.jpg",
  },
  {
    id: 9,
    name: "Daniel Lee",
    achievements: "Innovative Startup Founder",
    avatarUrl: "https://example.com/avatar9.jpg",
  },
  {
    id: 10,
    name: "Ella Taylor",
    achievements: "Environmental Sustainability Advocate",
    avatarUrl: "https://example.com/avatar10.jpg",
  },
  // Add more users as needed
];

const Forum = () => {
  return (
    <Layout>
      <div className="mt-8">
        <h2 className="text-3xl text-center font-semibold mb-4">
          Featured Individuals
        </h2>
        <Grid container spacing={4}>
          {usersWithAchievements.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <div className="flex items-center w-full justify-center">
                <div className="max-w-xs">
                  <div className="bg-white shadow-lg shadow-blue-100 rounded-lg px-16 py-3">
                    <div className="photo-wrapper p-2">
                      <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="John Doe"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                        {user.name}
                      </h3>
                      <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Web Developer</p>
                      </div>
                      <table className="text-xs my-3">
                        <tbody>
                          <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                              Achievements
                            </td>
                            <td className="px-2 py-2">{user.achievements}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="text-center my-3">
                        <Link to={`teacher/public-profile/${user.id}`}>
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default Forum;
