import { read, write } from "../utils/model.js";
import path from "path";
import { InternalServerError } from "../utils/error.js";

const POST = function (req, res, next) {
  try {
    let messages = read("messages");
    let file = req.files?.file;
    let { user_id, message_body } = JSON.parse(req.body.messageInfo);
    if (file) {
      var fileName = Date.now() + file.name.replace(/\s/i, "-");
      file.mv(path.join(process.cwd(), "src", "uploads", fileName));
    }
    let newMessage = {
      message_id: messages.length
        ? messages[messages.length - 1].message_id + 1
        : 1,
      user_id: user_id,
      message_body: message_body,
      message_file: fileName ? fileName : null,
      message_date: Date.now(),
    };
    messages.push(newMessage);
    write("messages", messages);
    res.status(201).send({
      status: 201,
      message: "habar yuborildi",
      data: newMessage,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};
const GET = function (req, res, next) {
  try {
    let users = read("users");
    let messages = read("messages");
    messages.forEach(function (message) {
      message.user = users.find((user) => user.user_id == message.user_id);
      delete message.user_id;
    });
    res.status(201).send({
      status: 201,
      message: "",
      data: messages,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default {
  POST,
  GET,
};
