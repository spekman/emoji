import { theme } from '@/constants/theme';
import { InteractionTypes } from '@/types';
import { PanResponderInstance, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon, { iconNames } from 'react-native-ico-noto-emojis';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { DragItem } from '@/hooks/useDragInteraction';

type Props = {
    startDrag: (type: InteractionTypes, icon: iconNames, pageX: number, pageY: number) => void;
    dragItem: DragItem;
    panResponder: PanResponderInstance;
}

const EMOJI_OPTIONS: Record<InteractionTypes, iconNames> = {
    petting: 'raised-back-of-hand',
    feeding: 'pizza',
    showering: 'shower',
    sleeping: 'zzz'
};

export function Footer({ startDrag, dragItem, panResponder }: Props) {
    const insets = useSafeAreaInsets();
    const ICON_SIZE = 35;

    return (
        <SafeAreaView style={styles.safe} pointerEvents="box-none" {...panResponder.panHandlers}>
            <View style={[styles.pill, { bottom: 12 + insets.bottom }]} pointerEvents="box-none">
                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('petting', EMOJI_OPTIONS.petting, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="raised-back-of-hand" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('feeding', EMOJI_OPTIONS.feeding, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="pizza" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('showering', EMOJI_OPTIONS.showering, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="shower" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPressIn={(evt) => startDrag('sleeping', EMOJI_OPTIONS.sleeping, evt.nativeEvent.pageX, evt.nativeEvent.pageY)}>
                    <View style={styles.iconCircle}><Icon name="zzz" width={ICON_SIZE} height={ICON_SIZE} /></View>
                </TouchableOpacity>
            </View>

            <View style={[styles.dragOverlay, { pointerEvents: dragItem ? 'auto' : 'none' }]} {...panResponder.panHandlers}>
                {dragItem ? (
                    <View
                        style={[styles.dragPreview, { left: dragItem.x - 24, top: dragItem.y - 24 }]}
                    >
                        <Icon name={dragItem.icon} width={ICON_SIZE * 1.6} height={ICON_SIZE * 1.6} />
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        zIndex: 50,
    },
    pill: {
        position: 'absolute',
        bottom: 12,
        width: '92%',
        backgroundColor: theme.colors.footerPill,
        borderRadius: 28,
        borderCurve: 'continuous',
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 24,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.footerButton,
    },
    dragOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    dragPreview: {
        position: 'absolute',
        zIndex: 1001,
    }
});
