const express = require('express');
const rounter = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'public/upload'});
const userController = require('../controllers/user.controller');
const validateUser = require('../validate/user.validate');

rounter.get('/',userController.getIndex);
rounter.get('/search',userController.getSearch);
rounter.get('/detail/:userId',userController.getDetail);
rounter.get('/remove/:userId',userController.getRemove);
rounter.get('/create',userController.getCreate);

rounter.post('/create',upload.single('logo'),validateUser.validateCreateUser,userController.postCreateUser);
rounter.post('/update',upload.single('logo'),validateUser.validateUpdateUser,userController.postUpdateUser);

module.exports = rounter;