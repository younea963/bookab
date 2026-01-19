// production keys

export default {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY // for the cookie key, always use a long random string e.g. UUID
};

//put sensitive info here to ensure that they do not get committed to version control in GitHub