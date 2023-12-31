import { postObject } from "../helper/s3/S3lectureUpload.js";
import lectureUploadModel from "../models/lectureUploadModel.js";

export const lectureUploadController = async (req, resp) => {
  const { title, description,creator } = req.body;
  const lectureUrl = req.file;
  console.log(req.file)
   const videoname = req.file.originalname;

  try {
    const get = await postObject(videoname, lectureUrl);
    if (get) {
      const upload = await lectureUploadModel({
        title: title,
        description: description,
        lectureUrl: get,
        creator:creator
      }).save();


      if (upload) {
        resp.status(201).send({
          success: true,
          message: "lecture uploaded done",
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
    const data = await lectureUploadModel.find({});
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
