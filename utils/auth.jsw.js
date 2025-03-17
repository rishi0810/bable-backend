import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

const createtoken = (user) => {
  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

const validatetoken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};

export { createtoken, validatetoken };
