import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', senha: '' });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setErrors({ email: '', senha: '' });

        let hasError = false;
        const newErrors = { email: '', senha: '' };

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

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await login(email.trim(), senha.trim());
        } catch (error: any) {
            console.error("Erro no login:", error);
            
            let errorMessage = "Erro ao fazer login. Tente novamente.";
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = "Usuário não encontrado. Verifique o email ou cadastre-se.";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Senha incorreta. Tente novamente.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Email inválido.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = "Credenciais inválidas. Verifique email e senha.";
            }
            
            Alert.alert("Erro no Login", errorMessage);
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
                        <Text style={styles.title}>Bem-vindo de volta!</Text>
                        <Text style={styles.subtitle}>Entre com sua conta para continuar</Text>
                    </View>

                    <View style={styles.form}>
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
                                placeholder="••••••••"
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

                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.buttonDisabled, (!email || !senha) && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading || (!email || !senha) ? true : false}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OU</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.registerLink}
                            onPress={() => router.push("/cadastro")}
                            disabled={isLoading}
                        >
                            <Text style={styles.registerLinkText}>
                                Não tem uma conta? <Text style={styles.registerLinkBold}>Cadastre-se</Text>
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
        marginBottom: 20,
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
    loginButton: {
        backgroundColor: '#36A3FF',
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
    loginButtonText: {
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
    registerLink: {
        alignItems: 'center',
    },
    registerLinkText: {
        fontSize: 16,
        color: '#666',
    },
    registerLinkBold: {
        color: '#36A3FF',
        fontWeight: '600',
    },
});