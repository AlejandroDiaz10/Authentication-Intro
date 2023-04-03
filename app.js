require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Salt and hashing
const saltRounds = 10;
const port = 8080;

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server started at -> localhost:${port}`));
    })
    .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
});

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password; // Hashing

    await User.findOne({ email: username })
        .then(user => {
            if (user === null) {
                console.log("Unregistered email");
                return res.render("login");
            } else {
                bcrypt.compare(pwd, user.pwd, function (err, result) {
                    if (result === true) {
                        return res.render("secrets");
                    } else {
                        console.log("Incorrect password");
                        return res.render("login");
                    }
                });
            }
        })
        .catch(err => console.log(err));
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        const newUser = new User({
            email: req.body.username,
            pwd: hash,
        });

        await newUser.save()
            .then(() => res.render("secrets"))
            .catch(err => console.log(err));
    });
});