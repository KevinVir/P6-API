const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/password-validator')
const max = require('../middleware/limiter');

// Routes de création et de connexion utilisateur
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', max, userCtrl.login);

// Exportation de route user
module.exports = router;
