const Op = require('sequelize').Op;

const getClassesConditionBuilder = async (queryParams) => {
    if (queryParams) {
        const type = queryParams.type != null ? {
            type: queryParams.type
        } : {}

        const rating = queryParams.rating != null ? {
            rating:
                {
                    $gte: queryParams.rating
                }

        } : {}

        const status = {
            status: 'published'
        }


        const title = queryParams.title != null ? {
            title:
                {
                    [Op.like]: `%${queryParams.title}%`
                }
        } : {}


        const subject = queryParams.subject != null ? {
            subject:
                {
                    [Op.like]: `%${queryParams.subject}%`
                }

        } : {}

        const frequency = queryParams.frequency != null ? {frequency: {[Op.in]: queryParams.frequency}} : {}

        return {...frequency, ...subject, ...rating, ...status, ...title, ...type}

    } else return null;
}

module.exports = getClassesConditionBuilder