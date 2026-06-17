import { ProfileAvatar } from '@/components/ProfileAvatar';
import { theme } from '@/constants/theme';
import { Pet } from '@/types';
import { Menu } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from './StatusBar';

type Props = {
    pet: Pet;
}

export function Header({ pet }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.leftRow}>
                    <TouchableOpacity style={styles.menuButton} accessibilityRole="button">
                        <Menu style={styles.menuButton}/>
                    </TouchableOpacity>

                    <ProfileAvatar emoji={pet.baseEmoji} size={35} />

                    <View style={styles.headerTextContainer}>
                        <Text selectable style={styles.headerTitle}>{pet.name}</Text>
                        <Text selectable style={styles.headerSubtitle}>online</Text>
                    </View>
                </View>

                {
                    /*
                <View style={styles.currencyBadge}>
                                    <Text style={styles.starIcon}>⭐</Text>
                                    <Text selectable style={styles.currencyText}>230</Text>
                                </View>
                    */
                }

            </View>

            <View style={styles.statusContainer}>
                <StatusBar label="Fome" value={pet.status.hunger} />
                <StatusBar label="Felicidade" value={pet.status.happiness} />
                <StatusBar label="Energia" value={pet.status.energy} />
                <StatusBar label="Limpeza" value={pet.status.cleanliness} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginHorizontal: 10,
        marginTop: 4,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    leftRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
    menuButton: {
        padding: 6,
        marginRight: 4,
    },
    menuIcon: { fontSize: 20, color: theme.colors.textPrimary },
    headerTextContainer: { flexDirection: 'column', flex: 1 },
    headerTitle: { color: theme.colors.textPrimary, fontWeight: '700', fontSize: 16 },
    headerSubtitle: { color: theme.colors.textSecondary, fontSize: 12 },
    currencyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: theme.colors.surfaceLight,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 14,
        borderCurve: 'continuous',
    },
    starIcon: { fontSize: 14 },
    currencyText: {
        color: theme.colors.textPrimary,
        fontWeight: '700',
        fontSize: 14,
        fontVariant: ['tabular-nums'],
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        borderCurve: 'continuous',
    },
});
