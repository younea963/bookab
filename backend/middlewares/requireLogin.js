
export default function requireLogin(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' }); // 401 is the HTTP code for unauthorized access; i.e. user is not logged in
  }

  next(); // next is called to move on to the next middleware or route handler
}   