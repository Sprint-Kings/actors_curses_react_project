module.exports = (sequelize, Sequelize) => {
    const Enrollment = sequelize.define("enrollments", {
        enrollment_data: {
            type: Sequelize.DATE
        }
    });

    return Enrollment;
};