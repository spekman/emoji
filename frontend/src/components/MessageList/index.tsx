import { ProfileAvatar } from '@/components/ProfileAvatar';
import { theme } from '@/constants/theme';
import { Message } from '@/types';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface MessageListProps {
  messages: Message[];
  petAvatar: string;
}

export function MessageList({ messages, petAvatar }: MessageListProps) {
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  return (
    <View style={styles.container}>
      {/* efeito de fade nos fins da lista */}
      <MaskedView
        style={styles.container}
        maskElement={
          <LinearGradient
            colors={['transparent', '#000', '#000', 'transparent']}
            locations={[0, 0.08, 0.92, 1]}
            style={styles.container}
          />
        }
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatArea}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isUser = item.sender === 'user';
            return (
              <View style={[styles.row, isUser && styles.rowUser]}>
                {!isUser && <ProfileAvatar emoji={petAvatar} size={28} />}
                <View style={[styles.messageBalloon, isUser ? styles.userMessage : styles.petMessage]}>
                  <Text selectable style={[styles.messageText, isUser ? styles.userMessageText : styles.petMessageText]}>
                    {item.text}
                  </Text>
                  <Text selectable style={[styles.messageTime, isUser ? styles.userMessageTime : styles.petMessageTime]}>
                    {item.timestamp}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    paddingHorizontal: 14,
    paddingTop: 30,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: 'flex-end',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '92%',
    alignSelf: 'flex-start',
  },
  rowUser: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  messageBalloon: {
    maxWidth: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  petMessage: {
    backgroundColor: theme.colors.petBubble,
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: theme.colors.userBubble,
    borderBottomRightRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 20 },
  petMessageText: { color: theme.colors.petBubbleText },
  userMessageText: { color: theme.colors.userBubbleText },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  petMessageTime: { color: theme.colors.textMuted },
  userMessageTime: { color: theme.colors.textSecondary },
});