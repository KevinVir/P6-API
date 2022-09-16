const express = require('express');
const mongoose = require('mongoose');

// Import de helmet qui aide à sécuriser les applications Express en définissant divers en-têtes HTTP.
// const helmet = require('helmet');

// Import pour accéder au path du serveur
const path = require('path');

// Import de dotenv pour la connexion à la base de donnée
const dotenv = require('dotenv').config();

// Importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la base de donnée mongoDB via dotenv
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de app qui contient l'application express
const app = express();

app.use(express.json());

/* Ajout des headers pour ne pas être bloqué par CORS qui bloque par défaut les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes 
d'accéder à des ressources sensibles. */
app.use((req, res, next) => {

    // Accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With, etc..)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées (GET, POST, etc..)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(helmet());

// routes
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;