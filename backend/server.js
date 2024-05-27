const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

var corsOptions = {
    origin: ["http://localhost:3000", "http://192.168.56.1:3000"]
};

app.use(fileUpload({
    createParentPath: true
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

require('./routes/authRoutes')(app);
require('./routes/courseRoutes')(app);
require('./routes/userRoutes')(app);

const db = require("./models");
const Role = db.role;


db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync Db');

});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "teacher"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    Role.create({
        id: 4,
        name: "student"
    });
}

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
