const mongoose = require('mongoose');

// Utilisation de unique validator qui empêchera 2 utilisateurs d'avoir le même email
const uniqueValidator = require('mongoose-unique-validator');

// Schéma utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Vérification que l'utilisateur est unique
userSchema.plugin(uniqueValidator);

// Exportation du schéma utilisateur
module.exports = mongoose.model('user', userSchema);