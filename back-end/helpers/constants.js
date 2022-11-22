const dotenv = require("dotenv");
dotenv.config();

const EMAIL = process.env.EMAIL_USER;
const BASE_URL = process.env.BASE_URL;
const SECRET = process.env.SECRET;

const userTypes = {
  PROFESSOR: "professor",
  STUDENT: "student",
};

module.exports = { userTypes, EMAIL, BASE_URL, SECRET };
