const db = require("../models");
var bcrypt = require("bcryptjs");


const Op = db.Sequelize.Op;

const { user: User, role: Role, enrollment: Enrollment, task: Task, course: Course, lektion: Lektion,
    refreshToken: RefreshToken, answer: Answer, review: Review} = db;

exports.userBoard = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            res.status(200).send({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.buyCourse = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            Enrollment.findOne({
                where: {
                    userId: req.userId
                }
            })
                .then(async (enrollment) => {
                    if (!enrollment) {
                        user.setRoles([4]).then(() => {
                            Enrollment.create({
                                enrollment_data: new Date(),
                                userId: req.userId,
                                courseId: req.params.id
                            })
                                .then(async () => {
                                    return res.send({ message: "Вы успешно купили курс" });
                                })
                                .catch(err => {
                                    res.status(500).send({ message: err.message });
                                });
                        })
                            .catch(err => {
                                res.status(500).send({ message: err.message });
                            });
                    } else {
                        return res.send({ message: "Вы уже купили курс" });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.addAnswer = (req, res) => {
    console.log(req.body)
    if (!req.files) {
        return res.status(404).send({ message: "Файл не загружен" });
    } else {
        video = req.files.video

        video.mv('./static/' + video.name)
            .then(async () => {
                Answer.create({
                    answer: './static/' + video.name + video.extension,
                    userId: req.userId,
                    taskId: req.params.id,
                    ball: null
                })
                    .then(async () => {
                        return res.send({ message: "Задание отправлено на оценку" });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.getTask = (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(async (task) => {
            if (!task) {
                return res.status(404).send({ message: "Задание не найдено" });
            }
            Answer.findOne({
                where: {
                    userId: req.userId,
                    taskId: req.params.id
                }
            })
                .then(async (answer) => {
                    if (!answer) {
                        task_full = {
                            id: task.id,
                            name: task.name,
                            description: task.description,
                            min_ball: task.min_ball,
                            opened: task.opened,
                            date_start: task.date_start,
                            courseId: task.courseId,
                            ball: "Не отправлено"
                        }
                        res.send(task_full);
                    }
                    else {
                        if (answer.ball !== null) {
                            ball_full = answer.ball
                        } else {
                            ball_full = 'Не оценено'
                        }
                        task_full = {
                            id: task.id,
                            name: task.name,
                            description: task.description,
                            min_ball: task.min_ball,
                            opened: task.opened,
                            date_start: task.date_start,
                            courseId: task.courseId,
                            ball: ball_full
                        }
                        res.send(task_full);
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changeStatusTask = (req, res) => {
    Task.findOne({
        where: {
            id: req.params.taskId
        }
    })
        .then(async (task) => {
            if (!task) {
                return res.status(404).send({ message: "Задание не найдено" });
            }
            console.log(task.opened, !task.opened)
            task.opened = !task.opened
            task.save()
                .then(res.send({ message: "Статус изменен" }))
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getLektion = (req, res) => {
    Lektion.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(async (lektion) => {
            if (!lektion) {
                return res.status(404).send({ message: "Лекция не найдена" });
            }
            res.send(lektion);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.changeStatusLektion = (req, res) => {
    Lektion.findOne({
        where: {
            id: req.params.lektionId
        }
    })
        .then(async (lektion) => {
            if (!lektion) {
                return res.status(404).send({ message: "Лекция не найдена" });
            }
            lektion.opened = !lektion.opened
            lektion.save()
                .then(res.send({ message: "Статус изменен" }))
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllTaskAndLektion = (req, res) => {
    Enrollment.findOne({
        where: {
            userId: req.userId
        }
    })
        .then(async (enrollment) => {
            if (!enrollment) {
                return res.status(404).send({ message: "Курс не найден" });
            }
            Lektion.findAll({
                where: {
                    courseId: enrollment.courseId,
                    opened: true
                }
            })
                .then(async (lektion) => {
                    Task.findAll({
                        where: {
                            courseId: enrollment.courseId,
                            opened: true
                        }
                    })
                        .then(async (task) => {
                            console.log(task)
                            res.send(lektion.concat(task));
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.courses = (req, res) => {
    Course.findAll()
        .then(async (courses) => {
            if (!courses) {
                return res.status(404).send({ message: "Произошла ошибка" });
            }
            res.status(200).send(courses)
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addCourse = (req, res) => {
    Course.create({
        name: req.body.name,
        teacher: req.body.teacher,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price,
        teacherId: req.body.teacherId,
        preview: req.body.preview,
        specialization: req.body.specialization,
        teacher_description: req.body.teacher_description,
        teacher_image: req.body.teacher_image
    })
        .then(async () => {
            return res.send({ message: "Курс создан" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteCourse = (req, res) => {
    Course.findOne({
        where: {
            id: req.body.courseId
        }
    })
        .then(async (course) => {
            if (!course) {
                return res.status(404).send({ message: "Курс не найден" });
            }
            await course.destroy();
            res.send({ message: "Курс удален успешно" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addTask = (req, res) => {
    Course.findOne({
        where: {
            teacherId: req.userId
        }
    })
        .then(async (course) => {
            opened = false
            if (req.body.opened === 'true') {
                opened = true
            }
            Task.create({
                name: req.body.name,
                description: req.body.description,
                opened: opened,
                courseId: course.id,
                min_ball: req.body.min_ball,
                date_start: req.body.date_start
            })
                .then(async () => {
                    return res.send({ message: "Задание создано" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteTask = (req, res) => {
    Task.findOne({
        where: {
            id: req.body.taskId
        }
    })
        .then(async (task) => {
            if (!task) {
                return res.status(404).send({ message: "Задание не найдено" });
            }
            await task.destroy();
            res.send({ message: "Задание удалено успешно" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addLektion = (req, res) => {
    Course.findOne({
        where: {
            teacherId: req.userId
        }
    })
        .then(async (course) => {
            opened = false
            if (req.body.opened === 'true') {
                opened = true
            }
            Lektion.create({
                name: req.body.name,
                video: req.body.video,
                opened: opened,
                courseId: course.id,
                date_start: req.body.date_start
            })
                .then(async () => {
                    return res.send({ message: "Лекция создана" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.deleteLektion = (req, res) => {
    Lektion.findOne({
        where: {
            id: req.body.lektionId
        }
    })
        .then(async (lektion) => {
            if (!lektion) {
                return res.status(404).send({ message: "Лекция не найдена" });
            }
            await lektion.destroy();
            res.send({ message: "Лекция удалена успешно" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAnswers = (req, res) => {
    Answer.findAll({
        include: [{
            model: User,
            attributes: ['first_name', "last_name"],
            required: true,
        }],
        where: {
            taskId: req.params.taskId
        }
    })
        .then(async (answers) => {
            if (!answers) {
                return res.status(404).send({ message: "Произошла ошибка" });
            }
            console.log(answers)
            res.status(200).send(answers);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.download = (req, res) => {
    res.download('./static/' + req.params.file, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).send({message: 'Файл не найден'});
            } else {
                readStream.destroy();
                res.end();
            }
        }
    });
};

exports.addBall = (req, res) => {
    Answer.findOne({
        where: {
            id: req.params.answerId
        }
    })
        .then(async (answer) => {
            if (!answer) {
                return res.status(404).send({ message: "Ответ не найден" });
            }
            answer.ball = req.body.ball

            answer.save()
                .then(res.send({ message: "Оценка выставлена" }))
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllTaskAndLektionForTeacher = (req, res) => {
    Course.findOne({
        where: {
            teacherId: req.userId
        }
    })
        .then(async (course) => {
            if (!course) {
                return res.status(404).send({ message: "Курс не найден" });
            }
            Lektion.findAll({
                where: {
                    courseId: course.id
                }
            })
                .then(async (lektion) => {
                    Task.findAll({
                        where: {
                            courseId: course.id
                        }
                    })
                        .then(async (task) => {
                            res.send(lektion.concat(task));
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.editUser = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.username = req.body.username
            user.email = req.body.email
            user.save()
                .then(res.send({ message: "Данные обновлены" }))
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.users = (req, res) => {
    User.findAll({
        include: [{
            model: Role,
            attributes: ['name'],
            required: true,
        }]
    })
        .then(async (users) => {
            if (!users) {
                return res.status(404).send({ message: "Произошла ошибка" });
            }
            res.status(200).send({users})
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addUser = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async (user) => {
            if (!user) {
                User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                    .then(async (user) => {
                        if (!user) {
                            User.create({
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                username: req.body.username,
                                email: req.body.email,
                                password: bcrypt.hashSync(req.body.password, 8),
                                accepted_oferta: req.body.accepted_oferta
                            })
                                .then(user => {
                                    Role.findAll({
                                        where: {
                                            name: {
                                                [Op.or]: req.body.roles
                                            }
                                        }
                                    }).then(roles => {
                                        console.log(roles)
                                        user.setRoles(roles).then(() => {
                                            res.send({ message: "Пользователь добавлен" });
                                        });
                                    });

                                })
                        } else {
                            res.status(404).send({ message: 'Пользователь с такой почтой уже существует'});
                        }
                    })
            } else {
                res.status(404).send({ message: 'Пользователь с таким никнеймом уже существует'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteUser = (req, res) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            } else {
                await user.destroy();
                res.send({ message: "Пользователь удален успешно" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.addReview = (req, res) => {
    Review.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        review: req.body.review
    })
        .then(async () => {
            return res.send({ message: "Отзыв добавлен" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
