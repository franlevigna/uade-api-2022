const express = require("express");
const router = express.Router();
const subscriptionsController = require("../controllers/subscription");
const Authorization = require("../helpers/auth");

router.get(
  "/professor",
  Authorization,
  subscriptionsController.getProffesorHirings
);
router.post("/create", Authorization, subscriptionsController.create);
router.patch("/update/:id", Authorization, subscriptionsController.update);

module.exports = router;
