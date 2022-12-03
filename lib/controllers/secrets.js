const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Secret } = require('../models/Secret.js');

module.exports = Router().get('/', [authenticate], async (req, res, next) => {
  try {
    // get the list of secrets from the database
    // replace with Secret.getAll() (make the model and function)
    const secrets = await Secret.getAll();

    // return the list of secrets
    res.json(secrets);
  } catch (e) {
    next(e);
  }
});
