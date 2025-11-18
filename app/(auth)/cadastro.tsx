import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function CadastroScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ nome: '', email: '', senha: '', senha2: '' });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        setErrors({ nome: '', email: '', senha: '', senha2: '' });

        let hasError = false;
        const newErrors = { nome: '', email: '', senha: '', senha2: '' };

        if (!nome) {
            newErrors.nome = 'Nome é obrigatório';
            hasError = true;
        } else if (nome.length < 3) {
            newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
            hasError = true;
        }

        if (!email) {
            newErrors.email = 'Email é obrigatório';
            hasError = true;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Email inválido';
            hasError = true;
        }

        if (!senha) {
            newErrors.senha = 'Senha é obrigatória';
            hasError = true;
        } else if (senha.length < 6) {
            newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
            hasError = true;
        }

        if (!senha2) {
            newErrors.senha2 = 'Confirme sua senha';
            hasError = true;
        } else if (senha !== senha2) {
            newErrors.senha2 = 'As senhas não coincidem';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await register(nome, email, senha);
        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            
            let errorMessage = "Erro ao criar conta. Tente novamente.";
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este email já está em uso. Faça login ou use outro email.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Email inválido.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Senha muito fraca. Use pelo menos 6 caracteres.";
            }
            
            Alert.alert("Erro no Cadastro", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Criar Conta</Text>
                        <Text style={styles.subtitle}>Comece sua jornada de aprendizado</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput
                                style={[styles.input, errors.nome && styles.inputError]}
                                placeholder="Seu nome"
                                placeholderTextColor="#999"
                                value={nome}
                                onChangeText={(text) => {
                                    setNome(text);
                                    setErrors({ ...errors, nome: '' });
                                }}
                                editable={!isLoading}
                            />
                            {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, errors.email && styles.inputError]}
                                placeholder="seu@email.com"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setErrors({ ...errors, email: '' });
                                }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!isLoading}
                            />
                            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={[styles.input, errors.senha && styles.inputError]}
                                placeholder="Mínimo 6 caracteres"
                                placeholderTextColor="#999"
                                value={senha}
                                onChangeText={(text) => {
                                    setSenha(text);
                                    setErrors({ ...errors, senha: '' });
                                }}
                                secureTextEntry
                                editable={!isLoading}
                            />
                            {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar Senha</Text>
                            <TextInput
                                style={[styles.input, errors.senha2 && styles.inputError]}
                                placeholder="Digite a senha novamente"
                                placeholderTextColor="#999"
                                value={senha2}
                                onChangeText={(text) => {
                                    setSenha2(text);
                                    setErrors({ ...errors, senha2: '' });
                                }}
                                secureTextEntry
                                editable={!isLoading}
                            />
                            {errors.senha2 ? <Text style={styles.errorText}>{errors.senha2}</Text> : null}
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.registerButtonText}>Criar Conta</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OU</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.loginLink}
                            onPress={() => router.push("/login")}
                            disabled={isLoading}
                        >
                            <Text style={styles.loginLinkText}>
                                Já tem uma conta? <Text style={styles.loginLinkBold}>Entrar</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333C57',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333C57',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333C57',
    },
    inputError: {
        borderColor: '#F44336',
    },
    errorText: {
        color: '#F44336',
        fontSize: 12,
        marginTop: 5,
    },
    registerButton: {
        backgroundColor: '#00C853',
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 14,
        color: '#999',
    },
    loginLink: {
        alignItems: 'center',
    },
    loginLinkText: {
        fontSize: 16,
        color: '#666',
    },
    loginLinkBold: {
        color: '#36A3FF',
        fontWeight: '600',
    },
});