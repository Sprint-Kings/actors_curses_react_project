module.exports = (sequelize, Sequelize) => {
    const Lektion = sequelize.define("lektions", {
        name: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        }
    });

    return Lektion;
};