import { theme } from '@/constants/theme';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export function AuthScreenLayout({ children }: Props) {
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.background,
          {
            experimental_backgroundImage: theme.backgroundGradient,
            backgroundColor: theme.colors.gradientBottom,
          },
        ]}
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  background: {
    ...StyleSheet.absoluteFill,
  },
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    borderCurve: 'continuous',
    padding: 24,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
  },
});
