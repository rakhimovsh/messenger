import path from "path";
import { read, write } from "../utils/model.js";
import { InternalServerError } from "../utils/error.js";

const GET = function (req, res, next) {
  try {
    let imgName = req.params.img;
    res.sendFile(path.join(process.cwd(), "src", "uploads", imgName));
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};
const GETALL = function (req, res, next) {
  try {
    let messages = read("messages");
    let files = messages
      .filter((message) => message.message_file != null)
      .map((message) => {
        return {
          name: message.message_file,
          file: (message.message_file = "/download/" + message.message_file),
        };
      });
    res.status(201).send({
      status: 201,
      data: files,
      message: "",
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};
const DOWNLOAD = function (req, res, next) {
  try {
    let fileName = req.params.file;
    res.download(path.join(process.cwd(), "src", "uploads", fileName));
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default {
  GET,
  GETALL,
  DOWNLOAD,
};
