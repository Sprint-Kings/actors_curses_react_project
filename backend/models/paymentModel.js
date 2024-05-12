module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payments", {
        payment_data: {
            type: Sequelize.DATE
        },
        sum: {
            type: Sequelize.INTEGER
        }
    });

    return Payment;
};