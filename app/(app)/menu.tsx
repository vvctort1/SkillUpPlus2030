import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getPersonalizedRecommendations } from "@/services/geminiService";

interface QuizScore {
    score: number;
    total: number;
    courseTitle: string;
    attemptedAt: string;
}

interface UserQuizScores {
    [slug: string]: QuizScore;
}

interface CourseRecommendation {
    slug: string;
    title: string;
    description: string;
    icon: string;
    reason: string;
}

export default function MenuScreen() {
    const { user, isLoading } = useAuth();
    const [userQuizScores, setUserQuizScores] = useState<UserQuizScores | null>(null);
    const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [loadingRecommendations, setLoadingRecommendations] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user && !isLoading) {
            fetchUserData();
        } else if (!user && !isLoading) {
            setDataLoading(false);
            setLoadingRecommendations(false);
            setUserQuizScores({});
        }
    }, [user, isLoading]);

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(db, 'users', user!.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setUserQuizScores(userData.quizScores as UserQuizScores || {});

                if (userData.questionnaireAnswers) {
                    await fetchRecommendations(userData.questionnaireAnswers);
                } else {
                    setLoadingRecommendations(false);
                }
            } else {
                setUserQuizScores({});
                setLoadingRecommendations(false);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            Alert.alert("Erro", "Não foi possível carregar suas informações.");
            setUserQuizScores({});
            setLoadingRecommendations(false);
        } finally {
            setDataLoading(false);
        }
    };

    const fetchRecommendations = async (questionnaireAnswers: any) => {
        try {
            setLoadingRecommendations(true);
            const recs = await getPersonalizedRecommendations(questionnaireAnswers);
            setRecommendations(recs);
        } catch (error) {
            console.error("Erro ao buscar recomendações:", error);
        } finally {
            setLoadingRecommendations(false);
        }
    };

    if (isLoading || dataLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#36A3FF" />
                <Text style={styles.loadingText}>Carregando seu progresso...</Text>
            </View>
        );
    }

    const hasScores = userQuizScores && Object.keys(userQuizScores).length > 0;
    
    const totalCourses = hasScores ? Object.keys(userQuizScores).length : 0;
    const completedCourses = hasScores 
        ? Object.values(userQuizScores).filter(quiz => quiz.score === quiz.total).length 
        : 0;
    const totalScore = hasScores 
        ? Object.values(userQuizScores).reduce((acc, quiz) => acc + quiz.score, 0) 
        : 0;
    const totalQuestions = hasScores 
        ? Object.values(userQuizScores).reduce((acc, quiz) => acc + quiz.total, 0) 
        : 0;
    const averageScore = totalQuestions > 0 
        ? Math.round((totalScore / totalQuestions) * 100) 
        : 0;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.welcomeText}>Olá, {user?.displayName || 'Usuário'}! 👋</Text>
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{totalCourses}</Text>
                    <Text style={styles.statLabel}>Cursos Iniciados</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{completedCourses}</Text>
                    <Text style={styles.statLabel}>Concluídos</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{averageScore}%</Text>
                    <Text style={styles.statLabel}>Aproveitamento</Text>
                </View>
            </View>

            {recommendations.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.recommendationHeader}>
                        <Text style={styles.sectionTitle}>Recomendado para Você</Text>
                        <Text style={styles.recommendationSubtitle}>
                            Baseado nas suas preferências
                        </Text>
                    </View>
                    
                    {loadingRecommendations ? (
                        <View style={styles.recommendationLoading}>
                            <ActivityIndicator size="small" color="#36A3FF" />
                            <Text style={styles.recommendationLoadingText}>
                                Gerando recomendações personalizadas...
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.recommendationsContainer}>
                            {recommendations.map((rec) => (
                                <TouchableOpacity
                                    key={rec.slug}
                                    style={styles.recommendationCard}
                                    onPress={() => router.push({
                                        pathname: '/cursos/[slug]',
                                        params: { slug: rec.slug }
                                    })}
                                >
                                    <View style={styles.recommendationIconContainer}>
                                        <Text style={styles.recommendationIcon}>{rec.icon}</Text>
                                    </View>
                                    <View style={styles.recommendationContent}>
                                        <Text style={styles.recommendationTitle}>{rec.title}</Text>
                                        <Text style={styles.recommendationReason}>
                                            {rec.reason}
                                        </Text>
                                        <Text style={styles.recommendationCTA}>
                                            Começar agora →
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Seu Progresso</Text>
                {hasScores ? (
                    Object.entries(userQuizScores).map(([slug, quizResult]) => {
                        const isPerfect = quizResult.score === quizResult.total;
                        const percentage = Math.round((quizResult.score / quizResult.total) * 100);
                        
                        return (
                            <TouchableOpacity 
                                key={slug} 
                                style={[
                                    styles.scoreCard, 
                                    isPerfect 
                                        ? styles.scoreCardPerfect 
                                        : styles.scoreCardPartial
                                ]}
                                onPress={() => router.push({
                                    pathname: '/cursos/[slug]',
                                    params: { slug }
                                })}
                            >
                                <View style={styles.scoreHeader}>
                                    <Text style={styles.courseTitle}>{quizResult.courseTitle}</Text>
                                    {isPerfect && <Text style={styles.perfectBadge}>✨ Perfeito!</Text>}
                                </View>
                                
                                <View style={styles.scoreDetails}>
                                    <Text style={styles.scoreText}>
                                        Pontuação: {quizResult.score} / {quizResult.total}
                                    </Text>
                                    <Text style={styles.percentageText}>{percentage}%</Text>
                                </View>
                                
                                <View style={styles.progressBarContainer}>
                                    <View 
                                        style={[
                                            styles.progressBar, 
                                            { 
                                                width: `${percentage}%`,
                                                backgroundColor: isPerfect ? '#00C853' : '#36A3FF'
                                            }
                                        ]} 
                                    />
                                </View>
                                
                                <Text style={styles.attemptDate}>
                                    Última tentativa: {new Date(quizResult.attemptedAt).toLocaleDateString('pt-BR')} às {new Date(quizResult.attemptedAt).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo'})}
                                </Text>
                                
                                <Text style={styles.viewCourseLink}>Toque para revisar →</Text>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <View style={styles.noScoresContainer}>
                        <Text style={styles.noScoresIcon}>📚</Text>
                        <Text style={styles.noScoresText}>Você ainda não fez nenhum minicurso!</Text>
                        <Text style={styles.noScoresSubtext}>
                            Comece sua jornada de aprendizado agora mesmo.
                        </Text>
                        <TouchableOpacity 
                            style={styles.exploreButton} 
                            onPress={() => router.push('/(app)/minicurso')}
                        >
                            <Text style={styles.exploreButtonText}>Explorar Minicursos</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {hasScores && (
                <View style={styles.motivationSection}>
                    <Text style={styles.motivationText}>
                        {completedCourses === totalCourses 
                            ? "🎉 Parabéns! Você completou todos os cursos iniciados!"
                            : `💪 Continue assim! Faltam ${totalCourses - completedCourses} curso(s) para completar.`
                        }
                    </Text>
                    <TouchableOpacity 
                        style={styles.continueButton}
                        onPress={() => router.push('/(app)/minicurso')}
                    >
                        <Text style={styles.continueButtonText}>Continuar Aprendendo</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FF',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#333C57',
        fontWeight: '500',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#333C57',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#36A3FF',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333C57',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    recommendationHeader: {
        marginBottom: 15,
    },
    recommendationSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    recommendationLoading: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    recommendationLoadingText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    recommendationsContainer: {
        gap: 12,
    },
    recommendationCard: {
        flexDirection: 'row',
        backgroundColor: '#F0F7FF',
        borderRadius: 12,
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#36A3FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    recommendationIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    recommendationIcon: {
        fontSize: 28,
    },
    recommendationContent: {
        flex: 1,
    },
    recommendationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333C57',
        marginBottom: 5,
    },
    recommendationReason: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    recommendationCTA: {
        fontSize: 14,
        color: '#36A3FF',
        fontWeight: '600',
    },
    scoreCard: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 5,
    },
    scoreCardPerfect: {
        backgroundColor: '#E8F5E9',
        borderLeftColor: '#00C853',
    },
    scoreCardPartial: {
        backgroundColor: '#E3F2FD',
        borderLeftColor: '#36A3FF',
    },
    scoreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333C57',
        flex: 1,
    },
    perfectBadge: {
        fontSize: 12,
        color: '#00C853',
        fontWeight: 'bold',
        backgroundColor: '#C8E6C9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    scoreDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    percentageText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333C57',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    attemptDate: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
    },
    viewCourseLink: {
        color: '#36A3FF',
        marginTop: 8,
        fontWeight: '600',
        fontSize: 14,
    },
    noScoresContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    noScoresIcon: {
        fontSize: 64,
        marginBottom: 15,
    },
    noScoresText: {
        fontSize: 18,
        color: '#333C57',
        marginBottom: 8,
        fontWeight: '600',
    },
    noScoresSubtext: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
        textAlign: 'center',
    },
    exploreButton: {
        backgroundColor: '#00C853',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    exploreButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    motivationSection: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFB74D',
    },
    motivationText: {
        fontSize: 16,
        color: '#E65100',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
});