const dotenv = require("dotenv");
dotenv.config();

const EMAIL = process.env.EMAIL_USER;
const BASE_URL = process.env.BASE_URL;
const SECRET = process.env.SECRET;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

const userTypes = {
  PROFESSOR: "professor",
  STUDENT: "student",
};

module.exports = {
  userTypes,
  EMAIL,
  BASE_URL,
  SECRET,
  CLOUDINARY_UPLOAD_PRESET,
};
