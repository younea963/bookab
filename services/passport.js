import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import keys from '../config/keys.js';



const User = mongoose.model('users'); // retrieve the 'users' model we just created in user.js (since there's only ONE argument, we're RETRIEVING it)
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the MONGOOSE GENERATED ID (not the googleId). Dont use google in case we switch to another auth provider e.g. Facebook in the future
  // null is for errors (none here), user.id is the 2nd argument
  // this ID gets saved in the cookie
  // turned user object into an ID (to store in cookie)
});

passport.deserializeUser((id, done) => { //doing the opposite of serializeUser: turn ID BACK into a user
  User.findById(id).then((user) => { // search the database for the user with this ID
    // whenever we access database, it's ALWAYS ASYNC so we use .then
    done(null, user); // null for errors (none here), user is the 2nd argument
  });
});

// Passport configuration
passport.use(new GoogleStrategy.Strategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => { // anytime we reach out to the database, it RETURNS an ASYNC PROMISE so we use .then. We will CALL the model instance "existingUser". If there's no existing user, then the "existingUser" will be NULL. To figure out whether it exists, need an IF stmt
      if (existingUser) {
        // User already exists
         done(null, existingUser);
      } else {
           // Create a new user
          new User({ googleId: profile.id }).save() // Mongoose's instance (of a NEW record/user) needs to be SAVED to the database
          .then((user) => done(null, user)); // required to let us know that User has been successfully created i.e. we're done (the 1st argument is for errors - so it's Null, the 2nd is for the user record that was just created)
      }
   // Call "done" w user that was found OR created, and NOW should resume the AUTHENTICATION PROCESS (it's the 4th argument)
    console.log('Access token:', accessToken);
    console.log('Refresh token:', refreshToken);
    console.log('Profile:', profile);
  });
 }
));

// access token lets you access user's data from google
// refresh token lets you get a new access token when the old one expires (access token expires after a certain time)