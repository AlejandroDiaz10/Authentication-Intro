require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
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

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["pwd"] });

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;

    await User.findOne({ email: username })
        .then(user => {
            if (user === null) {
                console.log("Unregistered email");
                return res.render("login");
            } else if (user.pwd !== pwd) {
                console.log("Incorrect password");
                return res.render("login");
            } else {
                console.log(user.pwd);
                return res.render("secrets");
            }
        })
        .catch(err => console.log(err));
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const newUser = new User({
        email: req.body.username,
        pwd: req.body.password,
    });

    await newUser.save()
        .then(() => res.render("secrets"))
        .catch(err => console.log(err));
});