// app/(app)/quiz/[slug].tsx
import { allCoursesData } from '@/coursesData/courses';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebaseConfig';



export default function QuizScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();

  const { user } = useAuth();
  
  const course = allCoursesData.find((c) => c.slug === slug);
  const quiz = course?.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (!quiz) {
      Alert.alert("Erro", "Quiz não encontrado para este curso.");
      router.back();
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Carregando Quiz...</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (selectedOption) return; 
    setSelectedOption(option);

    if (option === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextQuestion = async() => {
    setSelectedOption(null);
    setFeedback(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);

      if (user && course && quiz) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const quizResult = {
            score: score,
            total: quiz.questions.length,
            courseTitle: course.title,
            attemptedAt: new Date().toISOString()
          };

          await setDoc(userDocRef, {
            quizScores: {
              [course.slug]: quizResult
            }
          }, {merge: true})
        } catch (error) {
          Alert.alert("Erro", "Não foi possível salvar sua pontuação.")
        }
      } else {
        Alert.alert("Erro", "Usuário ou curso não encontrado. Pontuação não será salva.")
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.quizTitle}>Quiz Finalizado!</Text>
        <Text style={styles.finalScore}>Sua pontuação: {score} de {quiz.questions.length}</Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Refazer Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backToCourseButton} onPress={() => router.replace({pathname: '/cursos/[slug]',params: {slug: course?.slug}})}>
          <Text style={styles.buttonText}> {"Voltar para a página do Minicurso"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backToMenuButton} onPress={() => router.replace('/(app)/menu')}>
          <Text style={styles.buttonText}>Sair do Minicurso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>{quiz.title}</Text>
      <Text style={styles.questionCounter}>
        Questão {currentQuestionIndex + 1} de {quiz.questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (feedback === 'correct' ? styles.optionCorrect : styles.optionIncorrect),
              selectedOption && option === currentQuestion.correctAnswer && styles.optionCorrect 
            ]}
            onPress={() => handleAnswer(option)}
            disabled={!!selectedOption} 
          >
            <Text style={styles.optionButtonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.buttonText}>
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
  },
  quizTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333C57',
    textAlign: 'center',
  },
  questionCounter: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333C57',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#E0E8F9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionButtonText: {
    color: '#36A3FF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionCorrect: {
    backgroundColor: '#D4EDDA', 
    borderColor: '#28A745',
    borderWidth: 2,
  },
  optionIncorrect: {
    backgroundColor: '#F8D7DA', 
    borderColor: '#DC3545',
    borderWidth: 2,
  },
  nextButton: {
    backgroundColor: '#36A3FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333C57',
  },
  restartButton: {
    backgroundColor: '#6C757D',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  backToCourseButton: {
    backgroundColor: '#36A3FF',
    
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  backToMenuButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
});