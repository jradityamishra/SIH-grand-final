import { postObject } from "../helper/s3/S3lectureUpload.js";
import lectureUploadModel from "../models/lectureUploadModel.js";

export const lectureUploadController = async (req, resp) => {
  const { title, description, creator } = req.body;
  const lectureUrl = req.file;
  console.log(req.file);
  const videoname = req.file.originalname;

  try {
    const get = await postObject(videoname, lectureUrl);
    if (get) {
      const upload = await lectureUploadModel({
        title: title,
        creator: "657d5fffacbeae883da2fee0",
        description: description,
        lectureUrl: get,
        creator: creator,
      }).save();

      if (upload) {
        resp.status(201).send({
          success: true,
          message: "lecture upload successful",
          upload,
        });
      }
    }
  } catch (error) {
    console.log(error);
    resp.status(501).send({
      success: false,
      message: error.message,
    });
  }
};

export const lectureGetController = async (req, resp) => {
  try {
    const data = await lectureUploadModel.find({}).populate("creator", "name");
    console.log(data);

    resp.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    resp.status(501).send({
      success: false,
      message: error.message,
    });
  }
};
export const increaseCredits = async (req, res, next) => {
  try {
    const { courseID } = req.params;
    const credit = req.body;
    const lecture = await lectureUploadModel.findById(courseID);
    const studentID = req.user._id;
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    lecture.marks.push({
      user: studentID,
      credits: credit,
    });

    await lecture.save();

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getLectureByIdController = async (req, resp) => {
  try {
    const { id } = req.params;

    const lecture = await lectureUploadModel.findById(id).populate("creator");

    if (!lecture) {
      return resp.status(404).send({
        success: false,
        message: "Lecture not found",
      });
    }

    resp.status(200).send({
      lecture,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
