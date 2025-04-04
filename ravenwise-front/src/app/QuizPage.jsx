import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--glassmorphism);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid var(--border);
`;

const QuizHeader = styled.div`
  margin-bottom: 2rem;
`;

const QuizTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const QuizProgress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuestionCounter = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const DifficultyBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 1rem;
  background-color: ${props => 
    props.level === 'Facile' ? 'rgba(74, 222, 128, 0.2)' : 
    props.level === 'Moyen' ? 'rgba(250, 204, 21, 0.2)' : 
    'rgba(248, 113, 113, 0.2)'
  };
  color: ${props => 
    props.level === 'Facile' ? '#4ade80' : 
    props.level === 'Moyen' ? '#facc15' : 
    '#f87171'
  };
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
`;

const QuestionText = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionItem = styled.div`
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background-color: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.selected && !props.showAnswer && `
    border-color: var(--accent-primary);
    background-color: rgba(37, 99, 235, 0.1);
  `}
  
  ${props => props.showAnswer && props.correct && `
    border-color: #4ade80;
    background-color: rgba(74, 222, 128, 0.1);
  `}
  
  ${props => props.showAnswer && props.selected && !props.correct && `
    border-color: #f87171;
    background-color: rgba(248, 113, 113, 0.1);
  `}
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
`;

const OptionLetter = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.1);
`;

const OptionText = styled.div`
  flex: 1;
`;

const FeedbackContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${props => 
    props.correct ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'
  };
  border: 1px solid ${props => 
    props.correct ? '#4ade80' : '#f87171'
  };
`;

const FeedbackTitle = styled.h4`
  margin-bottom: 0.5rem;
  color: ${props => 
    props.correct ? '#4ade80' : '#f87171'
  };
`;

const FeedbackText = styled.p`
  margin-bottom: 0;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled(Button)`
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--glow);
  }
`;

const BackButton = styled(Button)`
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
  
  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
`;

const ResultTitle = styled.h2`
  margin-bottom: 1rem;
`;

const ResultScore = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 2rem 0;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ResultMessage = styled.p`
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const SkillsProgress = styled.div`
  margin: 2rem 0;
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-weight: 500;
`;

const SkillValue = styled.span`
  color: var(--text-secondary);
`;

const SkillBarContainer = styled.div`
  height: 8px;
  background-color: var(--border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const SkillBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  width: ${props => props.progress}%;
  position: absolute;
  transition: width 0.5s ease;
`;

const SkillBarImprovement = styled.div`
  height: 100%;
  background-color: rgba(74, 222, 128, 0.8);
  width: ${props => props.improvement}%;
  position: absolute;
  left: ${props => props.previousProgress}%;
  transition: width 0.5s ease 0.3s;
`;

const AdaptiveQuizPlayer = ({ quizId }) => {
  // États pour le quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('Moyen');
  
  // Exemple de données de quiz adaptatif
  const quiz = {
    id: quizId,
    title: "JavaScript Avancé - Quiz Adaptatif",
    description: "Ce quiz s'adapte à votre niveau de compétence pour vous offrir un défi optimal.",
    questions: [
      {
        id: 1,
        text: "Quelle méthode utilise-t-on pour convertir un objet JSON en objet JavaScript ?",
        options: [
          { id: 'a', text: "JSON.parse()" },
          { id: 'b', text: "JSON.stringify()" },
          { id: 'c', text: "JSON.toObject()" },
          { id: 'd', text: "JSON.fromString()" }
        ],
        correctOption: 'a',
        difficulty: 'Facile',
        explanation: "JSON.parse() analyse une chaîne JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.",
        skillArea: "Manipulation de données"
      },
      {
        id: 2,
        text: "Quelle est la différence entre let et var en JavaScript ?",
        options: [
          { id: 'a', text: "let a une portée de bloc, var a une portée de fonction" },
          { id: 'b', text: "let ne peut pas être redéclaré, var peut l'être" },
          { id: 'c', text: "let n'est pas hissé (hoisted), var l'est" },
          { id: 'd', text: "Toutes les réponses ci-dessus" }
        ],
        correctOption: 'd',
        difficulty: 'Moyen',
        explanation: "let a une portée de bloc alors que var a une portée de fonction. let ne peut pas être redéclaré dans le même bloc, et bien que techniquement let soit hissé, il n'est pas initialisé.",
        skillArea: "Syntaxe moderne"
      },
      {
        id: 3,
        text: "Quel est le résultat de l'expression : 3 + 2 + '7' ?",
        options: [
          { id: 'a', text: "'327'" },
          { id: 'b', text: "'57'" },
          { id: 'c', text: "12" },
          { id: 'd', text: "57" }
        ],
        correctOption: 'b',
        difficulty: 'Moyen',
        explanation: "JavaScript évalue les expressions de gauche à droite. 3 + 2 donne 5, puis 5 + '7' devient '57' car quand un nombre est ajouté à une chaîne, le nombre est converti en chaîne.",
        skillArea: "Coercition de types"
      },
      {
        id: 4,
        text: "Qu'est-ce qu'une closure en JavaScript ?",
        options: [
          { id: 'a', text: "Une fonction qui s'appelle elle-même" },
          { id: 'b', text: "Une fonction qui est stockée dans une variable" },
          { id: 'c', text: "Une fonction avec accès à son propre scope, au scope parent, et aux variables globales" },
          { id: 'd', text: "Une fonction qui n'a pas de paramètres" }
        ],
        correctOption: 'c',
        difficulty: 'Avancé',
        explanation: "Une closure est une fonction qui a accès à son propre scope, au scope des fonctions extérieures (parent), et au scope global même après que la fonction parente a terminé son exécution.",
        skillArea: "Concepts avancés"
      },
      {
        id: 5,
        text: "Quelle méthode d'array crée un nouvel array avec les résultats de l'appel d'une fonction fournie sur chaque élément ?",
        options: [
          { id: 'a', text: "forEach()" },
          { id: 'b', text: "filter()" },
          { id: 'c', text: "map()" },
          { id: 'd', text: "reduce()" }
        ],
        correctOption: 'c',
        difficulty: 'Moyen',
        explanation: "map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.",
        skillArea: "Méthodes d'Array"
      }
    ],
    skills: [
      { name: "Manipulation de données", initialValue: 35, improvement: 0 },
      { name: "Syntaxe moderne", initialValue: 42, improvement: 0 },
      { name: "Coercition de types", initialValue: 28, improvement: 0 },
      { name: "Concepts avancés", initialValue: 15, improvement: 0 },
      { name: "Méthodes d'Array", initialValue: 60, improvement: 0 }
    ]
  };
  
  // Simuler l'adaptation de la difficulté
  useEffect(() => {
    if (currentQuestion > 0) {
      // Logique simplifiée: si le score est bon, on augmente la difficulté
      if (score / currentQuestion > 0.7) {
        setDifficultyLevel('Avancé');
      } else if (score / currentQuestion > 0.4) {
        setDifficultyLevel('Moyen');
      } else {
        setDifficultyLevel('Facile');
      }
    }
  }, [score, currentQuestion]);
  
  // Gérer la sélection d'option
  const handleOptionSelect = (optionId) => {
    if (!showAnswer) {
      setSelectedOption(optionId);
    }
  };
  
  // Vérifier la réponse actuelle
  const checkAnswer = () => {
    setShowAnswer(true);
    
    const currentQ = quiz.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctOption;
    
    if (isCorrect) {
      setScore(score + 1);
      
      // Mise à jour des compétences
      const updatedSkills = [...quiz.skills];
      const skillIndex = updatedSkills.findIndex(skill => skill.name === currentQ.skillArea);
      
      if (skillIndex !== -1) {
        updatedSkills[skillIndex].improvement += 5;
      }
      
      quiz.skills = updatedSkills;
    }
  };
  
  // Passer à la question suivante
  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  // Obtenir la difficulté de la question actuelle
  const getCurrentQuestionDifficulty = () => {
    return quiz.questions[currentQuestion].difficulty;
  };
  
  // Calculer le pourcentage de progression dans le quiz
  const calculateProgress = () => {
    return ((currentQuestion + 1) / quiz.questions.length) * 100;
  };
  
  return (
    <QuizContainer>
      {!quizCompleted ? (
        <>
          <QuizHeader>
            <QuizTitle>{quiz.title}</QuizTitle>
            <div>
              <DifficultyBadge level={getCurrentQuestionDifficulty()}>
                {getCurrentQuestionDifficulty()}
              </DifficultyBadge>
              <DifficultyBadge level={difficultyLevel === 'Facile' ? 'Facile' : difficultyLevel === 'Moyen' ? 'Moyen' : 'Avancé'}>
                Niveau adaptatif: {difficultyLevel}
              </DifficultyBadge>
            </div>
            <QuizProgress>
              <ProgressBar>
                <ProgressFill progress={calculateProgress()} />
              </ProgressBar>
              <QuestionCounter>
                Question {currentQuestion + 1} / {quiz.questions.length}
              </QuestionCounter>
            </QuizProgress>
          </QuizHeader>
          
          <QuestionContainer>
            <QuestionText>{quiz.questions[currentQuestion].text}</QuestionText>
            <OptionsContainer>
              {quiz.questions[currentQuestion].options.map((option) => (
                <OptionItem 
                  key={option.id}
                  selected={selectedOption === option.id}
                  showAnswer={showAnswer}
                  correct={option.id === quiz.questions[currentQuestion].correctOption}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <OptionContent>
                    <OptionLetter>{option.id.toUpperCase()}</OptionLetter>
                    <OptionText>{option.text}</OptionText>
                  </OptionContent>
                </OptionItem>
              ))}
            </OptionsContainer>
          </QuestionContainer>
          
          {showAnswer && (
            <FeedbackContainer correct={selectedOption === quiz.questions[currentQuestion].correctOption}>
              <FeedbackTitle correct={selectedOption === quiz.questions[currentQuestion].correctOption}>
                {selectedOption === quiz.questions[currentQuestion].correctOption ? 'Correct!' : 'Incorrect!'}
              </FeedbackTitle>
              <FeedbackText>{quiz.questions[currentQuestion].explanation}</FeedbackText>
            </FeedbackContainer>
          )}
          
          <ActionContainer>
            <BackButton 
              disabled={currentQuestion === 0 || showAnswer}
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                  setSelectedOption(null);
                  setShowAnswer(false);
                }
              }}
            >
              Question précédente
            </BackButton>
            
            {!showAnswer ? (
              <NextButton 
                disabled={selectedOption === null}
                onClick={checkAnswer}
              >
                Vérifier
              </NextButton>
            ) : (
              <NextButton onClick={nextQuestion}>
                {currentQuestion < quiz.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
              </NextButton>
            )}
          </ActionContainer>
        </>
      ) : (
        <ResultsContainer>
          <ResultTitle>Quiz Terminé!</ResultTitle>
          <ResultScore>{score} / {quiz.questions.length}</ResultScore>
          <ResultMessage>
            {score === quiz.questions.length ? "Parfait! Vous avez tout bon!" : 
            score >= quiz.questions.length * 0.7 ? "Excellent travail!" : 
            score >= quiz.questions.length * 0.5 ? "Bon travail, mais il y a encore place à l'amélioration." : 
            "Continuez à pratiquer pour améliorer vos résultats."}
          </ResultMessage>
          
          <SkillsProgress>
            <h3>Progression des compétences</h3>
            {quiz.skills.map((skill, index) => (
              <SkillItem key={index}>
                <SkillHeader>
                  <SkillName>{skill.name}</SkillName>
                  <SkillValue>{skill.initialValue + skill.improvement}%</SkillValue>
                </SkillHeader>
                <SkillBarContainer>
                  <SkillBarFill progress={skill.initialValue + skill.improvement} />
                  {skill.improvement > 0 && (
                    <SkillBarImprovement 
                      improvement={skill.improvement} 
                      previousProgress={skill.initialValue}
                    />
                  )}
                </SkillBarContainer>
              </SkillItem>
            ))}
          </SkillsProgress>
          
          <ActionContainer>
            <BackButton onClick={() => window.location.href = '/quiz'}>
              Retour aux quiz
            </BackButton>
            <NextButton onClick={() => window.location.reload()}>
              Relancer le quiz
            </NextButton>
          </ActionContainer>
        </ResultsContainer>
      )}
    </QuizContainer>
  );
};

export default AdaptiveQuizPlayer;