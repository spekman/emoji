import { emojiAvatarStyle, theme } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  emoji: string;
  size?: number;
};

export function ProfileAvatar({ emoji, size = 40 }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.emoji, emojiAvatarStyle(size)]}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.star,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  emoji: {},
});
