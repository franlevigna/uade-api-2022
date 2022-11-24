const Sequelize = require("sequelize");
const subscription = require("../models").subscription;
const lesson = require("../models").lesson;
const user = require("../models").user;
const userTypes = require("../helpers/constants").userTypes;

exports.getProffesorHirings = async function (req, res) {
  const {
    loggedUser: { userType, id },
  } = req;

  if (userType === userTypes.PROFESSOR) {
    try {
      const subscriptions = await subscription.findAll({
        include: [
          {
            model: lesson,
            where: { teacherId: id },
          },
          {
            model: user,
          },
        ],
      });
      return res.status(200).json({
        data: subscriptions,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: 400, message: error });
    }
  }
  return res
    .status(403)
    .json({ message: "Only professor can access this resource" });
};

exports.create = async function (req, res) {
  const {
    loggedUser: { userType, id },
  } = req;

  if (userType === userTypes.STUDENT) {
    try {
      const createdSubscription = await subscription.create({
        lessonId: req.body.lessonId,
        studentId: id,
        status: "requested", // when subscription is created status will always be requested,
        message: req.body.message,
        timeframeFrom: req.body.timeframeFrom,
        timeframeTo: req.body.timeframeTo,
      });

      return res.status(200).json({
        status: 200,
        data: createdSubscription,
        message: "Subscription created successfully",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e });
    }
  }
};

exports.update = async function (req, res) {
  const {
    loggedUser: { userType },
  } = req;
  try {
    const subscriptionFound = await subscription.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (subscriptionFound) {
      if (userTypes.PROFESSOR !== userType && req.body.status === "accepted") {
        return res
          .status(400)
          .json({ error: "User must be a professor to accept a subscription" });
      }
      subscriptionFound.status = req.body.status || subscriptionFound.status;
      const savedSubscription = await subscriptionFound.save();

      return res.status(200).json({
        status: 200,
        data: savedSubscription,
        message: "Subscription updated successfully",
      });
    } else {
      res.status(404).json({ error: "Subscription does not exist" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: "Unexpected Error" });
  }
};
