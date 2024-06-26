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
        "/api/user/edit",
        [authJwt.verifyToken],
        controller.editUser
    );

    app.post(
        "/api/user/:id/buy",
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
        "/api/user/tasks/all",
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
        "/api/teacher/task/:taskId/status",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.changeStatusTask
    );

    app.post(
        "/api/teacher/lektion/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.addLektion
    );

    app.post(
        "/api/teacher/lektion/delete",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.deleteLektion
    );

    app.post(
        "/api/teacher/lektion/:lektionId/status",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.changeStatusLektion
    );

    app.get("/api/teacher/:taskId/answers",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.getAnswers
    );

    app.post(
        "/api/teacher/answer/:answerId/add",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.addBall
    );

    app.get(
        "/api/teacher/task/all",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.getAllTaskAndLektionForTeacher
    );

    app.get("/api/download/:file",
        controller.download
    );

    app.post("/api/review/add",
        controller.addReview
    );
};