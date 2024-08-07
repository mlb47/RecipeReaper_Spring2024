const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/"

require("./models/user");
const loginController = require("./controllers/login");

//Handles default login
router.post(
    "/default",
    passport.authenticate("local", {failureRedirect: "login/failed"}), (req, res) => {
      if (req.user) {
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: req.user,
          cookies: req.cookies
        });
      }
      else {
        res.json({
          success: false,
          message: "User is null"
        })
      }
    });


router.get("/login/failed", (req, res) => {
  res.json({
    success: false,
    message: "Login failed",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.end();
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"})
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router
