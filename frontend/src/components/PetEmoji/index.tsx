import { ACCESSORIES_CATALOG } from '@/constants/accessories';
import { PET_SIZE, PET_TOP_RATIO } from '@/constants/theme';
import { RefObject, useEffect } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Icon, { iconNames } from 'react-native-ico-noto-emojis';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type PetEmojiProps = {
  emoji: iconNames;
  equippedAccessoryId?: iconNames;
  size?: number;
  dropZoneRef?: RefObject<View | null>;
  updateDropZone?: () => void;
  dropPulse?: boolean;
  pettingActive?: boolean;
  isSleeping?: boolean;
  onWakeUp?: () => void;
};

export default function PetEmoji({ emoji, size = PET_SIZE, equippedAccessoryId, dropZoneRef, updateDropZone, dropPulse = false, pettingActive = false, isSleeping = false, onWakeUp }: PetEmojiProps) {
  const accessory = equippedAccessoryId ? ACCESSORIES_CATALOG[equippedAccessoryId] : null;

  const pressScale = useSharedValue(1);
  const dropScale = useSharedValue(1);
  const pettingScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: pressScale.value * dropScale.value * pettingScale.value },
    ],
  }));

  /*
    - usei `react-native-reanimated` + `useSharedValue` pra animações fluidas
      e com baixo custo de render.
    - `pressScale`, `dropScale` e `pettingScale` são valores separados para que
      efeitos (press, pulse, petting) possam se compor sem conflitar.
    - `dropZoneRef` e `updateDropZone` permitem que o componente que controla
      arraste (drag) meça a área do pet como target. 
  */

  const handlePress = () => {
    if (isSleeping && onWakeUp) {
      onWakeUp();
      return;
    }

    pressScale.value = withSequence(
      withTiming(1.1, {
        duration: 120,
        easing: Easing.out(Easing.ease),
      }),
      withTiming(1, {
        duration: 160,
        easing: Easing.out(Easing.ease),
      })
    );
  };

  useEffect(() => {
    updateDropZone?.();
  }, [updateDropZone]);

  useEffect(() => {
    if (!dropPulse) {
      return;
    }

    dropScale.value = withSequence(
      withTiming(1.25, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      }),
      withTiming(1, {
        duration: 180,
        easing: Easing.out(Easing.ease),
      })
    );
  }, [dropPulse, dropScale]);

  useEffect(() => {
    if (!pettingActive) {
      pettingScale.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      });
      return;
    }

    pettingScale.value = withRepeat(
      withSequence(
        withTiming(1.08, {
          duration: 250,
          easing: Easing.out(Easing.ease),
        }),
        withTiming(1, {
          duration: 250,
          easing: Easing.out(Easing.ease),
        })
      ),
      -1,
      false
    );
  }, [pettingActive, pettingScale]);

  const handleLayout = (_event: LayoutChangeEvent) => {
    updateDropZone?.();
  };

  return (
    <View
      ref={dropZoneRef}
      onLayout={handleLayout}
      style={[styles.dropZoneWrapper, { width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }]}
    >
      <Pressable
        onPress={handlePress}
        style={[styles.pressable, { width: size, height: size }]}
        accessibilityRole="button"
      >
        <Animated.View style={[styles.container, animatedStyle, { width: size, height: size, borderRadius: size / 2 }]}>
          <Icon name={emoji} height={size} width={size} />
          {accessory && (
            <View
              style={[
                styles.accessoryWrapper,
                {
                  top: accessory.top,
                  left: accessory.left,
                },
              ]}
            >
              <Icon
                name={accessory.id as iconNames}
                height={PET_SIZE * accessory.sizeRatio}
                width={PET_SIZE * accessory.sizeRatio}
              />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dropZoneWrapper: {
    position: 'absolute',
    top: `${PET_TOP_RATIO * 100}%`,
    left: '50%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  accessoryWrapper: {
    position: 'absolute',
    zIndex: 9,
  },
});
