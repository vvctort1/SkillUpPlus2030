import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; 

export default function FirstScreen() {
    const router = useRouter(); 

    return(
        <View style={styles.container}>
            <Text style={styles.title}>SkillUpPlus2030+</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/cadastro')} 
            >
                <Text style={styles.buttonText}>Ainda não tenho conta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/login')} 
            >
                <Text style={styles.buttonText}>Já possuo conta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: "#F5F8FF"
    },title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333C57',
        marginBottom: 350,
    },
    button: {
        
        backgroundColor: '#36A3FF',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    }
});
