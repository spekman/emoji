import { AuthScreenLayout } from '@/components/AuthScreenLayout';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!identifier.trim() || !password.trim()) {
            setError('Informe o nome de usuário e senha.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await login(identifier.trim(), password);
        } catch (err: any) {
            setError(err.message || 'Erro ao conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthScreenLayout>
            <Text selectable style={styles.title}>Entrar</Text>
            <Text selectable style={styles.description}>
                Use o seu nome de usuário e senha para acessar o seu pet.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do usuário"
                placeholderTextColor={theme.colors.textMuted}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                textContentType="username"
                readOnly={loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                readOnly={loading}
            />

            {error ? <Text selectable style={styles.error}>{error}</Text> : null}

            <TouchableOpacity onPress={handleLogin} activeOpacity={0.85} disabled={loading}>
                <LinearGradient
                    colors={theme.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        styles.button,
                        {
                            opacity: loading ? 0.7 : 1
                        },
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator color="#0B0D2F" size="small" />
                    ) : (
                        <Text selectable style={styles.buttonText}>Entrar</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text selectable style={styles.footerText}>Ainda não tem uma conta?</Text>
                <TouchableOpacity onPress={() => router.push('/auth/register')} disabled={loading}>
                    <Text selectable style={styles.linkText}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </AuthScreenLayout>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    input: {
        backgroundColor: theme.colors.inputBg,
        borderColor: theme.colors.inputBorder,
        borderWidth: 1.5,
        borderRadius: 14,
        padding: 16,
        color: theme.colors.textPrimary,
        fontSize: 16,
        marginBottom: 16,
        shadowColor: theme.colors.inputBorder,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button: {
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        // Aplicação do Ciano/Accent Neon para o botão estourar na interface escura
        backgroundColor: theme.colors.accent,
    },
    buttonText: {
        color: '#0B0D2F', // Texto escuro por cima do botão neon dá altíssimo contraste!
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    error: {
        color: theme.colors.error,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    footerText: {
        color: theme.colors.textSecondary,
        marginRight: 6,
    },
    linkText: {
        color: theme.colors.accent,
        fontWeight: 'bold',
    },
});