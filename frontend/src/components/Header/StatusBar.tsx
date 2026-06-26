import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export function StatusBar({ label, value }: { label: string, value: number }) {
    const gradient = theme.statusGradients[label];
    const fallback = theme.statusFallback[label] ?? '#FFFFFF';
    const icon = theme.statusIcons[label] ?? '';

    return (
        <View style={styles.statusItem}>
            <View style={styles.labelRow}>
                <Text style={styles.statusIcon}>{icon}</Text>
                <Text style={styles.statusLabel}>{label}</Text>
            </View>
            <View style={styles.barBackground}>
                {gradient ? (
                    <LinearGradient
                        colors={gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.barFill, { width: `${value}%` }]}
                    />
                ) : (
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${value}%`,
                                backgroundColor: fallback,
                            },
                        ]}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statusItem: {
        flex: 1,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginBottom: 4,
    },
    statusIcon: { fontSize: 10 },
    statusLabel: {
        fontSize: 9,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    barBackground: {
        height: 5,
        backgroundColor: theme.colors.barTrack,
        borderRadius: 3,
        overflow: 'hidden',
        borderCurve: 'continuous',
    },
    barFill: {
        height: '100%',
        borderRadius: 3,
        borderCurve: 'continuous',
    },
});