const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// Création d'un utilisateur

exports.signup = (req, res, next) => {

    // On utilise bcrypt pour hacher le mot de passe et le "saler" 10 fois pour plus de sécurité
    bcrypt.hash(req.body.password, 10)

        // Création de l'utilisateur
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });

            // On sauvegarde dans la base de donnée les informations reçus
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion pour un utilisateur déjà inscrit
exports.login = (req, res, next) => {

    // Utilisation de findOne pour l'email et la valeur transmise par l'utilisateur
    User.findOne({ email: req.body.email })
        .then(user => {

            // Vérification sur le user est null
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // Si l'utilisateur est enregistré on compare le mot de passe de la base de donnée avec celui utilisé via bcrypt
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    // Si le mot de passe ne correspond pas alors on envoie une erreur avec un message
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    // Si le mot de passe correspond on envoie un code 200 avec un objet qui contient l'id utilisateur avec un TOKEN
                    res.status(200).json({
                        userId: user._id,

                        /* On utilise la fonction sign de jwt pour chiffrer un TOKEN contenant un objet avec l'id utilisateur et la clef secrète de l'encodage avec expiration
                        du TOKEN sous 24h*/
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};