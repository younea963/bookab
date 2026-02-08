import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import authRoutes from './routes/authRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import wordRoutes from './routes/wordRoutes.js';
// import gameRoutes from './routes/gameRoutes.js';

import passport from 'passport';

import './services/passport.js';
import keys from './config/keys.js';



const app = express();

mongoose.connect(keys.mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.use(express.json()); // middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded data


// Cookie session configuration
app.use(
  session({
    secret: keys.cookieKey, // used to sign the session ID cookie
    resave: false, // don't save session if unmodified. You  only want session saved when changes are made
    saveUninitialized: false, // don't create session until something is stored i.e. visitors who are not logged in should not have a cookie/session
    store: MongoStore.create({ mongoUrl: keys.mongoURI }), // use MongoDB to store session data
    cookie: { 
      maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds,
      secure: false,  // set to true if using HTTPS,
      httpOnly: true,  // prevents client-side JS from accessing the cookie,
      sameSite: 'lax' // helps protect against CSRF attacks
  }
  // cookieSession({
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds // maxAge: how long cookie lasts before it expires; here it's 30 days
  //   keys: [keys.cookieKey], // array of keys to encrypt the cookie
  // })
  })
);

// Initialize Passport and use Passport session
app.use(passport.initialize());
app.use(passport.session());




authRoutes(app);
billingRoutes(app);
wordRoutes(app);
// gameRoutes(app);


// Middleware
// app.use(cors());

// Sample route

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});