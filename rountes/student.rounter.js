const express = require('express');
const rounter = express.Router();
const studentController = require('../controllers/student.controller');

rounter.get('/',studentController.getStudent);
rounter.get('/search',studentController.getSearch);
rounter.get('/createStudent',studentController.getCreateStudent);
rounter.get('/:id',studentController.getDetail);
rounter.get('/remove/:id',studentController.getRemove);

rounter.post('/createStudent',studentController.postCreateStudent);
rounter.post('/update',studentController.postUpdate);

module.exports = rounter;