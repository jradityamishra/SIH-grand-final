import { postObject } from "../helper/s3/S3lectureUpload.js";
import assignmentModel from "../models/assignmentModel.js";

export const assignmentUploadController = async (req, resp) => {
  const file = req.body;
  console.log(file.descriptionFile);
  console.log(req.data)
  // const pdfName = req.file.originalname;

  try {
    const get = await postObject(pdfName, file);
    if (get) {
      const upload = await assignmentModel({
        studentName: pdfName,
        assignmentPdf: get,
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

export const assignmentGetController = async (req, resp) => {
  console.log(req.body)
  console.log(req.body.file);
  try {
    const data = await assignmentModel.find({});
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
