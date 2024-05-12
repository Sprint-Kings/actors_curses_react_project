module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answers", {
        answer: {
            type: Sequelize.BLOB
        }
    });

    return Answer;
};