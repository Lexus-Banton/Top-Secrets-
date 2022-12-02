const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    // send the request body to the User Service to hash the password
    const user = await UserService.create(req.body);
    // respond with the new user
    res.json(user);
  } catch (e) {
    next(e);
  }
});
