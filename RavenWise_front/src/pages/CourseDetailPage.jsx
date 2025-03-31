import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';

// Layout principal à trois colonnes
const CourseLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  height: calc(100vh - 60px); // Hauteur totale moins la hauteur du header
  background-color: var(--border);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: auto;
  }
`;

// Colonne de cours
const CourseColumn = styled.div`
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Colonne IDE
const IDEColumn = styled.div`
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
`;

// Colonne de sortie de compilation
const OutputColumn = styled.div`
  background-color: var(--bg-secondary);
  display: flex;
  flex-direction: column;
`;

// En-tête de section pour chaque colonne
const ColumnHeader = styled.div`
  padding: 1rem;
  background-color: rgba(0,0,0,0.2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Titre de la colonne
const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  display: inline; // Pour que le background gradient fonctionne correctement
`;

// Contenu du cours
const CourseContent = styled.div`
  flex: 1;
  padding: 1rem 0;
  line-height: 1.8;
`;

// Bloc de code dans le contenu du cours
const CodeBlock = styled.pre`
  background-color: var(--bg-primary);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--accent-primary);
  margin: 1.5rem 0;
  overflow-x: auto;
  font-family: 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
`;

// Éditeur de code
const CodeEditor = styled.textarea`
  flex: 1;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 1rem;
  border: none;
  resize: none;
  outline: none;
  
  &:focus {
    outline: none;
  }
`;

// Sortie de compilation
const CompilationOutput = styled.div`
  flex: 1;
  background-color: #1a1a1a;
  color: #d4d4d4;
  font-family: 'Monaco', monospace;
  font-size: 0.9rem;
  padding: 1rem;
  overflow-y: auto;
  white-space: pre-wrap;
`;

// Bouton pour exécuter le code
const RunButton = styled.button`
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

// Navigation entre les chapitres
const ChapterNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
`;

const NavButton = styled.button`
  background-color: var(--glassmorphism);
  color: var(--text-primary);
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Barre de progression du cours
const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: var(--border);
  border-radius: 3px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  width: ${props => props.progress}%;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

// Tabs pour les exercices
const ExerciseTabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
`;

const ExerciseTab = styled.button`
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
  color: ${props => props.active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  padding: 0.75rem 1.25rem;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--accent-primary)' : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
    color: ${props => props.active ? 'var(--accent-primary)' : 'var(--text-primary)'};
  }
`;

const CourseDetailPage = () => {
  const { courseId } = useParams(); // Récupère l'ID du cours depuis l'URL
  const [code, setCode] = useState('// Écrivez votre code ici\n\nfunction hello() {\n  console.log("Bonjour RavenWise!");\n}\n\nhello();');
  const [output, setOutput] = useState('');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);
  
  // Exemple de données de cours (à remplacer par un appel API)
  const course = {
    id: courseId,
    title: 'Introduction à JavaScript',
    progress: 35, // pourcentage de progression
    chapters: [
      {
        title: 'Les bases de JavaScript',
        content: `
# Les bases de JavaScript

JavaScript est un langage de programmation qui permet d'ajouter de l'interactivité aux pages web. C'est un langage interprété, ce qui signifie que le code est exécuté directement, sans avoir besoin d'être compilé.

## Variables et types de données

En JavaScript, vous pouvez déclarer des variables avec les mots-clés \`var\`, \`let\` ou \`const\`.

\`\`\`javascript
// Déclaration avec let (recommandé)
let nom = "Alice";
let age = 25;
let estDeveloppeur = true;

// Déclaration avec const pour les valeurs qui ne changeront pas
const PI = 3.14159;
\`\`\`

## Fonctions

Les fonctions sont des blocs de code réutilisables qui effectuent une tâche spécifique.

\`\`\`javascript
// Déclaration d'une fonction
function direBonjour(nom) {
  return "Bonjour, " + nom + "!";
}

// Appel de la fonction
console.log(direBonjour("Alice")); // Affiche: Bonjour, Alice!
\`\`\`
        `,
        exercises: [
          {
            title: 'Exercice 1',
            description: 'Créez une fonction qui calcule le carré d\'un nombre.',
            initialCode: '// Écrivez une fonction calculerCarre qui prend un nombre en paramètre\n// et retourne son carré\n\nfunction calculerCarre(nombre) {\n  // Votre code ici\n}\n\n// Test de votre fonction\nconsole.log(calculerCarre(5)); // Devrait afficher 25',
            solution: 'function calculerCarre(nombre) {\n  return nombre * nombre;\n}\n\nconsole.log(calculerCarre(5)); // Affiche 25'
          },
          {
            title: 'Exercice 2',
            description: 'Créez une fonction qui vérifie si un nombre est pair ou impair.',
            initialCode: '// Écrivez une fonction estPair qui prend un nombre en paramètre\n// et retourne true si le nombre est pair, false sinon\n\nfunction estPair(nombre) {\n  // Votre code ici\n}\n\n// Tests de votre fonction\nconsole.log(estPair(4)); // Devrait afficher true\nconsole.log(estPair(7)); // Devrait afficher false',
            solution: 'function estPair(nombre) {\n  return nombre % 2 === 0;\n}\n\nconsole.log(estPair(4)); // Affiche true\nconsole.log(estPair(7)); // Affiche false'
          }
        ]
      },
      {
        title: 'Structures de contrôle',
        content: `
# Structures de contrôle

Les structures de contrôle permettent de modifier le flux d'exécution du code en fonction de certaines conditions.

## Conditions: if, else if, else

\`\`\`javascript
let age = 18;

if (age < 18) {
  console.log("Vous êtes mineur.");
} else if (age === 18) {
  console.log("Vous venez d'atteindre la majorité!");
} else {
  console.log("Vous êtes majeur.");
}
\`\`\`

## Boucles: for, while, do...while

\`\`\`javascript
// Boucle for
for (let i = 0; i < 5; i++) {
  console.log("Itération " + i);
}

// Boucle while
let compteur = 0;
while (compteur < 5) {
  console.log("Compteur: " + compteur);
  compteur++;
}
\`\`\`
        `,
        exercises: [
          {
            title: 'Exercice 1',
            description: 'Créez une boucle qui affiche les nombres de 1 à 10.',
            initialCode: '// Utilisez une boucle pour afficher les nombres de 1 à 10\n\n// Votre code ici',
            solution: 'for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}'
          },
          {
            title: 'Exercice 2',
            description: 'Écrivez une fonction qui calcule la factorielle d\'un nombre.',
            initialCode: '// Écrivez une fonction factorielle qui prend un nombre en paramètre\n// et retourne sa factorielle\n\nfunction factorielle(nombre) {\n  // Votre code ici\n}\n\n// Test de votre fonction\nconsole.log(factorielle(5)); // Devrait afficher 120',
            solution: 'function factorielle(nombre) {\n  let resultat = 1;\n  for (let i = 2; i <= nombre; i++) {\n    resultat *= i;\n  }\n  return resultat;\n}\n\nconsole.log(factorielle(5)); // Affiche 120'
          }
        ]
      }
    ]
  };
  
  // Charger le code initial de l'exercice actif
  useEffect(() => {
    if (course.chapters[currentChapter] && 
        course.chapters[currentChapter].exercises[activeExercise]) {
      setCode(course.chapters[currentChapter].exercises[activeExercise].initialCode);
      setOutput('');
    }
  }, [currentChapter, activeExercise]);
  
  // Fonction pour "exécuter" le code JavaScript
  const runCode = () => {
    try {
      // Dans un environnement réel, vous devriez utiliser une sandbox sécurisée
      // pour exécuter le code JavaScript de l'utilisateur
      const originalConsoleLog = console.log;
      let outputText = '';
      
      // Rediriger console.log vers notre output
      console.log = (...args) => {
        outputText += args.join(' ') + '\n';
        originalConsoleLog(...args);
      };
      
      // Exécuter le code
      // eslint-disable-next-line no-new-func
      new Function(code)();
      
      // Restaurer console.log
      console.log = originalConsoleLog;
      
      // Mettre à jour l'output
      setOutput(outputText || 'Le code a été exécuté sans erreur, mais rien n\'a été affiché.');
    } catch (error) {
      setOutput(`Erreur: ${error.message}`);
    }
  };
  
  // Navigation entre les chapitres
  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setActiveExercise(0);
    }
  };
  
  const goToNextChapter = () => {
    if (currentChapter < course.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setActiveExercise(0);
    }
  };
  
  return (
    <>
      <Header />
      <CourseLayout>
        {/* Colonne de cours */}
        <CourseColumn>
          <ColumnHeader>
            <ColumnTitle>Cours: {course.title}</ColumnTitle>
          </ColumnHeader>
          <ProgressBar>
            <ProgressFill progress={course.progress} />
          </ProgressBar>
          <CourseContent>
            <h2>{course.chapters[currentChapter].title}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: course.chapters[currentChapter].content
                .replace(/# (.*)/g, '<h1>$1</h1>')
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/```javascript([\s\S]*?)```/g, '<pre class="code-block">$1</pre>')
            }} />
            <ChapterNavigation>
              <NavButton 
                onClick={goToPreviousChapter} 
                disabled={currentChapter === 0}
              >
                ← Chapitre précédent
              </NavButton>
              <NavButton 
                onClick={goToNextChapter}
                disabled={currentChapter === course.chapters.length - 1}
              >
                Chapitre suivant →
              </NavButton>
            </ChapterNavigation>
          </CourseContent>
        </CourseColumn>
        
        {/* Colonne IDE */}
        <IDEColumn>
          <ColumnHeader>
            <ColumnTitle>Exercices</ColumnTitle>
          </ColumnHeader>
          <ExerciseTabs>
            {course.chapters[currentChapter].exercises.map((exercise, index) => (
              <ExerciseTab 
                key={index}
                active={activeExercise === index}
                onClick={() => setActiveExercise(index)}
              >
                {exercise.title}
              </ExerciseTab>
            ))}
          </ExerciseTabs>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.1)' }}>
            <p>{course.chapters[currentChapter].exercises[activeExercise].description}</p>
          </div>
          <CodeEditor 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          />
          <div style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <RunButton onClick={runCode}>
              ▶ Exécuter le code
            </RunButton>
          </div>
        </IDEColumn>
        
        {/* Colonne de sortie */}
        <OutputColumn>
          <ColumnHeader>
            <ColumnTitle>Sortie</ColumnTitle>
          </ColumnHeader>
          <CompilationOutput>{output}</CompilationOutput>
        </OutputColumn>
      </CourseLayout>
    </>
  );
};

export default CourseDetailPage;