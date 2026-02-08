
export default function requireCredits(req, res, next) {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You must have at least 1 credit to play.' }); // 401 is the HTTP code for unauthorized access; i.e. user is not logged in
  }

  next(); // next is called to move on to the next middleware or route handler
}   