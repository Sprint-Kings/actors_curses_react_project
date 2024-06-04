module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
        name: {
            type: Sequelize.STRING
        },
        teacher: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        duration: {
          type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        preview: {
            type: Sequelize.STRING
        },
        specialization: {
            type: Sequelize.STRING
        },
        teacher_description: {
            type: Sequelize.TEXT
        },
        teacher_image: {
            type: Sequelize.STRING
        }
    });

    return Course;
};