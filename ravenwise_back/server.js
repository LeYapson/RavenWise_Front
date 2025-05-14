const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import des routes
const courseRoutes = require('./routes/courses');
const chapterRoutes = require('./routes/chapters');
const quizRoutes = require('./routes/quizzes');
// const forumRoutes = require('./routes/forum'); // Commentez cette ligne pour désactiver temporairement les routes forum
// const userRoutes = require('./routes/users'); // Commentez ces lignes
// const progressRoutes = require('./routes/progress'); // Commentez cette ligne

// Debugging routes
console.log("courseRoutes:", typeof courseRoutes);
console.log("chapterRoutes:", typeof chapterRoutes);
console.log("quizRoutes:", typeof quizRoutes);
console.log("userRoutes:", typeof userRoutes);

// Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Configurer CORS pour autoriser les requêtes du frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));

// Connecter à la base de données
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API RavenWise' });
});

// Routes API - Décommentez une par une pour identifier le problème
app.use('/api/courses', courseRoutes);
// app.use('/api/chapters', chapterRoutes);
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/users', userRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});