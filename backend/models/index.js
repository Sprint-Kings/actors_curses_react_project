const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        define: {
            timestamps: false
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel.js")(sequelize, Sequelize);
db.role = require("../models/roleModel.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshTokenModel.js")(sequelize, Sequelize);
db.answer = require("../models/answerModel.js")(sequelize, Sequelize);
db.course = require("../models/courseModel.js")(sequelize, Sequelize);
db.enrollment = require("../models/enrollmentModel.js")(sequelize, Sequelize);
db.lektion = require("../models/lektionModel.js")(sequelize, Sequelize);
db.payment = require("../models/paymentModel.js")(sequelize, Sequelize);
db.task = require("../models/taskModel.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

db.lektion.belongsTo(db.course, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.course.hasOne(db.lektion, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.task.belongsTo(db.course, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.course.hasOne(db.task, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.course.belongsTo(db.user, {
    foreignKey: 'teacherId', targetKey: 'id'
});

db.user.hasOne(db.course, {
    foreignKey: 'teacherId', targetKey: 'id'
});

db.answer.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.answer, {
    foreignKey: 'userId', targetKey: 'id'
});

db.answer.belongsTo(db.task, {
    foreignKey: 'taskId', targetKey: 'id'
});

db.task.hasOne(db.answer, {
    foreignKey: 'taskId', targetKey: 'id'
});

db.payment.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.payment, {
    foreignKey: 'userId', targetKey: 'id'
});

db.enrollment.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.enrollment, {
    foreignKey: 'userId', targetKey: 'id'
});

db.enrollment.belongsTo(db.course, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.course.hasOne(db.enrollment, {
    foreignKey: 'courseId', targetKey: 'id'
});

db.ROLES = ["user", "admin", "teacher", "student"];

module.exports = db;