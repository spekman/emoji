import { AuthScreenLayout } from '@/components/AuthScreenLayout';
import { emojiAvatarStyle, theme } from '@/constants/theme';
import { API_URL } from '@/context/AuthContext';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';

export default function RegisterScreen() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [petName, setPetName] = useState('');
    const [petEmoji, setPetEmoji] = useState('🦄');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handlePick = (emojiObject: EmojiType) => {
        setPetEmoji(emojiObject.emoji);
    };

    const handleRegister = async () => {
        if (!identifier.trim() || !password.trim() || !petName.trim()) {
            setError('Preencha todos os campos antes de continuar.');
            return;
        }

        setError('');
        setLoading(false);

        try {
            await axios.post(`${API_URL}/api/auth/register`, {
                username: identifier.trim(),
                password: password,
                petName: petName.trim(),
                petBaseEmoji: petEmoji
            });

            Alert.alert("Sucesso!", "Conta criada! Faça login para começar.");
            router.replace('/auth');
        } catch (err: any) {
            setError(err.response?.data || 'Erro ao conectar ao servidor de cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthScreenLayout>
            <Text selectable style={styles.title}>Criar conta</Text>
            <Text selectable style={styles.description}>
                Cadastre-se com nome de usuário, senha e escolha uma foto de perfil para seu pet.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do usuário"
                placeholderTextColor={theme.colors.textMuted}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                readOnly={loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                readOnly={loading}
            />

            <TextInput
                style={styles.input}
                placeholder="Nome do pet"
                placeholderTextColor={theme.colors.textMuted}
                value={petName}
                onChangeText={setPetName}
                readOnly={loading}
            />
            <Text selectable style={styles.label}>Foto de perfil do pet</Text>
            <View style={styles.emojiSelectionContainer}>
                <TouchableOpacity
                    style={styles.emojiDisplayButton}
                    onPress={() => setIsOpen(true)}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Text style={emojiAvatarStyle(64)}>{petEmoji}</Text>
                </TouchableOpacity>
            </View>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                theme={{
                    backdrop: 'rgba(11, 13, 47, 0.6)',
                    container: theme.colors.surface,
                    header: theme.colors.textPrimary,
                    skinTonesContainer: theme.colors.surfaceLight,
                    category: {
                        icon: theme.colors.textSecondary,
                        iconActive: theme.colors.accent,
                        container: 'rgba(15, 20, 60, 0.8)',
                        containerActive: theme.colors.emojiSelected,
                    },
                    search: {
                        background: theme.colors.inputBg,
                        text: theme.colors.textPrimary,
                        placeholder: theme.colors.textMuted,
                        icon: theme.colors.textMuted,
                    }
                }}
            />

            {error ? <Text selectable style={styles.error}>{error}</Text> : null}

            <TouchableOpacity onPress={handleRegister} activeOpacity={0.85} disabled={loading}>
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
                        <Text selectable style={styles.buttonText}>Registrar</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text selectable style={styles.footerText}>Já tem conta?</Text>
                <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                    <Text selectable style={styles.linkText}>Voltar para entrar</Text>
                </TouchableOpacity>
            </View>
        </AuthScreenLayout>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 32, fontWeight: 'bold', color: theme.colors.textPrimary, textAlign: 'center', marginBottom: 10 },
    description: { fontSize: 15, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: 25 },
    input: {
        backgroundColor: theme.colors.inputBg,
        borderColor: theme.colors.inputBorder,
        borderWidth: 1.5,
        borderRadius: 14,
        padding: 16,
        color: theme.colors.textPrimary,
        fontSize: 16,
        marginBottom: 14,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    emojiSelectionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    emojiDisplayButton: {
        width: 95,
        height: 95,
        borderRadius: 55,
        backgroundColor: theme.colors.inputBg,
        borderColor: theme.colors.inputBorder,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',

        shadowColor: theme.colors.inputBorder,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    button: {
        backgroundColor: theme.colors.accent,
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: { color: '#0B0D2F', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
    error: { color: theme.colors.error, fontSize: 14, textAlign: 'center', marginBottom: 10 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
    footerText: { color: theme.colors.textSecondary, marginRight: 6 },
    linkText: { color: theme.colors.accent, fontWeight: 'bold' },
});