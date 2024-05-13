const db = require("../models");
const { course: Course} = db;

exports.oneCourse = (req, res) => {
    Course.findOne({
        where: {
            id: req.params.courseId
        }
    })
        .then(async (course) => {
            if (!course) {
                return res.status(404).send({ message: "Курс не найден" });
            }
            res.status(200).send(course)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.allCourses = (req, res) => {
    Course.findAll({
    })
        .then(async (courses) => {
            if (!courses) {
                return res.status(404).send({ message: "Курсы не найдены" });
            }

            res.status(200).send(courses)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


