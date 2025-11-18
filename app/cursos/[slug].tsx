import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { allCoursesData } from '@/coursesData/courses';



export default function CourseDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams(); 

  const course = allCoursesData.find((c) => c.slug === slug);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Minicurso não encontrado.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(app)/minicurso')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startQuiz = () => {
    router.push({
      pathname: '../quiz/[slug]',
      params: { slug: course.slug }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(app)/minicurso')}>
        <Text style={styles.buttonText}>{"< Voltar"}</Text>
      </TouchableOpacity>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseDescription}>{course.description}</Text>
      <Text style={styles.courseContent}>{course.content}</Text>
      <TouchableOpacity style={styles.quizButton} onPress={startQuiz}>
        <Text style={styles.buttonText}>Iniciar Desafio!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 50, 
  },
  backButton: {
    backgroundColor: '#36A3FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333C57',
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  courseContent: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
    marginBottom: 30,
  },
  quizButton: {
    backgroundColor: '#00C853', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});