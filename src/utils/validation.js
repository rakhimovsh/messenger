import Joi from "joi";

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"
);

export const loginSchema = Joi.object({
  user_name: Joi.string().required(),
  user_password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  user_name: Joi.string().max(20).required(),
  user_password: Joi.string()
    .min(8)
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
  user_email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
    .error(new Error("email error entered"))
    .required(),
});
