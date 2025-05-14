const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// Import des routes
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
const forumRoutes = require('./routes/forum');

// Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connecter à la base de données
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API RavenWise' });
});

// Utilisation des routes
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/forum', forumRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Une erreur est survenue'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});