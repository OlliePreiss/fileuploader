const { use } = require("passport");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const client = require('../prisma/prismaClient')

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
    try {
      console.log('Passport Local Strategy attempted...')
      const user = await client.findUser(username)
      console.log(user)

      if (!user) {
        console.log('No user found')
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        console.log('Passwords dont match')
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      console.log('An error occured - ' + err)
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await client.findUserById(id)

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport
