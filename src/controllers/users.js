import { read, write } from "../utils/model.js";
import sha256 from "sha256";
import {
  AuthrizationError,
  InternalServerError,
  ValidationError,
} from "../utils/error.js";
import jwt from "../utils/jwt.js";
import path from "path";

const LOGIN = function (req, res, next) {
  try {
    let users = read("users");
    let { user_name, user_password } = req.body;
    let findUser = users.find(
      (user) =>
        user.user_name == user_name &&
        user.user_password == sha256(user_password)
    );
    if (!findUser) {
      return next(new AuthrizationError(401, "wrong username or password"));
    }

    delete findUser.user_password;

    res.status(200).send({
      status: 200,
      message: "you are logged in",
      token: jwt.sign({
        user_id: findUser.user_id,
        ip: req.ip,
        agent: req.headers["user-agent"],
      }),
      data: findUser,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};
const REGISTER = function (req, res, next) {
  try {
    let users = read("users");
    let { file } = req.files;
    let { user_name, user_password, user_email } = JSON.parse(
      req.body.userData
    );
    let fileName = Date.now() + file.name.replace(/\s/i, "-");
    if (!file) {
      return next(new ValidationError(401, "image is not defined"));
    }
    let newUser = {
      user_id: users.length ? users[users.length - 1].user_id + 1 : 1,
      user_name: user_name,
      user_password: sha256(user_password),
      user_email: user_email,
      user_avatar: "/view/" + fileName,
    };
    users.push(newUser);
    write("users", users);
    file.mv(path.join(process.cwd(), "src", "uploads", fileName));
    delete newUser.user_password;
    res.status(201).send({
      status: 201,
      message: "you are registered successfully",
      token: jwt.sign({
        user_id: newUser.user_id,
        ip: req.ip,
        agent: req.headers["user-agent"],
      }),
      data: newUser,
    });
  } catch (error) {
    next(500, new InternalServerError(500, error.message));
  }
};
const GET = function (req, res, next) {
  try {
    let users = read("users");
    users.forEach(function (user) {
      delete user.user_password;
    });
    res.status(201).send({
      status: 200,
      data: users,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message));
  }
};

export default {
  LOGIN,
  GET,
  REGISTER,
};
