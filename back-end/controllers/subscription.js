const Sequelize = require("sequelize");
const subscription = require("../models").subscription;
const userTypes = require("../helpers/constants").userTypes;

exports.create = async function (req, res) {
  const {
    loggedUser: { user_type, id },
  } = req;

  if (user_type === userTypes.STUDENT) {
    try {
      const createdSubscription = await subscription.create({
        lesson_id: req.body.lessonId,
        student_id: id,
        status: "sent", // when subscription is created status will always be sent,
        message: req.body.message,
        timeframe_from: req.body.timeframeFrom,
        timeframe_to: req.body.timeframeTo,
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
    loggedUser: { user_type },
  } = req;
  try {
    if (userTypes.PROFESSOR === user_type) {
      const subscriptionFound = await subscription.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (subscriptionFound) {
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
    } else {
      res.status(400).json({ error: "User must be a professor" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: "Unexpected Error" });
  }
};
