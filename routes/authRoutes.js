import passport from "passport";


export default function authRoutes(app) {

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.send('Successfully authenticated with Google!');
  }
)

app.get('/api/logout', (req, res) => {
  req.logout(() => { // req.logout takes the cookie that contains the user ID and removes the user ID; this is because the user is logged out
    res.send(req.user); // to confirm to the user that they have been logged out
  });   
});


app.get('/api/current_user', (req, res) => { // to test whether user is logged in
  // req is the INCOMING request object
  // res is the OUTGOING response object we use to send back data to the client
  res.send(req.user);  
});

};
