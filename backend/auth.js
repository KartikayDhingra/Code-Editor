const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/user.model");

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    // done(null, user);
    User.findById(id, function(err, user) {
    done(err, user);
    });
});

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function(err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `https://codethrough.herokuapp.com/auth/google/secrets`,
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    // });
    User.findOne({googleId: profile.id}, (err,user) => {
        if(err){
            return cb(err);
        }
        if(!user){
            user = new User({
                email: profile.emails[0].value,
                username: profile.displayName,
                googleId: profile.id,
            });
            user.save(function(err) {
                if (err) console.log(err);
                return cb(err, user);
            });
        }
        else{
            return cb(err,user);
        }
    })
  }
));