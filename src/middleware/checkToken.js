import jwt from "../utils/jwt.js";
import { InternalServerError, ForbiddenError } from "../utils/error.js";

export default function (req, res, next) {
  try {
    let { token } = req.headers;
    if (!token) return next(new ForbiddenError(403, "Invalid token"));
    let { agent, ip } = jwt.verify(token);
    if (agent != req.headers["user-agent"] || ip != req.ip) {
      return next(new ForbiddenError(403, "token data did not match"));
    }
    return next();
  } catch (error) {
    next(new InternalServerError(error.message));
  }
}
