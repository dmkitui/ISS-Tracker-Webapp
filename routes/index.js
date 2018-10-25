const express = require('express');
const router = express.Router();
require('dotenv').config();

const key = process.env.GOOGLE_API_KEY;

/* GET home page. */
router.get('/home', function(req, res, next) {
	res.render('index', {title: 'ISS Tracker', google_api_key: key});
});

router.get('/about', function(req, res, next) {
	res.render('about');
});

module.exports = router;
