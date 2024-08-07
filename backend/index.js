const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const authRoute = require("./auth");
const passport = require("passport");

//Models + Controllers
require("./models/db");
require("./models/user");
const loginController = require("./controllers/login");
const groceryController = require("./controllers/groceries");

const app = express();

//Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Session
app.use(cookieSession(
    {name:"session",
    keys:["recipereaper"],
    maxage: 24 * 60 * 60 * 100})
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Cors
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials:true,
  })
);
app.options('*', cors())

//Routes
app.use("/auth", authRoute);
app.post("/addGrocery", groceryController.createGrocery);
app.get("/viewGroceries", groceryController.viewGroceries);
//Port
const port = (process.env.port || 5000)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
