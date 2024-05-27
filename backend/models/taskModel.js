module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        min_ball: {
            type: Sequelize.INTEGER
        },
        opened: {
            type: Sequelize.BOOLEAN
        },
        date_start: {
            type: Sequelize.STRING
        }
    });

    return Task;
};