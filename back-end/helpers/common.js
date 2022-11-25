const Op = require("sequelize").Op;

const getClassesWhereConditionBuilder = async (queryParams) => {
  if (queryParams) {
    const type =
      queryParams.type != null
        ? {
            type: queryParams.type,
          }
        : {};

    const status = {
      status: "published",
    };

    const title =
      queryParams.title != null
        ? {
            title: {
              [Op.like]: `%${queryParams.title}%`,
            },
          }
        : {};

    const subject =
      queryParams.subject != null
        ? {
            subject: {
              [Op.like]: `%${queryParams.subject}%`,
            },
          }
        : {};

    // const frequency = queryParams.frequency != null ? {frequency: {[Op.in]: queryParams.frequency}} : {}
    const frequency =
      queryParams.frequency != null
        ? {
            frequency: queryParams.frequency,
          }
        : {};

    return {
      ...frequency,
      ...subject,
      ...status,
      ...title,
      ...type,
    };
  } else return null;
};

module.exports = getClassesWhereConditionBuilder;
