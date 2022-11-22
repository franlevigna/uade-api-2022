const Sequelize = require("sequelize");
const lesson = require("../models").lesson;
const user = require("../models").user;
const review = require("../models").review;
const subscription = require("../models").subscription;
const userTypes = require("../helpers/constants").userTypes;
const getClassesConditionBuilder = require("../helpers/common");

exports.create = async function (req, res) {
  const {
    loggedUser: { user_type, id },
  } = req;

  if (user_type === userTypes.PROFESSOR) {
    try {
      const createdLesson = await lesson.create({
        teacher_id: id,
        title: req.body.title,
        subject: req.body.subject,
        status: req.body.status,
        frequency: req.body.frequency,
        type: req.body.type,
        cost: req.body.cost,
        description: req.body.description,
        duration: req.body.duration,
      });

      return res.status(200).json({
        status: 200,
        data: createdLesson,
        message: "Lesson created successfully",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ status: 400, message: e });
    }
  }

  return res
    .status(403)
    .json({ status: 403, message: "User must be a professor" });
};

exports.update = async function (req, res) {
  // Since lesson attributes cannot be deleted we'll use generic function to update lessons

  const {
    loggedUser: { user_type },
  } = req;
  try {
    if (userTypes.PROFESSOR === user_type) {
      const lessonFound = await lesson.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (lessonFound) {
        lessonFound.title = req.body.title || lessonFound.title;
        lessonFound.subject = req.body.subject || lessonFound.subject;
        lessonFound.statusfrequency =
          req.body.statusfrequency || lessonFound.statusfrequency;
        lessonFound.frequency = req.body.frequency || lessonFound.frequency;
        lessonFound.type = req.body.type || lessonFound.type;
        lessonFound.description =
          req.body.description || lessonFound.description;
        lessonFound.duration = req.body.duration || lessonFound.duration;

        const savedLesson = await lessonFound.save();

        return res.status(200).json({
          status: 200,
          data: savedLesson,
          message: "Lesson updated successfully",
        });
      } else {
        res.status(404).json({ error: "Lesson does not exist" });
      }
    } else {
      res.status(400).json({ error: "User must be a professor" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

exports.search = async function (req, res) {
  try {
    const searchCondition = await getClassesConditionBuilder(req.query);
    const lessonsFound = await lesson.findAll({
      where: searchCondition,
    });

    return res.status(200).json({
      status: 200,
      data: lessonsFound,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error occurred when trying search lessons",
    });
  }
};

exports.delete = async function (req, res) {
  // Since lesson attributes cannot be deleted we'll use generic function to update lessons
  const {
    loggedUser: { user_type },
  } = req;

  try {
    if (userTypes.PROFESSOR === user_type) {
      const deletedLesson = await lesson.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (deletedLesson === 1) {
        return res.status(200).json({
          status: 200,
          message: "Lesson deleted successfully",
        });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Error occurred when trying to delete lesson",
        });
      }
    } else {
      res.status(400).json({ error: "User must be a professor" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error occurred when trying to delete lesson",
    });
  }
};

exports.getLessonByID = async function (req, res, next) {
  try {
    const lessonFound = await lesson.findOne({
      where: { id: req.params.id },
      include: { model: user },
    });

    const reviews = await review.findAll({
      include: {
        model: subscription,
        where: { lesson_id: req.params.id },
      },
    });

    const result = { ...lessonFound.get(), reviews };

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: "Unexpected error" });
  }
};

exports.getLessonsByUser = async function (req, res) {
  const {
    loggedUser: { user_type, id },
  } = req;

  try {
    let lessonsFound;

    if (user_type === userTypes.PROFESSOR) {
      // If user is a professor, we can get classes directly from lessons table
      lessonsFound = await lesson.findAll({
        where: { id: id },
      });
    } else {
      // otherwise, if user is student we need to get classes from subscription
      // since student cannot have a class without subscription
      lessonsFound = await subscription.findAll({
        where: { student_id: req.params.userId },
        include: {
          model: lesson,
        },
      });
    }

    // TODO: Remove user object from response

    return res.status(200).json({
      status: 200,
      data: lessonsFound,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: "Unexpected error" });
  }
};
