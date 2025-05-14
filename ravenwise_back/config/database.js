const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ravenwise';
    console.log('Tentative de connexion à MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
    });
    
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Erreur de connexion MongoDB: ${error.message}`);
    
    // Vérifier si c'est une erreur de connexion refusée
    if (error.code === 'ECONNREFUSED') {
      console.error('MongoDB n\'est pas démarré ou n\'est pas accessible.');
      console.error('Assurez-vous que MongoDB est installé et démarré.');
      console.error('Alternatives:');
      console.error('1. Démarrer le service MongoDB');
      console.error('2. Utiliser MongoDB Atlas (cloud) et mettre à jour votre variable MONGODB_URI');
    }
    
    // Ne pas quitter le processus, permettre à l'application de démarrer sans BD
    console.warn('Application démarrée sans connexion à la base de données');
    return false;
  }
};

module.exports = connectDB;