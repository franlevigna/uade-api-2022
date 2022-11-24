const Sequelize = require("sequelize");
const review = require("../models").review;
const lesson = require("../models").lesson;
const subscription = require("../models").subscription;
const userTypes = require("../helpers/constants").userTypes;

exports.create = async function (req, res) {
  const {
    loggedUser: { userType, id },
  } = req;

  if (userType === userTypes.STUDENT) {
    try {
      // Verify if user is subscribed to the class
      const subscriptionFound = await subscription.findOne({
        where: { studentId: id, lessonId: req.body.lessonId },
      });
      if (subscriptionFound) {
        const createdReview = await review.create({
          subscriptionId: subscriptionFound.id,
          studentId: id,
          rating: req.body.rating,
          status: "sent", // when subscription is created status will always be sent
          comment: req.body.comment,
        });

        return res.status(200).json({
          data: createdReview,
          message: "Review created successfully",
        });
      }

      return res
        .status(404)
        .json({ status: 404, message: "Subscription not found" });
    } catch (e) {
      console.log("ERROR", e);
      return res.status(500).json({ status: 500, message: e });
    }
  }
  return res
    .status(403)
    .json({ status: 500, message: "Only student can review a class" });
};

exports.update = async function (req, res) {
  try {
    const reviewFound = await review.findOne({
      where: { id: req.params.id },
    });
    if (reviewFound) {
      reviewFound.rating = req.body.rating || reviewFound.rating;
      reviewFound.status = req.body.status || reviewFound.status;
      reviewFound.commentDisclaimer =
        req.body.commentDisclaimer || reviewFound.commentDisclaimer;

      const savedReview = await reviewFound.save();

      return res.status(200).json({
        status: 200,
        data: savedReview,
        message: "Review updated successfully",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Review not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e });
  }
};

exports.getReviewsByProfessor = async function (req, res) {
  const {
    loggedUser: { userType, id },
  } = req;

  console.log(id);

  if (userType === userTypes.PROFESSOR) {
    try {
      const reviewsFound = await review.findAll({
        where: { status: "sent" },
        include: [
          {
            model: subscription,
            include: { all: true, nested: true },
          },
        ],
      });
      return res.status(200).json({
        status: 200,
        data: reviewsFound,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 500, message: e });
    }
  }
};

exports.getNotificationsByUser = async function (req, res) {
  const {
    loggedUser: { userType, id },
  } = req;
  if (userType === userTypes.STUDENT) {
    try {
      const reviewsFound = await review.findAll({
        where: { status: "blocked" },
        include: [
          {
            model: subscription,
            include: { all: true, nested: true },
          },
        ],
      });

      return res.status(200).json({
        data: reviewsFound,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 500, message: e });
    }
  }
  return res
    .status(403)
    .json({ status: 403, message: "User must be a student" });
};
