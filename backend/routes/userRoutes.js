const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.post(
        "/api/user/buy",
        [authJwt.verifyToken],
        controller.buyCourse
    );

    app.post(
        "/api/user/answer/:id/submit",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.addAnswer
    );

    app.get(
        "/api/user/task/:id",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.getTask
    );

    app.get(
        "/api/user/lektion/:id",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.getLektion
    );

    app.get(
        "/api/user/task/all",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.getAllTaskAndLektion
    );

    app.get(
        "/api/admin/users",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.users
    );

    app.post(
        "/api/admin/users/submit",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.addUser
    );

    app.post(
        "/api/admin/users/delete",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
    );

    app.get(
        "/api/admin/courses",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.courses
    );

    app.post(
        "/api/admin/courses/submit",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.addCourse
    );

    app.post(
        "/api/admin/courses/delete",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteCourse
    );

    app.post(
        "/api/teacher/task/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.addTask
    );

    app.post(
        "/api/teacher/task/delete",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.deleteTask
    );

    app.post(
        "/api/teacher/lektion/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.addLektion
    );

    app.post(
        "/api/teacher/lektion/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.deleteLektion
    );

    app.get("/api/teacher/:taskId/answers",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.getAnswers
    );

    app.post(
        "/api/teacher/answer/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.addBall
    );

    app.get("/api/download",
        [authJwt.verifyToken],
        controller.download
    );
};