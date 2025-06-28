# Gestion de la Complétion des Leçons

Ce docum   - `exercices` via `exercicesService.getExerciceById(id)`nt explique comment fonctionne le système de complétion des leçons dans l'application RavenWise.

## Vue d'ensemble

Le système de complétion des leçons est conçu pour fonctionner de manière progressive (fallback strategy) :

1. **Endpoint API spécialisé** : Tentative d'utilisation des endpoints `/complete` spécialisés par type
2. **Endpoint API générique** : Fallback vers l'endpoint générique `/lessons/{id}/complete`
3. **Stockage local** : Fallback final vers le localStorage du navigateur

## Endpoints API Supportés

### Endpoints Spécialisés (Priorité 1)
- `POST /exercices/{id}/complete` - Complétion d'exercices
- `POST /lectures/{id}/complete` - Complétion de lectures  
- `POST /quizzes/{id}/complete` - Complétion de quiz

### Endpoint Générique (Priorité 2)
- `POST /lessons/{id}/complete` - Complétion générique de leçons

### Stockage Local (Priorité 3)
- Utilisation du localStorage avec la clé `completedLessons`
- Format JSON : `{ lessonId: { completedAt, courseId, chapterId, lessonType, lessonTitle } }`

## Types de Leçons Supportés

1. **Lecture** (`lecture`, `reading`, `text`)
   - Affichage de contenu textuel
   - Validation par défilement complet du contenu
   - Bouton "Marquer comme lu"

2. **Exercice** (`exercice`, `exercise`, `practice`)
   - Éditeur de code intégré
   - Exécution de code en simulation
   - Soumission de la solution

3. **Quiz** (`quiz`, `test`)
   - Questions à choix multiples
   - Validation des réponses
   - Score minimum requis (70%)

## Récupération des Données de Leçon

Le système tente de récupérer les données de leçon dans cet ordre :

1. **Table `lessons`** via `lessonService.getLessonById(id)`
2. **Tables spécialisées** selon le type spécifié dans l'URL :
   - `exercices` via `exerciseService.getExcerciseById(id)`
   - `quizzes` via `quizzesService.getQuizById(id)`
   - `lectures` via `lecturesService.getLectureById(id)`

## Utilisation

### Dans une Page de Leçon

```jsx
import { isLessonCompleted, markLessonAsCompleted } from '../utils/lessonCompletion';

// Vérifier l'état de complétion
const completed = isLessonCompleted(lessonId);

// Marquer comme complété
markLessonAsCompleted(lessonId, {
  courseId,
  chapterId,
  lessonType: lesson.type,
  lessonTitle: lesson.title
});
```

### Paramètres d'URL

Les leçons peuvent être appelées avec un paramètre `type` pour spécifier le type :
```
/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}?type=exercice
```

## Gestion d'Erreurs

- Les erreurs 404 des endpoints `/complete` sont gérées gracieusement
- Les vraies erreurs réseau sont remontées à l'utilisateur
- Le fallback vers localStorage garantit que la fonctionnalité reste utilisable

## Avantages de cette Approche

1. **Compatibilité Progressive** : Fonctionne même si les endpoints ne sont pas encore implémentés
2. **Persistance Locale** : L'état de complétion persiste entre les sessions
3. **Facilité de Migration** : Passage transparent vers les endpoints API quand ils deviennent disponibles
4. **Pas de Modification Backend** : Solution entièrement côté front

## Limitations

- Le stockage local n'est pas synchronisé entre les appareils
- Les données de complétion peuvent être perdues si l'utilisateur vide son cache
- Pas de validation côté serveur de la progression

## Migration Future

Quand les endpoints API seront disponibles :
1. Les appels API fonctionneront automatiquement
2. Les données localStorage peuvent être migrées vers le serveur
3. Aucune modification du code front n'est nécessaire

## Nettoyage des Données

Le système inclut une fonction de nettoyage des données obsolètes :
```jsx
import { cleanupOldCompletions } from '../utils/lessonCompletion';

// Supprimer les complétions de plus de 30 jours
cleanupOldCompletions();
```
