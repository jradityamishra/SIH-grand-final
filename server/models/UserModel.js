import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

const teacherSchema = new mongoose.Schema(
  {
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    subjectsTaught: [
      {
        type: String,
        required: true,
      },
    ],

    levelOfEducation: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    teacherClass: {
      type: Number,
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
  },
  { timestamps: true }
);

const Teacher = User.discriminator("Teacher", teacherSchema);

const studentSchema = new mongoose.Schema(
  {
    credits: {
      type: Number,
      default: 0,
    },
    assignmentCredits: {
      type: Number,
      default: 0,
    },
    studentClass: {
      type: Number,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    coursesEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
  },
  { timestamps: true }
);

const Student = User.discriminator("Student", studentSchema);

export { User, Teacher, Student };
