const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/review");
const Authorization = require("../helpers/auth");

router.post("/create", Authorization, reviewsController.create);
router.patch("/update/:id", Authorization, reviewsController.update);
router.get("/user/", Authorization, reviewsController.getReviewsByProfessor);
router.get(
  "/student/",
  Authorization,
  reviewsController.getNotificationsByUser
);

module.exports = router;
