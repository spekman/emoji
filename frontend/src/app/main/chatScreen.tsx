import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MessageList } from '@/components/MessageList';
import PetEmoji from '@/components/PetEmoji';
import { PooEmojiContainer } from '@/components/PooEmojiContainer';
import { FOOTER_PILL_HEIGHT, PET_SIZE, PET_TOP_RATIO, theme } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useDragInteraction } from '@/hooks/useDragInteraction';
import { usePetState } from '@/hooks/usePetState';
import { usePooEmojis } from '@/hooks/usePooEmojis';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatScreen() {
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const { authData } = useAuth();

    const initialPetConfig = authData ? {
        id: String(authData.petId),
        name: authData.petName,
        baseEmoji: authData.petBaseEmoji,
        currentEmoji: 'neutral-face' as const,
        status: { hunger: 50, happiness: 40, energy: 80, cleanliness: 60 }
    } : undefined;

    const {
        pet, equipAccessory, messages, handleInteraction, pettingHover, handleCleanPoo, isSleeping, handleSleep, handleWakeUp
    } = usePetState(initialPetConfig);

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

    const chatTop = height * PET_TOP_RATIO + PET_SIZE / 2;
    const chatBottom = FOOTER_PILL_HEIGHT + insets.bottom + 20;

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={[theme.colors.gradientTop, theme.colors.gradientMid, theme.colors.gradientBottom]}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.container} edges={['top']}>
                <Header pet={pet} onEquipAccessory={equipAccessory} />

                <View
                    style={{
                        ...styles.chat,
                        top: chatTop,
                        bottom: chatBottom,
                    }}
                >
                    <MessageList messages={messages} petAvatar={pet.baseEmoji} />
                </View>

                <PetEmoji
                    emoji={pet.currentEmoji}
                    equippedAccessoryId={pet.equippedAccessoryId}
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
                    onShowerPoo={(id) => {
                        removePoo(id);
                        handleCleanPoo();
                    }}
                    dragItem={dragItem}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    container: { flex: 1 },
    chat: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 5,
    }
});