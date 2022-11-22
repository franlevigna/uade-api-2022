const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");
const Authorization = require("../helpers/auth");

router.post("/create", usersController.create);
router.post("/forgot-password", usersController.forgotPassword);
router.patch("/change-password", usersController.changePassword);
router.post("/login", usersController.login);
router.delete("/delete", Authorization, usersController.delete);

module.exports = router;
