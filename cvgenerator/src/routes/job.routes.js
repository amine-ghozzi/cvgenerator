const express = require('express');
const router = express.Router();
const JobController = require('../controllers/job.controller');

router.post('/extract', JobController.extractJob);

module.exports = router; 