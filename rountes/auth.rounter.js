const express = require('express');
const rounter = express.Router();

const authController = require('../controllers/auth.controller');

rounter.get('/',authController.getLogin);
rounter.post('/',authController.postLogin);

module.exports = rounter;

