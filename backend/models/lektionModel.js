module.exports = (sequelize, Sequelize) => {
    const Lektion = sequelize.define("lektions", {
        name: {
            type: Sequelize.STRING
        },
        video: {
            type: Sequelize.STRING
        },
        opened: {
            type: Sequelize.BOOLEAN
        },
        date_start: {
            type: Sequelize.STRING
        }
    });

    return Lektion;
};