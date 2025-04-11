const express= require('express');
const { getSubmissions } = require('../controller/dashboardController');
const router= express.Router();

router.get('/submissions',getSubmissions)

module.exports= router;