import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View, StyleSheet, Animated } from "react-native";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const questions = [
    {
        question: "Qual sua principal meta profissional para os próximos 5 anos?",
        options: ["Liderança e Gestão", "Especialização Técnica (IA, Dados)", "Mudança de Carreira", "Desenvolvimento Pessoal"]
    },
    {
        question: "Qual área de tecnologia te atrai mais?",
        options: ["Inteligência Artificial", "Sustentabilidade/ESG", "Cibersegurança", "Nenhuma específica"]
    },
    {
        question: "Como você prefere aprender?",
        options: ["Vídeos curtos", "Textos e artigos", "Projetos práticos", "Interação com IA/Chatbot"]
    }
];

export default function QuestionnaireScreen() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, markQuestionnaireAsAnswered } = useAuth();
    const router = useRouter();
    
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(50))[0];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start();
    }, [currentQuestionIndex]);

    const handleAnswer = (answer: string) => {
        if (isSubmitting) return;
        setSelectedOption(answer);
    };

    const handleNext = async () => {
        if (!selectedOption) {
            Alert.alert("Atenção", "Por favor, selecione uma opção antes de continuar.");
            return;
        }

        const newAnswers = [...answers, selectedOption];
        setAnswers(newAnswers);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -50,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                fadeAnim.setValue(0);
                slideAnim.setValue(50);
            } else {
                finishQuestionnaire(newAnswers);
            }
        });
    };

    const finishQuestionnaire = async (finalAnswers: string[]) => {
        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado. Por favor, faça login novamente.");
            router.replace('/(auth)');
            return;
        }

        setIsSubmitting(true);

        try {
            const formattedAnswers = finalAnswers.reduce((acc: { [key: string]: { question: string; answer: string; }}, answer, index) => {
                const questionKey = `question_${index + 1}`;
                const questionText = questions[index].question;
                acc[questionKey] = {
                    question: questionText,
                    answer: answer
                };
                return acc;
            }, {});

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                hasAnsweredQuestionnaire: true,
                questionnaireAnswers: formattedAnswers,
                answeredAt: new Date().toISOString(),
            }, { merge: true });

            await markQuestionnaireAsAnswered();
            
            Alert.alert(
                "Sucesso! 🎉", 
                "Suas respostas foram salvas! Vamos personalizar sua experiência de aprendizado.",
                [
                    {
                        text: "Começar",
                        onPress: () => router.replace('/(app)/menu')
                    }
                ]
            );
        } catch (error) {
            console.error("Erro ao salvar respostas do questionário:", error);
            Alert.alert("Erro", "Não foi possível salvar suas respostas. Tente novamente.");
            setIsSubmitting(false);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (!currentQuestion) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando questionário...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Personalizar Experiência</Text>
                <Text style={styles.headerSubtitle}>
                    Questão {currentQuestionIndex + 1} de {questions.length}
                </Text>
                
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
            </View>

            <Animated.View 
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                <View style={styles.optionsContainer}>
                    {currentQuestion.options?.map((option, index) => {
                        const isSelected = selectedOption === option;
                        return (
                            <TouchableOpacity
                                key={`${currentQuestionIndex}-${index}`}
                                style={[
                                    styles.optionButton,
                                    isSelected && styles.optionButtonSelected
                                ]}
                                onPress={() => handleAnswer(option)}
                                disabled={isSubmitting}
                            >
                                <View style={[
                                    styles.radioCircle,
                                    isSelected && styles.radioCircleSelected
                                ]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                                <Text style={[
                                    styles.optionText,
                                    isSelected && styles.optionTextSelected
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Animated.View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        (!selectedOption || isSubmitting) && styles.nextButtonDisabled
                    ]}
                    onPress={handleNext}
                    disabled={!selectedOption || isSubmitting}
                >
                    <Text style={styles.nextButtonText}>
                        {isSubmitting 
                            ? "Salvando..." 
                            : currentQuestionIndex < questions.length - 1 
                                ? "Próxima" 
                                : "Finalizar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FF',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333C57',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#36A3FF',
        borderRadius: 3,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333C57',
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 32,
    },
    optionsContainer: {
        width: '100%',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    optionButtonSelected: {
        backgroundColor: '#E3F2FD',
        borderColor: '#36A3FF',
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleSelected:{
        borderColor: '#36A3FF', 
        backgroundColor: '#36A3FF', 
    },
    radioInner:{
        width: 10, 
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF', 
    },
    optionText:{
        fontSize: 16,
        color: '#333C57', 
        flex: 1, 
    },
    optionTextSelected:{
        color: '#333C57', 
        fontWeight: '600', 
    },
    footer:{
        padding: 20,
        paddingBottom: 30, 
        backgroundColor: '#FFFFFF', 
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', 
    },
    nextButton:{
        backgroundColor: '#36A3FF', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nextButtonDisabled:{
        backgroundColor: '#B0C4DE', 
        elevation: 0,
        shadowOpacity: 0,
    },
    nextButtonText:{
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});