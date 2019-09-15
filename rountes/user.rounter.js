const express = require('express');
const rounter = express.Router();
const userController = require('../controllers/user.controller');

rounter.get('/',userController.getIndex);
rounter.get('/search',userController.getSearch);
rounter.get('/detail/:userId',userController.getDetail);
rounter.get('/remove/:userId',userController.getRemove);
rounter.get('/create',userController.getCreate);

rounter.post('/create',userController.postCreateUser);
rounter.post('/update',userController.postUpdateUser);

module.exports = rounter;