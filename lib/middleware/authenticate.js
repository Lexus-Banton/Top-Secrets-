const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // get the jwt from the cookie on the request
    const cookieJWT = req.cookies[process.env.COOKIE_NAME];
    if (!cookieJWT) throw new Error('You must be signed in to continue');
    // validate the jwt
    // Verify the JWT token stored in the cookie, then attach to each request
    const user = jwt.verify(cookieJWT, process.env.JWT_SECRET);
    req.user = user;
    // otherwise attach the user to the request and continue
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
