import { useAuth } from "@/context/AuthContext";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";

export default function PerfilScreen() {
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        Alert.alert(
            "Confirmar Saída",
            "Você tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setIsLoggingOut(true);
                            await logout();
                        } catch (error) {
                            console.error("Erro ao fazer logout:", error);
                            Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
                            setIsLoggingOut(false);
                        }
                    }
                }
            ]
        );
    };

    const getInitials = (name: string | null) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const getMemberSince = () => {
        if (!user?.metadata.creationTime) return "Data desconhecida";
        const date = new Date(user.metadata.creationTime);
        return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{getInitials(user?.displayName || null)}</Text>
                </View>
                <Text style={styles.userName}>{user?.displayName || 'Usuário'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'email@exemplo.com'}</Text>
                <Text style={styles.memberSince}>Membro desde {getMemberSince()}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da Conta</Text>
                
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Nome Completo</Text>
                        <Text style={styles.infoValue}>{user?.displayName || 'Não informado'}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Não informado'}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Status da Conta</Text>
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Ativa</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Questionário Inicial</Text>
                        <Text style={styles.infoValue}>
                            {user?.hasAnsweredQuestionnaire ? '✅ Concluído' : '⏳ Pendente'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferências de Aprendizado</Text>
                
                {user?.questionnaireAnswers ? (
                    Object.entries(user.questionnaireAnswers).map(([key, value]) => (
                        <View key={key} style={styles.preferenceItem}>
                            <Text style={styles.preferenceQuestion}>{value.question}</Text>
                            <Text style={styles.preferenceAnswer}>{value.answer}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noPreferences}>
                        Nenhuma preferência registrada ainda.
                    </Text>
                )}
            </View>
            <View style={styles.actionsSection}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Em Desenvolvimento", "Esta funcionalidade estará disponível em breve.")}
                >
                    <Text style={styles.actionButtonText}>✏️ Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Em Desenvolvimento", "Esta funcionalidade estará disponível em breve.")}
                >
                    <Text style={styles.actionButtonText}>🔔 Notificações</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => Alert.alert("Em Desenvolvimento", "Esta funcionalidade estará disponível em breve.")}
                >
                    <Text style={styles.actionButtonText}>🔐 Segurança</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.actionButton, styles.logoutButton]}
                    onPress={handleLogout}
                    disabled={isLoggingOut}
                >
                    <Text style={styles.logoutButtonText}>
                        {isLoggingOut ? '⏳ Saindo...' : '🚪 Sair da Conta'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Versão 1.0.0</Text>
                <Text style={styles.footerText}>© 2025 SkillUpPlus2030+ App</Text>
            </View>
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
        paddingTop: 70,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#36A3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333C57',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    memberSince: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333C57',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    infoRow: {
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'column',
    },
    infoLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 16,
        color: '#333C57',
        fontWeight: '500',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00C853',
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        color: '#00C853',
        fontWeight: '600',
    },
    preferenceItem: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    preferenceQuestion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    preferenceAnswer: {
        fontSize: 16,
        color: '#333C57',
        fontWeight: '500',
    },
    noPreferences: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 10,
    },
    actionsSection: {
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#333C57',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#FFEBEE',
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#D32F2F',
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 10,
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
    },
});