const db = require("../models");
var bcrypt = require("bcryptjs");


const Op = db.Sequelize.Op;

const { user: User, role: Role, enrollment: Enrollment, task: Task, course: Course, lektion: Lektion,
    refreshToken: RefreshToken, answer: Answer, cart: Cart, orders: Orders } = db;

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
            user.setRoles([4]).then(() => {
                Enrollment.create({
                    enrollment_data: new Date(),
                    userId: req.userId,
                    courseId: req.body.courseId
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
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.addAnswer = (req, res) => {
    if (!req.files) {
        return res.status(404).send({ message: "Файл не загружен" });
    } else {
        video = req.files.video

        video.mv('./static/' + video.name)
            .then(async () => {
                Answer.create({
                    answer: './static/' + video.name,
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
            res.send(task);
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

exports.getAllTaskAndLektion = (req, res) => {
    Lektion.findOne({
        where: {
            id: req.body.lektionId
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

exports.courses = (req, res) => {
    Course.findAll()
        .then(async (courses) => {
            if (!courses) {
                return res.status(404).send({ message: "Произошла ошибка" });
            }
            res.status(200).send({courses})
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
        duration: Number(req.body.duration),
        price: Number(req.body.price),
        teacherId: Number(req.body.teacherId),
        preview: req.body.preview
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
    opened = false
    if (req.body.opened === 'true') {
        opened = true
    }
    Task.create({
        name: req.body.name,
        description: req.body.description,
        opened: opened,
        courseId: Number(req.body.courseId),
        min_ball: Number(req.body.min_ball)
    })
        .then(async () => {
            return res.send({ message: "Задание создано" });
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
    opened = false
    if (req.body.opened === 'true') {
        opened = true
    }
    Lektion.create({
        name: req.body.name,
        video: req.body.video,
        opened: opened,
        courseId: Number(req.body.courseId)
    })
        .then(async () => {
            return res.send({ message: "Лекция создана" });
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
            attributes: ['first_name'],
            required: true,
        }],
        where: {
            id: req.params.taskId
        }
    })
        .then(async (answers) => {
            if (!answers) {
                return res.status(404).send({ message: "Произошла ошибка" });
            }
            res.status(200).send(answers);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.download = (req, res) => {
    res.download(req.body.filePath, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).send('Файл не найден');
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

exports.deleteCart = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            if (req.body.productId) {
                Cart.findOne({
                    where: {
                        product_id: req.body.productId,
                        userid: req.userId
                    }
                }).then(async (product) => {
                    if (!product) {
                        return res.status(404).send({ message: "Товар не найден" });
                    } else {
                        await product.destroy();
                        res.send({ message: "Товар удален из корзины" });
                    }
                })
            } else {
                res.status(404).send({ message: "При удалении товара из корзины произошла ошибка" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.userOrders = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            const orders = await user.getOrders()
            res.status(200).send(orders);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.userOrder = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }

            const order = await Orders.findOne({ where: { id: req.params.id } })
            res.status(200).send(order);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.deleteOrder = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }
            if (req.body.orderId) {
                Orders.findOne({
                    where: {
                        id: req.body.orderId,
                        userid: req.userId
                    }
                }).then(async (order) => {
                    if (!order) {
                        return res.status(404).send({ message: "Заказ не найден" });
                    } else {
                        await order.destroy();
                        res.send({ message: "Заказ отменен" });
                    }
                })
            } else {
                res.status(404).send({ message: "При отмене заказа произошла ошибка" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.adminBoard = (req, res) => {
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

exports.users = (req, res) => {
    User.findAll()
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
                                first_name: req.body.firstName,
                                last_name: req.body.lastName,
                                username: req.body.username,
                                email: req.body.email,
                                password: bcrypt.hashSync(req.body.password, 8)
                            })
                                .then(user => {
                                    if (req.body.roles) {
                                        Role.findAll({
                                            where: {
                                                name: {
                                                    [Op.or]: req.body.roles
                                                }
                                            }
                                        }).then(roles => {
                                            user.setRoles(roles).then(() => {
                                                res.send({ message: "Пользователь добавлен" });
                                            });
                                        });
                                    } else {
                                        // user role = 1
                                        user.setRoles([1]).then(() => {
                                            res.send({ message: "Пользователь добавлен с ролью user" });
                                        });
                                    }
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
