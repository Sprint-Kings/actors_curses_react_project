module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        review: {
            type: Sequelize.STRING
        },
    });

    return Review;
};