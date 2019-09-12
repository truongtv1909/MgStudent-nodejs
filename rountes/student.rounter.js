const express = require('express');
const rounter = express.Router();
const studentController = require('../controllers/student.controller');




rounter.get('/',studentController.getStudent);

module.exports = rounter;