import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import './models/user.js';
import './services/passport.js';
// import keys from './config/keys.js';

import authRoutes from './routes/authRoutes.js';

mongoose.connect(keys.mongoURI);


const app = express();
// import cors from 'cors';

// Cookie session configuration
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds // maxAge: how long cookie lasts before it expires; here it's 30 days
    keys: [keys.cookieKey], // array of keys to encrypt the cookie
  })
);

// Initialize Passport and use Passport session
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3000;

authRoutes(app);


// Middleware
// app.use(cors());

// Sample route

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});