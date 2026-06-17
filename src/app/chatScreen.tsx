import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MessageList } from '@/components/MessageList';
import PetEmoji from '@/components/PetEmoji';
import { FOOTER_PILL_HEIGHT, PET_SIZE, PET_TOP_RATIO, theme } from '@/constants/theme';
import { useDragInteraction } from '@/hooks/useDragInteraction';
import { usePetState } from '@/hooks/usePetState';
import { usePooEmojis } from '@/hooks/usePooEmojis';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PooEmojiContainer } from '../components/PooEmojiContainer';

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const initialPet = params.name && params.baseEmoji ? {
        id: '1',
        name: String(params.name),
        baseEmoji: String(params.baseEmoji),
        currentEmoji: 'neutral-face' as const,
        status: { hunger: 50, happiness: 40, energy: 80, cleanliness: 60 }
    } : undefined;

    const { pet, messages, handleInteraction, pettingHover, handleCleanPoo, isSleeping, handleSleep, handleWakeUp } = usePetState(initialPet);
    const [dropPulse, setDropPulse] = useState(false);
    const [pettingActive, setPettingActive] = useState(false);
    const { pooEmojis, removePoo } = usePooEmojis(pet.status.cleanliness);

    const { dragItem, panResponder, dropZoneRef, updateDropZone, startDrag } = useDragInteraction(
        (type) => {
            if (type === 'petting' || type === 'feeding') {
                handleInteraction(type as 'petting' | 'feeding');
            }
            if (type === 'sleeping') {
                handleSleep();
            }
            setDropPulse(true);
            setTimeout(() => setDropPulse(false), 320);
        },
        (type) => {
            if (type === 'petting') {
                pettingHover();
                setPettingActive(true);
            }
        },
        () => {
            setPettingActive(false);
        },
        isSleeping
    );

    const handlePooShowered = (id: string) => {
        removePoo(id);
        handleCleanPoo();
    };

    const petBottom = height * PET_TOP_RATIO + PET_SIZE / 2;
    const chatTop = petBottom;
    const chatBottom = FOOTER_PILL_HEIGHT + insets.bottom + 20;

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={[theme.colors.gradientTop, theme.colors.gradientBottom]}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.container} edges={['top']}>
                <Header pet={pet} />

                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        zIndex: 5,
                        top: chatTop,
                        bottom: chatBottom,
                    }}
                >
                    <MessageList messages={messages} petAvatar={pet.baseEmoji} />
                </View>

                <PetEmoji
                    emoji={pet.currentEmoji}
                    dropZoneRef={dropZoneRef}
                    updateDropZone={updateDropZone}
                    dropPulse={dropPulse}
                    pettingActive={pettingActive}
                    isSleeping={isSleeping}
                    onWakeUp={handleWakeUp}
                />

                <Footer startDrag={startDrag} dragItem={dragItem} panResponder={panResponder} />

                <PooEmojiContainer
                    pooEmojis={pooEmojis}
                    onShowerPoo={handlePooShowered}
                    dragItem={dragItem}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    background: {
        ...StyleSheet.absoluteFill,
    },
    container: { flex: 1 },
});
