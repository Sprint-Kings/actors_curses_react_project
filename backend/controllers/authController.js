const db = require("../models");
const config = require("../config/authConfig");
const nodemailer = require('nodemailer');

const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const PDFDocument = require("pdfkit");

exports.signup = (req, res) => {
    // Save User to Database
    accept = false
    if (req.body.accepted_oferta == "true") {
        accept = true
    }

    User.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        accepted_oferta: accept
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
                        res.send({ message: "Поздравляем! Вы успешно зарегестрировались" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "Поздравляем! Вы успешно зарегестрировались" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({ message: "Пользователь не найден" });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Неправильный пароль"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);

            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }

                res.status(200).send({
                    accessToken: token,
                    refreshToken: refreshToken,
                    roles: authorities,
                    username: user.username,
                    id: user.id
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.refreshToken = async (req, res) => {
    const requestToken= req.body.refreshToken;
    console.log(requestToken)
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
