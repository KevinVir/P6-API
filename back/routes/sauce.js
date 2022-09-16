const express = require('express');
const router = express.Router();

// Import de multer et du middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Import de notre controller contenant le CRUD
const sauceCtrl = require('../controllers/sauce');

// Création des routes pour les sauces
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

// Exportation du router sauce
module.exports = router;