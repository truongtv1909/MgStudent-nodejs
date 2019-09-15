const express = require('express');
const rounter = express.Router();
const userController = require('../controllers/user.controller');

rounter.get('/',userController.getIndex);
rounter.get('/search',userController.getSearch);


module.exports = rounter;