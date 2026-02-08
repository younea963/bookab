import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import keys from '../config/keys.js'; 
import pg from 'pg';
const { Pool } = pg;

const pgPool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgPool.connect();

// this is STEP 2 (AFTER user has been redirected back to our application from Google and has logged in successfully)
passport.serializeUser((user, done) => { // PURPOSE of serializing: to turn the user record (that was found in the database) into an ID (to store in cookie) 
  // this is BECAUSE HTTP is stateless.That means:

//  1) User logs in

// 2)  Browser sends next request

// 3) Server forgets everything unless you save it somewhere

// SOLUTION - get Passport to FIX this. Passport’s job:

// 1) “How do I remember that this browser is logged in?”

//  2) Answer: Store a tiny piece of data in a session cookie
  done(null, user.id); // user.id is the PgAdmin GENERATED ID (not the googleId). Dont use google in case we switch to another auth provider e.g. Facebook in the future
  // null is for errors (none here), user.id is the 2nd argument
  // this ID gets saved in the cookie
  // turned user object into an ID (to store in cookie)
});


// STEP 3 - whenever a request comes in with a cookie (i.e. EVERY request AFTER login), we need to deserialize the ID back into a user
// before that, cookie only has the user ID. So, to get the user details, we need to query the database with that ID
passport.deserializeUser((id, done) => { //doing the opposite of serializeUser: turn ID BACK into a user by looking up the id in the database
   pgPool.query(
    'SELECT * FROM users WHERE id = $1', //  find user by ID in database. Whenever we access database, it's ALWAYS ASYNC so we use .then
    [id]
  ).then((result) => {
    const user = result.rows[0]; // get the user from the query result
    done(null, user); // null for errors (none here), user is the 2nd argument. User can now be accessed in req.user in route handlers
  });
});

// Passport configuration - this is STEP 1 (after user clicks "Log in with Google" button)
passport.use(new GoogleStrategy.Strategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true // to handle heroku proxy issues
  },

  async (accessToken, refreshToken, profile, done) => {

    const existingUser = await pgPool.query(
      'SELECT * FROM users WHERE google_id = $1',
      [profile.id]
    );  
    if (existingUser.rows.length > 0) {
      // User already exists
      return done(null, existingUser.rows[0]); // first argument (null) is for errors, second argument is the user found
    } // don't need Else bc of RETURN statement above
    // Create a new user

    const result = await pgPool.query(
      'INSERT INTO users (first_name, date_added, google_id, credits) VALUES ($1, $2, $3, $4) RETURNING *',
      [profile.name.givenName, new Date(), profile.id, 50]
    );
    done(null, result.rows[0]); // pass the newly created user to done (all the column values of the record get passed). This gets sent to serializeUser
   
    // Call "done" w user that was found OR created, and NOW should resume the AUTHENTICATION PROCESS (it's the 4th argument)
    console.log('Access token:', accessToken);
    console.log('Refresh token:', refreshToken);
    console.log('Profile:', profile);
  }
));
// access token lets you access user's data from google
// refresh token lets you get a new access token when the old one expires (access token expires after a certain time)



  // promise-based version
//   (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }).then((existingUser) => { // anytime we reach out to the database, it RETURNS an ASYNC PROMISE so we use .then. We will CALL the model instance "existingUser". If there's no existing user, then the "existingUser" will be NULL. To figure out whether it exists, need an IF stmt
//       if (existingUser) {
//         // User already exists
//          done(null, existingUser);
//       } else {
//            // Create a new user
//           new User({ googleId: profile.id }).save() // Mongoose's instance (of a NEW record/user) needs to be SAVED to the database
//           .then((user) => done(null, user)); // required to let us know that User has been successfully created i.e. we're done (the 1st argument is for errors - so it's Null, the 2nd is for the user record that was just created)
//       }
//    // Call "done" w user that was found OR created, and NOW should resume the AUTHENTICATION PROCESS (it's the 4th argument)
//     console.log('Access token:', accessToken);
//     console.log('Refresh token:', refreshToken);
//     console.log('Profile:', profile);
//   });
//  }
// ));




