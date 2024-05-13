module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
        name: {
            type: Sequelize.STRING
        },
        teacher: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        duration: {
          type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        preview: {
            type: Sequelize.STRING
        }
    });

    return Course;
};