import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import '../firebaseConfig'; 
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();


  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0]

    const inAuthGroup = currentSegment === '(auth)';
    const onQuestionnaireScreen = currentSegment === 'questionnaire';

    if (user) {
      if (!user.hasAnsweredQuestionnaire && !onQuestionnaireScreen) {
        router.replace('/questionnaire');
      } else if (user.hasAnsweredQuestionnaire && inAuthGroup) {
        router.replace('/(app)/menu');
      } else if (user.hasAnsweredQuestionnaire && onQuestionnaireScreen){
        router.replace('/(app)/menu');
      }
    } else {

      if (!inAuthGroup) {
        router.replace('/(auth)');
      }
    }
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // o <Slot> vai renderizar ou (auth) ou (app))
  return <Slot />;
}

export default function RootLayout() {
  // Envolve todo o app no Provedor de Autenticação
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}