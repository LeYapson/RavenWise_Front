const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');

// Données de test
const courseData = [
  {
    title: "Introduction à JavaScript",
    description: "Apprenez les bases de JavaScript, langage essentiel du web moderne.",
    category: "web-dev",
    difficulty: "beginner",
    instructorId: "user_2WhdXBxntzIRYxwyzx6CQyzWd2Y",
    instructorName: "Jean Dupont",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    duration: 180,
    published: true,
    tags: ["javascript", "frontend", "web"]
  },
  {
    title: "React pour débutants",
    description: "Découvrez la bibliothèque React pour créer des interfaces utilisateur dynamiques.",
    category: "web-dev",
    difficulty: "intermediate",
    instructorId: "user_2WhdXBxntzIRYxwyzx6CQyzWd2Y",
    instructorName: "Jean Dupont",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    duration: 240,
    published: true,
    tags: ["react", "frontend", "javascript"]
  }
];

// Fonction pour peupler la base de données
const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB pour le seeding');

    // Nettoyage des collections existantes
    await Course.deleteMany({});
    await Chapter.deleteMany({});
    console.log('Collections nettoyées');

    // Insertion des cours
    const courses = await Course.insertMany(courseData);
    console.log(`${courses.length} cours insérés`);

    // Créer des chapitres pour chaque cours
    const chaptersData = [];
    
    courses.forEach(course => {
      for (let i = 1; i <= 3; i++) {
        chaptersData.push({
          title: `Chapitre ${i} - ${course.title}`,
          description: `Description du chapitre ${i}`,
          course: course._id,
          order: i,
          duration: 30,
          content: [
            {
              type: "text",
              title: "Introduction",
              text: "Contenu du chapitre..."
            }
          ],
          xpValue: 10
        });
      }
    });

    const chapters = await Chapter.insertMany(chaptersData);
    console.log(`${chapters.length} chapitres insérés`);

    console.log('Seeding terminé avec succès!');
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
};

// Exécuter le seeding
seedDatabase();