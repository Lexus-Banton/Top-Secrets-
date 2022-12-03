const { Router } = require('express');
const UserService = require('../services/UserService');
const user = require('../models/User.js');
const authenticate = require('../middleware/authenticate.js');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      // send the request body to the User Service to hash the password
      const user = await UserService.create(req.body);
      // respond with the new user
      res.json(user);
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      // send the request body to the User Service to check the password => return our JWT
      const token = await UserService.signIn(req.body);
      // set a cookie on the response object with the JWT as the value (cookies are just a small key / value store)
      // res.cookie(NAME OF THE COOKIE, VALUE OF THE COOKIE, OPTIONS)
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
      // send a 200 response
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (res, req, next) => {
    try {
      const users = await user.User.getAll();
      res.send(users);
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', (req, res) => {
    res
      .send(user)
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
