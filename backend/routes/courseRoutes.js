const controller = require("../controllers/courseController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/courses/:courseId", controller.oneCourse);

    app.get("/api/courses", controller.allCourses);

};