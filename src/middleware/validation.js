import { registerSchema, loginSchema } from "../utils/validation.js";
import { ValidationError } from "../utils/error.js";

export default function (req, res, next) {
  try {
    if (req.url == "/login") {
      let { error } = loginSchema.validate(req.body);
      if (error) {
        throw error;
      }
    }
    if (req.url == "/register") {
      let { error } = registerSchema.validate(JSON.parse(req.body.userData));
      if (error) {
        throw error;
      }
    }
    return next();
  } catch (error) {
    return next(new ValidationError(401, error.message));
  }
}
