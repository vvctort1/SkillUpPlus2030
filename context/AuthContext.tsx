import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from "react";
import { app, db } from '../firebaseConfig';

const auth = getAuth(app);

interface CustomUser extends User {
    hasAnsweredQuestionnaire?: boolean;
    questionnaireAnswers?: { [key: string]: { question: string; answer: string; }};
}

interface AuthContextType {
    user: CustomUser | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<any>;
    register: (name: string, email: string, pass: string) => Promise<any>;
    logout: () => Promise<void>;
    markQuestionnaireAsAnswered: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(userState) => {

            if (userState) {

                try{
                    await userState.reload();
                } catch (error) {
                    console.warn("Erro ao recarregar userState")
                }

                const userDocRef = doc(db, 'users', userState.uid);
                const userDocSnap = await getDoc(userDocRef);

                let customUserData: Partial<CustomUser> = {};

                if (userDocSnap.exists()) {
                    customUserData = userDocSnap.data() as Partial<CustomUser>;
                }

                const finalUserData = {
                    ...userState,
                    ...customUserData,
                    hasAnsweredQuestionnaire: customUserData.hasAnsweredQuestionnaire ?? false,
                } as CustomUser;

                setUser(finalUserData);

            } else {
                setUser(null);
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (email: string, pass: string) => {
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const logout = () => {
        return signOut(auth);
    };

    const register = async (name: string, email: string, pass: string) => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);

            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            }

            console.log(`Cadastro de ${name} realizado com sucesso!`)


            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const markQuestionnaireAsAnswered = async() => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { hasAnsweredQuestionnaire: true }, { merge: true });
            setUser({ ...user, hasAnsweredQuestionnaire: true});
        }
    }


    const value = {
        user, isLoading, login, logout, register, markQuestionnaireAsAnswered,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
} 