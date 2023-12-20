import TeacherAnalysisModel from "../models/TeacherAnalysisModel.js";
import { User } from "../models/UserModel.js";
import mongoose from "mongoose";
import liveclass from "../models/liveClassModel.js";

export const createTeacherAnalysis = async (req, res) => {
  try {
    const { month, achievements } = req.body;
    const { id } = req.params;

    // Validate input
    if (!id || !month) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Missing required fields.",
      });
    }

    // Validate month
    const numericMonth = parseInt(month);
    if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid request. Month should be a valid number between 1 and 12.",
      });
    }

    // Retrieve user information
    const user = await User.findOne({ _id: id });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. User not found.",
      });
    }

    // Calculate aggregate feedback
    const aggregateFeedback =
      await TeacherAnalysisModel.calculateAggregateFeedback(id, month);

    // Extract user information
    const extractedAchievements = achievements || [];
    //const extractedExperience = user.yearsOfExperience || 0;
    const extractedDegree = user.levelOfEducation || "";

    // Create analysis data
    const analysisData = {
      teacher: id,
      month,
      aggregateFeedback,
      achievements: extractedAchievements,
      //experience: extractedExperience,
      degree: extractedDegree,
    };

    // Create analysis
    const analysis = await TeacherAnalysisModel.create(analysisData);

    return res.status(201).json({
      success: true,
      message: "Teacher analysis created successfully",
      analysis,
    });
  } catch (error) {
    console.error("Error creating teacher analysis:", error);

    // Send a user-friendly error message
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAnalysis = async (req, res, next) => {
  try {
    const analysis = await TeacherAnalysisModel.find({
      teacher: req.params.id,
    });
    return res.status(200).json({
      analysis,
    });
  } catch (error) {
    console.error("Error fetching teacher analysis:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// export const createDummyDataForTeacher = async (req, res) => {
//   try {
//     // Replace 'teacherId' with the actual teacher ID
//     const teacherId = new mongoose.Types.ObjectId("6581605a00bf54f432e7660c");

//     // Create 12 dummy data entries for different months
//     const insertAll = [];
//     const currentMonth = new Date().getMonth() + 1;

//     for (let i = 0; i < 12; i++) {
//       const month = (currentMonth + i) % 12 || 12; // Loop through 1 to 12
//       const aggregateFeedback =
//         await TeacherAnalysisModel.calculateAggregateFeedback(teacherId, month);

//       const dummyEntry = new TeacherAnalysisModel({
//         teacher: teacherId,
//         month,
//         aggregateFeedback, // Ensure that aggregateFeedback is an object
//         achievements: [
//           {
//             title: `Achievement ${i + 1}`,
//             level: "national",
//             certificateUrl: `https://example.com/certificate${i + 1}.pdf`,
//           },
//           // Add more achievements as needed
//         ],
//         experience: 5 + i, // Dummy experience data
//         degree: "Master's in Education", // Dummy degree data
//       });

//       insertAll.push(dummyEntry);
//     }

//     // Insert dummy data into the database one by one
//     for (const entry of insertAll) {
//       await entry.save();
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Dummy data created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating dummy data:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

// export const createLiveClasses = async (req, res) => {
//   try {
//     // Replace these teacherIds with your actual teacher ids in the correct string format
//     const teacherIds = [
//       "6581d4f135bccd47926adfa41",
//       "6581605a00bf54f432e7660c",
//     ];

//     // Generate 20 live classes for each teacher
//     const liveClasses = [];

//     const now = new Date();

//     for (let i = 0; i < 12; i++) {
//       const liveClassData = {
//         subject: `Subject ${i + 1}`,
//         timing: `10:00 AM - 11:30 AM`, // Change as needed
//         date: new Date(now.getFullYear(), now.getMonth() + i, 1), // First day of the next month
//         description: `Description for live class ${i + 1}`,
//         joiningLink: `https://meet.google.com/uso-ojyo-bze`, // Change as needed
//         feedback: {
//           presentationStyle: (Math.random() * 5) + 1,
//           communication: (Math.random() * 5) + 1,
//           engagement: (Math.random() * 5) + 1,
//           pace: (Math.random() * 5) + 1,
//           organization: (Math.random() * 5) + 1,
//         },
//         teacherId: new mongoose.Types.ObjectId("6581605a00bf54f432e7660c"),
//       };

//       liveClasses.push(liveClassData);
//     }

//     for (let i = 0; i < 12; i++) {
//       const liveClassData = {
//         subject: `Subject ${i + 1}`,
//         timing: `10:00 AM - 11:30 AM`, // Change as needed
//         date: new Date(now.getFullYear(), now.getMonth() + i, 1), // First day of the next month
//         description: `Description for live class ${i + 1}`,
//         joiningLink: `https://meet.google.com/uso-ojyo-bze`, // Change as needed
//         feedback: {
//           presentationStyle: (Math.random() * 5) + 1,
//           communication: (Math.random() * 5) + 1,
//           engagement: (Math.random() * 5) + 1,
//           pace: (Math.random() * 5) + 1,
//           organization: (Math.random() * 5) + 1,
//         },
//         teacherId: new mongoose.Types.ObjectId("6581d4f135bccd47926adfa4"),
//       };

//       liveClasses.push(liveClassData);
//     }

//     // Insert live classes into the database
//     await liveclass.insertMany(liveClasses);

//     return res.status(201).json({
//       success: true,
//       message: "Live classes created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating live classes:", error);

//     // Send a user-friendly error message
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };
