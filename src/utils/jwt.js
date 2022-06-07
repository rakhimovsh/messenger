import jwt from "jsonwebtoken";
const secretKey = "jwt-secret";

let obj = {
  sign: function (data) {
    return jwt.sign(data, secretKey);
  },
  verify: function (data) {
    return jwt.verify(data, secretKey);
  },
};

export default obj;
