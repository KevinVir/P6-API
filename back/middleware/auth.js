const jwt = require('jsonwebtoken');
 
// Export d'une fonction qui sera notre middleware
module.exports = (req, res, next) => {
   try {

    // Récupération du TOKEN dans le header authorization et le split pour tout récupérer après l'espace dans le header
       const token = req.headers.authorization.split(' ')[1];

       //Decodage du TOKEN avec la méthode verify et jwt en lui passant le TOKEN récupéré et la clé secrète
       const decodedToken = jwt.verify(token, process.env.JWT_KEY);

       // Extraction de l'id utilisateur de notre TOKEN et ajout à la request pour que les routes puissent l'exploiter
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};