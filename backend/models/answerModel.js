module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answers", {
        answer: {
            type: Sequelize.STRING
        },
        ball: {
            type: Sequelize.INTEGER
        }
    });

    return Answer;
};