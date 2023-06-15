var express = require('express');
var router = express.Router();
const app = require('../app');
const authentication = require('../controllers/authentication');

router.post('/signup', authentication.register);

router.post('/login', authentication.login);

module.exports = router;