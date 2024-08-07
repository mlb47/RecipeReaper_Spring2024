const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "26499526261-6t26a88ebp38hmdvreheppasal4bhq35.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "d0dc862a772682073a68";
const GITHUB_CLIENT_SECRET = "b06d4af4c6a11b88615b0607579ea30c126be6e3";


const User = require("./models/user.js");

passport.use(new LocalStrategy(
    User.authenticate()
 )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      if (!User.find({username: profile.displayName})) {
        User.create(new User({username:profile.displayName}));
      }
      done(null, profile);
    }
  )
);

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
  },
   function(accessToken, refreshToken, profile, done) {
      if (!User.find({username: profile.displayName})) {
        User.create(new User({username:profile.displayName}));
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});
