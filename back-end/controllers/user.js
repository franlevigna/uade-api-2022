const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const user = require("../models").user;
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/mailer");
const EMAIL = require("../helpers/constants").EMAIL;
const UI_BASE_URL = require("../helpers/constants").UI_BASE_URL;
const SECRET = require("../helpers/constants").SECRET;
const CLOUDINARY_UPLOAD_PRESET =
  require("../helpers/constants").CLOUDINARY_UPLOAD_PRESET;
const { cloudinary } = require("../helpers/cloudinary");

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
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      primary: req.body.status,
      universitary: req.body.universitary,
      secundary: req.body.secundary,
      terciary: req.body.terciary,
      birthDate: req.body.birthDate,
      experience: req.body.experience,
      degree: req.body.status,
      userType: req.body.userType,
    });

    const token = jwt.sign(
      {
        ...createdUser.get(),
        expiresIn: 86400,
      },
      SECRET
    );
    return res.status(200).json({
      data: createdUser,
      accessToken: token,
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
          email: userFound.email,
          userType: userFound.userType,
          id: userFound.id,
          expiresIn: 86400,
        },
        SECRET
      );

      res.status(200).json({ data: userFound, accessToken: token });
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
      html: `<b>Por favor segui el siguiente <a taret="_blank" rel="noopener noreferrer" href=${UI_BASE_URL}forgot-password?token=${token}>link</a> para completar el proceso</b>`,
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
          .status(401)
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

exports.update = async function (req, res) {
  try {
    const userFound = await user.findOne({
      where: {
        id: req.loggedUser.id,
      },
    });

    if (userFound) {
      userFound.email = req.body.email || userFound.email;
      userFound.phoneNumber = req.body.phoneNumber || userFound.phoneNumber;
      userFound.firstName = req.body.firstName || userFound.firstName;
      userFound.lastName = req.body.lastName || userFound.lastName;
      userFound.password = req.body.password || userFound.password;
      userFound.primary = req.body.primary || userFound.primary;
      userFound.universitary = req.body.universitary || userFound.universitary;
      userFound.secundary = req.body.secundary || userFound.secundary;
      userFound.terciary = req.body.terciary || userFound.terciary;
      userFound.birthDate = req.body.birthDate || userFound.birthDate;
      userFound.experience = req.body.experience || userFound.experience;
      userFound.degree = req.body.degree || userFound.degree;

      const strImage = req.body.profileImage;
      if (strImage) {
        const uploadedResponse = await cloudinary.uploader.upload(strImage, {
          upload_preset: CLOUDINARY_UPLOAD_PRESET,
        });
        userFound.profileImage = uploadedResponse.url;
      }

      const savedUser = await userFound.save();

      const token = jwt.sign(
        {
          email: savedUser.email,
          userType: savedUser.userType,
          id: savedUser.id,
          expiresIn: 86400,
        },
        SECRET
      );

      res.status(200).json({
        status: 200,
        data: savedUser,
        accessToken: token,
        message: "User updated successfully",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Failed to update user",
    });
  }
};
