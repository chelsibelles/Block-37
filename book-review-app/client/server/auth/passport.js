const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const db = require("./db");
const jwt = require("jsonwebtoken");

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let { rows: [instructor] } = await db.query(
      "SELECT * FROM instructor WHERE github_id = $1",
      [profile.id]
    );

    if (!instructor) {
      const { rows: [newInstructor] } = await db.query(
        "INSERT INTO instructor (username, github_id) VALUES ($1, $2) RETURNING *",
        [profile.username, profile.id]
      );
      instructor = newInstructor;
    }

    const token = jwt.sign({ id: instructor.id }, process.env.JWT);
    return done(null, { ...instructor, token });
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
