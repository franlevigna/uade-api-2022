const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const user = require("../models").user;
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/mailer");
const EMAIL = require("../helpers/constants").EMAIL;
const BASE_URL = require("../helpers/constants").BASE_URL;
const SECRET = require("../helpers/constants").SECRET;

exports.create = async function (req, res) {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 12);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
  try {
    const createdUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      password: hashedPassword,
      primary: req.body.status,
      universitary: req.body.universitary,
      secundary: req.body.secundary,
      terciary: req.body.terciary,
      birth_date: req.body.birth_date,
      experience: req.body.experience,
      degree: req.body.status,
      user_type: req.body.userType,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.status(200).json({
      status: 200,
      data: createdUser,
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e });
  }
};

exports.login = async function (req, res) {
  const userFound = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  let token;
  if (userFound) {
    const passwordValid = await bcrypt.compare(
      req.body.password,
      userFound.password
    );
    if (passwordValid) {
      token = jwt.sign(
        {
          ...userFound.get(),
          expiresIn: 86400,
        },
        SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

exports.delete = async function (req, res) {
  try {
    const deletedUser = await user.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedUser === 1) {
      return res.status(200).json({
        status: 200,
        message: "User deleted successfully",
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Error occurred when trying to delete user",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error occurred when trying to delete user",
    });
  }
};

exports.forgotPassword = async function (req, res) {
  try {
    const token = jwt.sign(
      {
        email: req.body.email,
        expiresIn: 60 * 10,
      },
      SECRET
    );
    await transporter.sendMail({
      from: `Forgot password <${EMAIL}>`,
      to: req.body.email,
      subject: "Seguí las instrucciones para cambiar tu contraseña ✔",
      text: "",
      html: `<b>Por favor segui el siguiente <a href=${BASE_URL}forgot-password?${token}>link</a> para completar el proceso</b>`,
    });

    res.status(200).json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Failed to send email",
    });
  }
};

exports.changePassword = async function (req, res) {
  let jwt_decoded;
  try {
    jwt.verify(req.body.access_token, SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Invalid or expired token" });
      }
      jwt_decoded = decoded;
    });

    const userFound = await user.findOne({
      where: {
        email: jwt_decoded.email,
      },
    });

    userFound.password = await bcrypt.hash(req.body.password, 12);
    userFound.updated_at = new Date();

    const savedNewUser = await userFound.save();

    res.status(200).json({
      status: 200,
      data: savedNewUser,
      message: "Password changed successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Failed to change password",
    });
  }
};
