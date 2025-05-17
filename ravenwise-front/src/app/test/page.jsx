"use client";  // Cette directive est OBLIGATOIRE pour utiliser des hooks dans Next.js 13+

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestApi() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'web-dev',
    difficulty: 'beginner'
  });

  // Fonction pour charger les cours
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/courses');
      console.log('Réponse API:', response.data);
      setCourses(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des cours:', err);
      setError('Impossible de charger les cours. Vérifiez que le serveur est démarré.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les cours au chargement de la page
  useEffect(() => {
    fetchCourses();
  }, []);

  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };

  // Soumettre le formulaire pour créer un cours
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses', newCourse);
      alert('Cours créé avec succès!');
      setNewCourse({
        title: '',
        description: '',
        category: 'web-dev',
        difficulty: 'beginner'
      });
      // Recharger la liste des cours
      fetchCourses();
    } catch (err) {
      console.error('Erreur lors de la création du cours:', err);
      alert(`Erreur: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Test d'intégration API RavenWise</h1>
      
      {/* Afficher le statut de connexion */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold">Statut de connexion</h2>
        {loading ? (
          <p className="text-amber-500">Chargement en cours...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-500">Connecté avec succès au backend!</p>
        )}
      </div>
      
      {/* Formulaire pour créer un cours */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Créer un nouveau cours</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Titre</label>
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Catégorie</label>
              <select
                name="category"
                value={newCourse.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="web-dev">Web Development</option>
                <option value="mobile-dev">Mobile Development</option>
                <option value="data-science">Data Science</option>
                <option value="devops">DevOps</option>
                <option value="design">Design</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Difficulté</label>
              <select
                name="difficulty"
                value={newCourse.difficulty}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Créer le cours
          </button>
        </form>
      </div>
      
      {/* Liste des cours */}
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Cours disponibles</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : courses.length === 0 ? (
          <p>Aucun cours disponible. Créez votre premier cours!</p>
        ) : (
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course._id} className="p-3 border rounded hover:bg-gray-50">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="flex mt-1 text-xs">
                  <span className="mr-2 px-2 py-1 bg-blue-100 rounded">
                    {course.category}
                  </span>
                  <span className="px-2 py-1 bg-green-100 rounded">
                    {course.difficulty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}