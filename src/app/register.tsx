import { AuthScreenLayout } from '@/components/AuthScreenLayout';
import { emojiAvatarStyle, theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const emojiOptions = ['🐶', '🐱', '🦊', '🐯', '🦄', '🐙']; // implementar `rn-emoji-keyboard` depois
const EMOJI_SIZE = 48;

export default function RegisterScreen() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [petName, setPetName] = useState('');
    const [petEmoji, setPetEmoji] = useState(emojiOptions[0]);
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!identifier.trim() || !password.trim() || !petName.trim()) {
            setError('Preencha todos os campos antes de continuar.');
            return;
        }

        setError('');
        router.push(`/chatScreen?name=${encodeURIComponent(petName)}&baseEmoji=${encodeURIComponent(petEmoji)}`);
    };

    return (
        <AuthScreenLayout>
            <Text selectable style={styles.title}>Criar conta</Text>
            <Text selectable style={styles.description}>
                Cadastre-se com email ou nome de usuário, senha e escolha um ícone para seu pet.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email ou nome do usuário"
                placeholderTextColor={theme.colors.textMuted}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Nome do pet"
                placeholderTextColor={theme.colors.textMuted}
                value={petName}
                onChangeText={setPetName}
            />

            <Text selectable style={styles.label}>Escolha o emoji do pet</Text>
            <View style={styles.emojiRow}>
                {emojiOptions.map((emoji) => (
                    <TouchableOpacity
                        key={emoji}
                        style={[
                            styles.emojiButton,
                            petEmoji === emoji && styles.emojiButtonSelected,
                        ]}
                        onPress={() => setPetEmoji(emoji)}
                    >
                        <Text style={[styles.emojiText, emojiAvatarStyle(EMOJI_SIZE)]}>{emoji}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {error ? <Text selectable style={styles.error}>{error}</Text> : null}

            <TouchableOpacity onPress={handleRegister} activeOpacity={0.85}>
                <View
                    style={[
                        styles.button,
                        {
                            experimental_backgroundImage: theme.buttonGradient,
                            backgroundColor: theme.colors.accent,
                        },
                    ]}
                >
                    <Text selectable style={styles.buttonText}>Registrar</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text selectable style={styles.footerText}>Já tem conta?</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text selectable style={styles.linkText}>Voltar para entrar</Text>
                </TouchableOpacity>
            </View>
        </AuthScreenLayout>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 8,
    },
    description: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        borderRadius: 14,
        borderCurve: 'continuous',
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: theme.colors.inputBg,
        color: theme.colors.textPrimary,
    },
    label: {
        color: theme.colors.textSecondary,
        fontWeight: '600',
        marginBottom: 12,
    },
    emojiRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    emojiButton: {
        width: EMOJI_SIZE,
        height: EMOJI_SIZE,
        borderRadius: 14,
        borderCurve: 'continuous',
        backgroundColor: theme.colors.inputBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        overflow: 'hidden',
    },
    emojiButtonSelected: {
        borderColor: theme.colors.emojiSelectedBorder,
        backgroundColor: theme.colors.emojiSelected,
    },
    emojiText: {},
    button: {
        height: 48,
        borderRadius: 14,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.45)',
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontWeight: '700',
        fontSize: 16,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    footerText: {
        color: theme.colors.textSecondary,
    },
    linkText: {
        color: theme.colors.textPrimary,
        fontWeight: '700',
    },
    error: {
        color: theme.colors.error,
        marginBottom: 12,
        fontSize: 13,
    },
});
